import { CalendarClock, MapPinned } from "lucide-react";
import { CmsHeader } from "@/components/cms/CmsShell";
import { requireAdmin } from "@/lib/cms/auth";
import { addDays, fieldCRMStatusLabels, getFieldCRMClients, isoDate, type FieldCRMClientView } from "@/lib/field-crm";

export const dynamic = "force-dynamic";

function sortedByTime(clients: FieldCRMClientView[]) {
  return [...clients].sort((a, b) => (a.appointmentTime || "99:99").localeCompare(b.appointmentTime || "99:99"));
}

function groupByCity(clients: FieldCRMClientView[]) {
  return sortedByTime(clients).reduce<Record<string, FieldCRMClientView[]>>((groups, client) => {
    const city = client.city || "No city";
    groups[city] = [...(groups[city] ?? []), client];
    return groups;
  }, {});
}

function AppointmentGroups({ title, clients }: { title: string; clients: FieldCRMClientView[] }) {
  const groups = groupByCity(clients);
  const cities = Object.keys(groups).sort();

  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.045] p-4 backdrop-blur-xl sm:p-5">
      <div className="mb-5 flex min-w-0 items-center justify-between gap-4">
        <div className="min-w-0">
          <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/60">{clients.length} appointments</div>
          <h2 className="mt-2 truncate text-2xl font-light tracking-tight">{title}</h2>
        </div>
        <CalendarClock className="h-5 w-5 shrink-0 text-emerald-200" />
      </div>

      <div className="grid min-w-0 gap-4">
        {cities.map((city) => (
          <div key={city} className="min-w-0 rounded-xl border border-white/10 bg-black/24 p-4">
            <div className="mb-3 flex min-w-0 items-center gap-2 text-sm font-medium text-white">
              <MapPinned className="h-4 w-4 shrink-0 text-emerald-200" />
              <span className="truncate">{city}</span>
            </div>
            <div className="grid min-w-0 gap-3">
              {groups[city].map((client) => (
                <div key={client.id} className="grid min-w-0 grid-cols-1 gap-3 rounded-xl border border-white/8 bg-white/[0.035] p-3 text-sm md:grid-cols-[90px_minmax(0,1fr)_150px] md:items-center">
                  <div className="font-medium text-emerald-100">{client.appointmentTime || "No time"}</div>
                  <div className="min-w-0">
                    <div className="truncate text-white">{client.clientName}</div>
                    <div className="mt-1 break-words text-white/48">{client.serviceType} - {client.exactAddress}</div>
                  </div>
                  <div className="w-fit max-w-full rounded-full border border-white/10 px-3 py-1 text-center text-xs text-white/64 md:justify-self-end">{fieldCRMStatusLabels[client.status]}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!cities.length && <div className="rounded-xl border border-white/10 bg-black/24 p-6 text-center text-sm text-white/48">No appointments in this period.</div>}
      </div>
    </section>
  );
}

export default async function FieldCRMPlanningPage() {
  await requireAdmin("/admin/field-crm/planning");
  const clients = await getFieldCRMClients();
  const today = isoDate(new Date());
  const tomorrow = isoDate(addDays(new Date(), 1));
  const weekEnd = isoDate(addDays(new Date(), 7));
  const scheduled = clients.filter((client) => client.appointmentDate && client.status !== "CANCELLED");

  return (
    <>
      <CmsHeader
        eyebrow="Field CRM"
        title="Planning"
        description="Today, tomorrow and this week appointments sorted by time and grouped by city."
      />
      <div className="grid gap-5">
        <AppointmentGroups title="Today" clients={scheduled.filter((client) => client.appointmentDate === today)} />
        <AppointmentGroups title="Tomorrow" clients={scheduled.filter((client) => client.appointmentDate === tomorrow)} />
        <AppointmentGroups title="This week" clients={scheduled.filter((client) => client.appointmentDate >= today && client.appointmentDate <= weekEnd)} />
      </div>
    </>
  );
}
