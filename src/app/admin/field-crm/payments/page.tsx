import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CmsHeader } from "@/components/cms/CmsShell";
import { MoneyStat } from "@/components/field-crm/FieldCRMClient";
import { requireAdmin } from "@/lib/cms/auth";
import { getFieldCRMClients, getFieldCRMStats } from "@/lib/field-crm";
import { moneyLabel } from "@/lib/field-crm/formatters";

export const dynamic = "force-dynamic";

export default async function FieldCRMPaymentsPage() {
  await requireAdmin("/admin/field-crm/payments");
  const clients = await getFieldCRMClients();
  const stats = getFieldCRMStats(clients);
  const unpaid = clients.filter((client) => client.remainingAmount > 0).sort((a, b) => b.remainingAmount - a.remainingAmount);

  return (
    <>
      <CmsHeader
        eyebrow="Field CRM"
        title="Payments"
        description="Track total revenue, paid advances and remaining client balances."
      />

      <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-3">
        <MoneyStat label="Total revenue" value={stats.totalRevenue} />
        <MoneyStat label="Total paid" value={stats.paidAmount} />
        <MoneyStat label="Total remaining" value={stats.remainingAmount} />
      </div>

      <section className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] backdrop-blur-xl">
        <div className="border-b border-white/10 p-4 sm:p-5">
          <div className="text-xs uppercase tracking-[0.22em] text-emerald-100/60">{unpaid.length} unpaid balances</div>
          <h2 className="mt-2 break-words text-2xl font-light tracking-tight">Clients with unpaid balance</h2>
        </div>

        <div className="grid gap-3 p-4 md:hidden">
          {unpaid.map((client) => (
            <article key={client.id} className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-4 text-sm">
              <div className="flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-medium text-white">{client.clientName}</h3>
                  <p className="mt-1 truncate text-white/48">{client.businessName || client.serviceType}</p>
                  <p className="mt-1 truncate text-white/48">{client.city}</p>
                </div>
                <Link href="/admin/field-crm/clients" className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/12 text-white/72 hover:border-emerald-300/35 hover:text-emerald-100" aria-label="Open clients">
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-4 grid grid-cols-1 gap-2 rounded-xl border border-white/8 bg-white/[0.035] p-3">
                <div className="flex min-w-0 justify-between gap-3"><span className="text-white/42">Total</span><span className="truncate text-white">{moneyLabel(client.totalPrice)}</span></div>
                <div className="flex min-w-0 justify-between gap-3"><span className="text-white/42">Paid</span><span className="truncate text-emerald-100/80">{moneyLabel(client.advancePayment)}</span></div>
                <div className="flex min-w-0 justify-between gap-3"><span className="text-white/42">Remaining</span><span className="truncate text-white">{moneyLabel(client.remainingAmount)}</span></div>
              </div>
            </article>
          ))}
          {!unpaid.length && <div className="rounded-xl border border-white/10 bg-black/24 p-8 text-center text-sm text-white/50">No unpaid balances.</div>}
        </div>

        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] table-fixed text-left text-sm">
            <colgroup>
              <col className="w-[30%]" />
              <col className="w-[16%]" />
              <col className="w-[16%]" />
              <col className="w-[16%]" />
              <col className="w-[16%]" />
              <col className="w-[6%]" />
            </colgroup>
            <thead className="border-b border-white/10 text-xs uppercase tracking-[0.18em] text-white/42">
              <tr>
                <th className="px-4 py-4 font-medium">Client</th>
                <th className="px-4 py-4 font-medium">City</th>
                <th className="px-4 py-4 font-medium">Total</th>
                <th className="px-4 py-4 font-medium">Paid</th>
                <th className="px-4 py-4 font-medium">Remaining</th>
                <th className="px-4 py-4 font-medium">Open</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/8">
              {unpaid.map((client) => (
                <tr key={client.id} className="text-white/76">
                  <td className="min-w-0 px-4 py-4">
                    <div className="truncate font-medium text-white">{client.clientName}</div>
                    <div className="mt-1 truncate text-white/48">{client.businessName || client.serviceType}</div>
                  </td>
                  <td className="min-w-0 px-4 py-4"><div className="truncate">{client.city}</div></td>
                  <td className="min-w-0 px-4 py-4"><div className="truncate">{moneyLabel(client.totalPrice)}</div></td>
                  <td className="min-w-0 px-4 py-4 text-emerald-100/80"><div className="truncate">{moneyLabel(client.advancePayment)}</div></td>
                  <td className="min-w-0 px-4 py-4 text-white"><div className="truncate">{moneyLabel(client.remainingAmount)}</div></td>
                  <td className="px-4 py-4">
                    <Link href="/admin/field-crm/clients" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/72 hover:border-emerald-300/35 hover:text-emerald-100" aria-label="Open clients">
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {!unpaid.length && <tr><td colSpan={6} className="px-4 py-10 text-center text-white/50">No unpaid balances.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
