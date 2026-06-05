"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, MapPinned, MessageCircle, Pencil, Plus, Search, Trash2, XCircle } from "lucide-react";
import type { FieldCRMStatus } from "@prisma/client";
import { fieldCRMStatusLabels, fieldCRMStatuses, normalizePhoneForWhatsApp, type FieldCRMClientView } from "@/lib/field-crm";

const emptyClient: FieldCRMClientView = {
  id: "",
  clientName: "",
  phoneNumber: "",
  socialProfile: "",
  businessName: "",
  city: "",
  exactAddress: "",
  googleMapsLink: "",
  serviceType: "",
  description: "",
  totalPrice: 0,
  advancePayment: 0,
  remainingAmount: 0,
  appointmentDate: "",
  appointmentTime: "",
  status: "NEW",
  notes: "",
  createdAt: "",
  updatedAt: "",
};

function money(value: number) {
  return new Intl.NumberFormat("fr-MA", { style: "currency", currency: "MAD", maximumFractionDigits: 0 }).format(value);
}

function statusTone(status: FieldCRMStatus) {
  if (status === "CANCELLED") return "border-red-300/20 bg-red-400/10 text-red-100";
  if (status === "DELIVERED") return "border-emerald-300/25 bg-emerald-400/12 text-emerald-100";
  if (status === "CONFIRMED") return "border-lime-300/25 bg-lime-400/12 text-lime-100";
  return "border-white/12 bg-white/8 text-white/76";
}

function StatusBadge({ status }: { status: FieldCRMStatus }) {
  return <span className={`inline-flex max-w-full rounded-full border px-3 py-1 text-xs leading-5 ${statusTone(status)}`}>{fieldCRMStatusLabels[status]}</span>;
}

function ContactActions({ client }: { client: FieldCRMClientView }) {
  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      {client.phoneNumber && (
        <a href={`https://wa.me/${normalizePhoneForWhatsApp(client.phoneNumber)}`} target="_blank" rel="noreferrer" className="inline-flex min-h-8 max-w-full items-center gap-1 rounded-full border border-emerald-300/25 px-2.5 py-1 text-xs text-emerald-100 hover:border-emerald-200/60">
          <MessageCircle className="h-3 w-3 shrink-0" />
          <span className="truncate">WhatsApp</span>
        </a>
      )}
      {client.googleMapsLink && (
        <a href={client.googleMapsLink} target="_blank" rel="noreferrer" className="inline-flex min-h-8 max-w-full items-center gap-1 rounded-full border border-white/12 px-2.5 py-1 text-xs text-white/72 hover:border-white/30 hover:text-white">
          <MapPinned className="h-3 w-3 shrink-0" />
          <span className="truncate">Maps</span>
        </a>
      )}
    </div>
  );
}

function ClientActionButtons({ client, onEdit, onDelivered, onCancelled, onDelete }: { client: FieldCRMClientView; onEdit: () => void; onDelivered: () => void; onCancelled: () => void; onDelete: () => void }) {
  return (
    <div className="flex min-w-0 flex-wrap gap-2">
      <button onClick={onEdit} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/72 hover:text-white" aria-label={`Edit ${client.clientName}`}><Pencil className="h-4 w-4" /></button>
      <button onClick={onDelivered} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-emerald-300/25 text-emerald-100 hover:border-emerald-200/60" aria-label={`Mark ${client.clientName} as delivered`}><CheckCircle2 className="h-4 w-4" /></button>
      <button onClick={onCancelled} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-red-300/20 text-red-100 hover:border-red-200/50" aria-label={`Mark ${client.clientName} as cancelled`}><XCircle className="h-4 w-4" /></button>
      <button onClick={onDelete} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/60 hover:border-red-300/30 hover:text-red-100" aria-label={`Delete ${client.clientName}`}><Trash2 className="h-4 w-4" /></button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block min-w-0 text-sm text-white/72">
      {label}
      {children}
    </label>
  );
}

const inputClass = "mt-2 w-full min-w-0 rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/28 focus:border-emerald-300/45";

