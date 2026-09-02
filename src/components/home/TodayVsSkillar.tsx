/**
 * The page's one high-density screen: a real comparison table a buyer doing
 * research can sink their teeth into. The rhythm break matters as much as
 * the content. Static on purpose; the header row uses the body face, not a
 * mono costume.
 */

import { todayVsSkillar } from "@/content/home";

const rows = todayVsSkillar.rows;

export default function TodayVsSkillar() {
  return (
    <section className="py-20 lg:py-32 bg-surface-warm border-y border-border-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="font-serif text-[length:var(--text-display)] font-normal text-navy leading-tight tracking-[-0.025em] mb-5">
            {todayVsSkillar.heading}
          </h2>
          <p className="text-navy-500 text-lg leading-relaxed">
            {todayVsSkillar.lede}
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] border-collapse text-left">
            <thead>
              <tr>
                <th className="w-[18%] py-3 pr-4 text-sm font-semibold text-navy-500 align-bottom border-b border-navy/20">
                  {todayVsSkillar.columns.stage}
                </th>
                <th className="w-[41%] py-3 px-4 text-sm font-semibold text-navy-500 align-bottom border-b border-navy/20">
                  {todayVsSkillar.columns.today}
                </th>
                <th className="w-[41%] py-3 pl-4 text-sm font-semibold text-accent align-bottom border-b-2 border-accent/50">
                  {todayVsSkillar.columns.skillar}
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.stage} className="align-top">
                  <td className="py-5 pr-4 border-b border-border-warm">
                    <span className="text-sm font-semibold text-navy leading-snug block">
                      {r.stage}
                    </span>
                  </td>
                  <td className="py-5 px-4 border-b border-border-warm">
                    <span className="text-sm text-navy-500 leading-relaxed block">
                      {r.today}
                    </span>
                  </td>
                  <td className="py-5 pl-4 border-b border-border-warm bg-accent/[0.03]">
                    <span className="text-sm text-navy leading-relaxed block">
                      {r.skillar}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
