import Link from "next/link";
import { CalendarClock, CircleDollarSign, MapPinned, UserRoundPlus } from "lucide-react";
import { CmsCard, CmsHeader } from "@/components/cms/CmsShell";
import { requireAdmin } from "@/lib/cms/auth";
import { getFieldCRMClients, getFieldCRMStats } from "@/lib/field-crm";
import { moneyLabel } from "@/lib/field-crm/formatters";

export const dynamic = "force-dynamic";

const links = [
  { href: "/admin/field-crm/clients", label: "Clients", description: "Search, filter, edit, cancel, deliver and contact clients.", icon: UserRoundPlus },
  { href: "/admin/field-crm/add", label: "Add client", description: "Create a new outdoor shooting lead or confirmed project.", icon: UserRoundPlus },
  { href: "/admin/field-crm/planning", label: "Planning", description: "Today, tomorrow and weekly appointments grouped by city.", icon: CalendarClock },
  { href: "/admin/field-crm/payments", label: "Payments", description: "Revenue, paid amounts and unpaid balances.", icon: CircleDollarSign },
];

export default async function FieldCRMPage() {
  await requireAdmin("/admin/field-crm");
  const clients = await getFieldCRMClients();
  const stats = getFieldCRMStats(clients);
  const statCards = [
    ["Total clients", String(stats.totalClients)],
    ["Today appointments", String(stats.todayAppointments)],
    ["Confirmed appointments", String(stats.confirmedAppointments)],
    ["Cancelled appointments", String(stats.cancelledAppointments)],
    ["Total revenue", moneyLabel(stats.totalRevenue)],
    ["Paid amount", moneyLabel(stats.paidAmount)],
    ["Remaining amount", moneyLabel(stats.remainingAmount)],
  ];

  return (
    <>
      <CmsHeader
        eyebrow="Field CRM"
        title="Outdoor shooting command center"
        description="Manage Innovmark field clients, appointments, payments, locations and delivery status inside the existing admin dashboard."
        action={<Link href="/admin/field-crm/add" className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full bg-emerald-300 px-5 text-sm font-semibold text-black hover:bg-emerald-200 sm:w-auto"><UserRoundPlus className="h-4 w-4 shrink-0" /> Add client</Link>}
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([label, value]) => (
          <div key={label} className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:p-5">
            <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/60">{label}</div>
            <div className="mt-3 truncate text-2xl font-light tracking-tight text-white sm:text-3xl">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <CmsCard key={item.href} title={item.label} description={item.description}>
              <Link href={item.href} className="inline-flex min-h-10 max-w-full items-center gap-2 rounded-full border border-emerald-300/25 px-4 text-sm text-emerald-100 hover:border-emerald-200/60">
                <Icon className="h-4 w-4 shrink-0" />
                Open
              </Link>
            </CmsCard>
          );
        })}
      </div>

      <div className="mt-5 min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:p-5">
        <div className="flex min-w-0 items-start gap-3 text-white/82 sm:items-center">
          <MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-emerald-200 sm:mt-0" />
          <span className="min-w-0 text-sm leading-6">Use Google Maps links from client records for on-location navigation.</span>
        </div>
      </div>
    </>
  );
}