export function FieldCRMForm({ client, mode = "create" }: { client?: FieldCRMClientView; mode?: "create" | "edit" }) {
  const initial = client ?? emptyClient;
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(initial.totalPrice);
  const [advancePayment, setAdvancePayment] = useState(initial.advancePayment);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const remainingAmount = Math.max(totalPrice - advancePayment, 0);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());
    payload.totalPrice = String(totalPrice);
    payload.advancePayment = String(advancePayment);

    const response = await fetch(mode === "edit" && initial.id ? `/api/field-crm/clients/${initial.id}` : "/api/field-crm/clients", {
      method: mode === "edit" ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    let json: { error?: string } | null = null;
    try {
      json = text ? JSON.parse(text) : null;
    } catch {
      json = null;
    }
    setSaving(false);

    if (!response.ok) {
      setMessage(json?.error || text || "Failed to save client");
      return;
    }

    setMessage("Client saved.");
    router.refresh();
    if (mode === "create") router.push("/admin/field-crm/clients");
  }

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Client name"><input required name="clientName" defaultValue={initial.clientName} className={inputClass} /></Field>
        <Field label="Phone number"><input required name="phoneNumber" defaultValue={initial.phoneNumber} className={inputClass} /></Field>
        <Field label="Instagram/Facebook"><input name="socialProfile" defaultValue={initial.socialProfile} className={inputClass} /></Field>
        <Field label="Business name"><input name="businessName" defaultValue={initial.businessName} className={inputClass} /></Field>
        <Field label="City"><input required name="city" defaultValue={initial.city} className={inputClass} /></Field>
        <Field label="Google Maps link"><input name="googleMapsLink" defaultValue={initial.googleMapsLink} className={inputClass} /></Field>
        <Field label="Service type"><input required name="serviceType" defaultValue={initial.serviceType} className={inputClass} /></Field>
        <Field label="Status">
          <select name="status" defaultValue={initial.status} className={inputClass}>
            {fieldCRMStatuses.map((status) => <option key={status} value={status}>{fieldCRMStatusLabels[status]}</option>)}
          </select>
        </Field>
        <Field label="Total price"><input name="totalPrice" type="number" min="0" step="0.01" value={totalPrice} onChange={(event) => setTotalPrice(Number(event.target.value) || 0)} className={inputClass} /></Field>
        <Field label="Advance payment"><input name="advancePayment" type="number" min="0" step="0.01" value={advancePayment} onChange={(event) => setAdvancePayment(Number(event.target.value) || 0)} className={inputClass} /></Field>
        <Field label="Remaining amount"><input readOnly value={remainingAmount.toFixed(2)} className={`${inputClass} text-emerald-100`} /></Field>
        <Field label="Appointment date"><input name="appointmentDate" type="date" defaultValue={initial.appointmentDate} className={inputClass} /></Field>
        <Field label="Appointment time"><input name="appointmentTime" type="time" defaultValue={initial.appointmentTime} className={inputClass} /></Field>
      </div>
      <Field label="Exact address"><textarea required name="exactAddress" defaultValue={initial.exactAddress} rows={3} className={inputClass} /></Field>
      <Field label="Project description"><textarea required name="description" defaultValue={initial.description} rows={4} className={inputClass} /></Field>
      <Field label="Notes"><textarea name="notes" defaultValue={initial.notes} rows={3} className={inputClass} /></Field>

      <div className="sticky bottom-4 z-20 rounded-2xl border border-white/10 bg-black/75 p-3 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className={`min-w-0 break-words text-sm ${message.includes("saved") ? "text-emerald-200" : "text-white/58"}`}>{message || `Remaining amount: ${money(remainingAmount)}`}</p>
          <button disabled={saving} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-black transition hover:bg-emerald-200 disabled:opacity-50">
            <CheckCircle2 className="h-4 w-4" />
            {saving ? "Saving..." : mode === "edit" ? "Save changes" : "Add client"}
          </button>
        </div>
      </div>
    </form>
  );
}

