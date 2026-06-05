import type { FieldCRMStatus, Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/cms/prisma";

export const fieldCRMStatuses: FieldCRMStatus[] = [
  "NEW",
  "CONFIRMED",
  "ON_THE_WAY",
  "SHOOTING_DONE",
  "EDITING",
  "CLIENT_REVIEW",
  "DELIVERED",
  "CANCELLED",
];

export const fieldCRMStatusLabels: Record<FieldCRMStatus, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  ON_THE_WAY: "On the way",
  SHOOTING_DONE: "Shooting done",
  EDITING: "Editing",
  CLIENT_REVIEW: "Client review",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export type FieldCRMClientView = {
  id: string;
  clientName: string;
  phoneNumber: string;
  socialProfile: string;
  businessName: string;
  city: string;
  exactAddress: string;
  googleMapsLink: string;
  serviceType: string;
  description: string;
  totalPrice: number;
  advancePayment: number;
  remainingAmount: number;
  appointmentDate: string;
  appointmentTime: string;
  status: FieldCRMStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

type FieldCRMDbClient = Prisma.FieldCRMClientGetPayload<Record<string, never>>;

function money(value: unknown) {
  if (typeof value === "number") return value;
  if (typeof value === "string") return Number(value) || 0;
  if (value && typeof value === "object" && "toNumber" in value && typeof value.toNumber === "function") {
    return value.toNumber();
  }
  return 0;
}

export function serializeFieldCRMClient(client: FieldCRMDbClient): FieldCRMClientView {
  return {
    id: client.id,
    clientName: client.clientName,
    phoneNumber: client.phoneNumber,
    socialProfile: client.socialProfile ?? "",
    businessName: client.businessName ?? "",
    city: client.city,
    exactAddress: client.exactAddress,
    googleMapsLink: client.googleMapsLink ?? "",
    serviceType: client.serviceType,
    description: client.description,
    totalPrice: money(client.totalPrice),
    advancePayment: money(client.advancePayment),
    remainingAmount: money(client.remainingAmount),
    appointmentDate: client.appointmentDate ? client.appointmentDate.toISOString().slice(0, 10) : "",
    appointmentTime: client.appointmentTime ?? "",
    status: client.status,
    notes: client.notes ?? "",
    createdAt: client.createdAt.toISOString(),
    updatedAt: client.updatedAt.toISOString(),
  };
}

function clean(value: unknown, fallback = "") {
  return String(value ?? fallback).trim();
}

function numberValue(value: unknown) {
  const parsed = Number(String(value ?? "0").replace(",", "."));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function dateValue(value: unknown) {
  const raw = clean(value);
  if (!raw) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(raw) ? new Date(`${raw}T00:00:00.000Z`) : null;
}

function statusValue(value: unknown): FieldCRMStatus {
  const raw = clean(value).toUpperCase();
  return fieldCRMStatuses.includes(raw as FieldCRMStatus) ? (raw as FieldCRMStatus) : "NEW";
}

export function parseFieldCRMPayload(input: Record<string, unknown>) {
  const totalPrice = numberValue(input.totalPrice);
  const advancePayment = numberValue(input.advancePayment);
  const remainingAmount = Math.max(totalPrice - advancePayment, 0);

  return {
    clientName: clean(input.clientName),
    phoneNumber: clean(input.phoneNumber),
    socialProfile: clean(input.socialProfile) || null,
    businessName: clean(input.businessName) || null,
    city: clean(input.city),
    exactAddress: clean(input.exactAddress),
    googleMapsLink: clean(input.googleMapsLink) || null,
    serviceType: clean(input.serviceType),
    description: clean(input.description),
    totalPrice,
    advancePayment,
    remainingAmount,
    appointmentDate: dateValue(input.appointmentDate),
    appointmentTime: clean(input.appointmentTime) || null,
    status: statusValue(input.status),
    notes: clean(input.notes) || null,
  };
}

export function validateFieldCRMPayload(data: ReturnType<typeof parseFieldCRMPayload>) {
  if (!data.clientName) return "Client name is required.";
  if (!data.phoneNumber) return "Phone number is required.";
  if (!data.city) return "City is required.";
  if (!data.exactAddress) return "Exact address is required.";
  if (!data.serviceType) return "Service type is required.";
  if (!data.description) return "Project description is required.";
  return "";
}

export function normalizePhoneForWhatsApp(phone: string) {
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.startsWith("+") ? digits.slice(1) : digits;
}

export async function getFieldCRMClients() {
  const prisma = getPrisma();
  if (!prisma) return [];
  const clients = await prisma.fieldCRMClient.findMany({
    orderBy: [{ appointmentDate: "asc" }, { appointmentTime: "asc" }, { createdAt: "desc" }],
  });
  return clients.map(serializeFieldCRMClient);
}

export function getFieldCRMStats(clients: FieldCRMClientView[]) {
  const today = new Date().toISOString().slice(0, 10);
  return {
    totalClients: clients.length,
    todayAppointments: clients.filter((client) => client.appointmentDate === today).length,
    confirmedAppointments: clients.filter((client) => client.status === "CONFIRMED").length,
    cancelledAppointments: clients.filter((client) => client.status === "CANCELLED").length,
    totalRevenue: clients.reduce((sum, client) => sum + client.totalPrice, 0),
    paidAmount: clients.reduce((sum, client) => sum + client.advancePayment, 0),
    remainingAmount: clients.reduce((sum, client) => sum + client.remainingAmount, 0),
  };
}

export function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function isoDate(date: Date) {
  return date.toISOString().slice(0, 10);
}