export function FieldCRMClientsTable({ clients }: { clients: FieldCRMClientView[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<FieldCRMClientView | null>(null);
  const cities = useMemo(() => Array.from(new Set(clients.map((client) => client.city).filter(Boolean))).sort(), [clients]);

  const filtered = clients.filter((client) => {
    const haystack = [client.clientName, client.phoneNumber, client.businessName, client.city, client.serviceType].join(" ").toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (!city || client.city === city) && (!status || client.status === status);
  });

  async function updateStatus(client: FieldCRMClientView, nextStatus: FieldCRMStatus) {
    await fetch(`/api/field-crm/clients/${client.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    router.refresh();
  }

  async function deleteClient(client: FieldCRMClientView) {
    if (!window.confirm(`Delete ${client.clientName}?`)) return;
    await fetch(`/api/field-crm/clients/${client.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="grid gap-4">
      <div className="grid min-w-0 grid-cols-1 gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl md:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_180px_190px_auto]">
        <div className="relative min-w-0 md:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search clients" className={`${inputClass} mt-0 pl-10`} />
        </div>
        <select value={city} onChange={(event) => setCity(event.target.value)} className={`${inputClass} mt-0`}>
          <option value="">All cities</option>
          {cities.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
        <select value={status} onChange={(event) => setStatus(event.target.value)} className={`${inputClass} mt-0`}>
          <option value="">All statuses</option>
          {fieldCRMStatuses.map((item) => <option key={item} value={item}>{fieldCRMStatusLabels[item]}</option>)}
        </select>
        <Link href="/admin/field-crm/add" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-black hover:bg-emerald-200">
          <Plus className="h-4 w-4" />
          Add client
        </Link>
      </div>

      <div className="grid gap-3 lg:hidden">
        {filtered.map((client) => (
          <article key={client.id} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl">
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="truncate text-lg font-medium text-white">{client.clientName}</h2>
                <p className="mt-1 truncate text-sm text-white/48">{client.businessName || client.serviceType}</p>
              </div>
              <StatusBadge status={client.status} />
            </div>

            <div className="mt-4 grid min-w-0 grid-cols-1 gap-3 text-sm sm:grid-cols-2">
              <div className="min-w-0 rounded-xl border border-white/8 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-white/35">Location</div>
                <div className="mt-2 font-medium text-white">{client.city || "No city"}</div>
                <p className="mt-1 break-words text-white/48">{client.exactAddress || "No address"}</p>
              </div>
              <div className="min-w-0 rounded-xl border border-white/8 bg-black/20 p-3">
                <div className="text-xs uppercase tracking-[0.18em] text-white/35">Appointment</div>
                <div className="mt-2 font-medium text-white">{client.appointmentDate || "No date"}</div>
                <div className="mt-1 text-white/48">{client.appointmentTime || "No time"}</div>
              </div>
              <div className="min-w-0 rounded-xl border border-white/8 bg-black/20 p-3 sm:col-span-2">
                <div className="text-xs uppercase tracking-[0.18em] text-white/35">Payment</div>
                <div className="mt-2 grid grid-cols-1 gap-2 text-white sm:grid-cols-3">
                  <div className="min-w-0"><span className="text-white/42">Total </span><span className="font-medium">{money(client.totalPrice)}</span></div>
                  <div className="min-w-0 text-emerald-100/85"><span className="text-white/42">Paid </span><span className="font-medium">{money(client.advancePayment)}</span></div>
                  <div className="min-w-0 text-white/72"><span className="text-white/42">Left </span><span className="font-medium">{money(client.remainingAmount)}</span></div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <ContactActions client={client} />
              <ClientActionButtons client={client} onEdit={() => setEditing(client)} onDelivered={() => updateStatus(client, "DELIVERED")} onCancelled={() => updateStatus(client, "CANCELLED")} onDelete={() => deleteClient(client)} />
            </div>
          </article>
        ))}
        {!filtered.length && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-8 text-center text-sm text-white/50 backdrop-blur-xl">No clients match these filters.</div>
        )}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[24%]" />
              <col className="w-[22%]" />
              <col className="w-[13%]" />
              <col className="w-[13%]" />
              <col className="w-[16%]" />
              <col className="w-[12%]" />
            </colgroup>
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-white/42">
              <tr>
                <th className="px-4 py-4 font-medium">Client</th>
                <th className="px-4 py-4 font-medium">Location</th>
                <th className="px-4 py-4 font-medium">Appointment</th>
                <th className="px-4 py-4 font-medium">Status</th>
                <th className="px-4 py-4 font-medium">Payment</th>
                <th className="px-4 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {filtered.map((client) => (
                <tr key={client.id} className="align-top text-white/76">
                  <td className="min-w-0 px-4 py-4">
                    <div className="truncate font-medium text-white">{client.clientName}</div>
                    <div className="mt-1 truncate text-white/48">{client.businessName || client.serviceType}</div>
                    <div className="mt-2"><ContactActions client={client} /></div>
                  </td>
                  <td className="min-w-0 px-4 py-4">
                    <div className="truncate text-white">{client.city}</div>
                    <div className="mt-1 line-clamp-2 break-words text-white/48">{client.exactAddress}</div>
                  </td>
                  <td className="min-w-0 px-4 py-4">
                    <div className="truncate">{client.appointmentDate || "No date"}</div>
                    <div className="mt-1 text-white/48">{client.appointmentTime || "No time"}</div>
                  </td>
                  <td className="min-w-0 px-4 py-4"><StatusBadge status={client.status} /></td>
                  <td className="min-w-0 px-4 py-4">
                    <div className="truncate font-medium">{money(client.totalPrice)}</div>
                    <div className="mt-1 truncate text-emerald-100/80">Paid {money(client.advancePayment)}</div>
                    <div className="truncate text-white/48">Left {money(client.remainingAmount)}</div>
                  </td>
                  <td className="min-w-0 px-4 py-4">
                    <ClientActionButtons client={client} onEdit={() => setEditing(client)} onDelivered={() => updateStatus(client, "DELIVERED")} onCancelled={() => updateStatus(client, "CANCELLED")} onDelete={() => deleteClient(client)} />
                  </td>
                </tr>
              ))}
              {!filtered.length && (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-white/50">No clients match these filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 p-4 backdrop-blur-md">
          <div className="mx-auto my-6 max-w-5xl rounded-2xl border border-white/10 bg-[#05070d] p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-emerald-100/70">Edit client</div>
                <h2 className="mt-2 text-3xl font-light tracking-tight">{editing.clientName}</h2>
              </div>
              <button onClick={() => setEditing(null)} className="rounded-full border border-white/12 px-4 py-2 text-sm text-white/72">Close</button>
            </div>
            <FieldCRMForm client={editing} mode="edit" />
          </div>
        </div>
      )}
    </div>
  );
}

export function MoneyStat({ label, value }: { label: string; value: number }) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:p-5">
      <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/60">{label}</div>
      <div className="mt-3 truncate text-2xl font-light tracking-tight text-white sm:text-3xl">{money(value)}</div>
    </div>
  );
}
