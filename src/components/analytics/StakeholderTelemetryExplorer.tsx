"use client";

import { useState } from "react";
import { User, Users, BarChart3, CheckCircle2 } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import {
  stakeholderHeader,
  learnerView,
  managerView,
  adminView,
} from "@/content/fixtures/stakeholder-views";

type Stakeholder = "learner" | "manager" | "executive";

const tabIcons = {
  learner: User,
  manager: Users,
  executive: BarChart3,
} as const;

export default function StakeholderTelemetryExplorer() {
  const [activeTier, setActiveTier] = useState<Stakeholder>("executive");

  return (
    <div className="rounded-3xl bg-surface-elevated border border-border shadow-card overflow-hidden">
      {/* Tier switcher */}
      <div className="p-6 sm:p-8 border-b border-border/80 bg-surface/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-sm text-navy-500">
              {stakeholderHeader.eyebrow}
            </span>
            <SampleDataBadge />
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-navy tracking-tight">
            {stakeholderHeader.title}
          </h3>
        </div>

        <div className="flex items-center p-1.5 rounded-2xl bg-surface border border-border/80 self-start md:self-auto">
          {stakeholderHeader.tabs.map((tier) => {
            const Icon = tabIcons[tier.id];
            const isSelected = activeTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id as Stakeholder)}
                aria-pressed={isSelected}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-navy text-white shadow-sm"
                    : "text-navy-500 hover:text-navy hover:bg-navy-50/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tier.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 sm:p-10">
        {/* Employee */}
        {activeTier === "learner" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs text-indigo-700 bg-indigo-50 px-3 py-1 rounded-md border border-indigo-100 font-semibold">
                {learnerView.badge}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-medium text-navy">
                {learnerView.title}
              </h4>
              <p className="text-navy-500 text-sm sm:text-base leading-relaxed font-light">
                {learnerView.body}
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-navy-500">
                {learnerView.points.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
                <span className="font-mono text-xs font-bold text-navy">{learnerView.panelTitle}</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded shrink-0">
                  {learnerView.panelBadge}
                </span>
              </div>

              <div className="space-y-3">
                {learnerView.skills.map((item) => (
                  <div key={item.skill} className="p-3 rounded-xl bg-surface-elevated border border-border/80">
                    <div className="flex justify-between text-xs font-mono mb-1.5 gap-3">
                      <span className="font-semibold text-navy">{item.skill}</span>
                      <span className="text-navy-500 shrink-0">{item.score}% · {item.status}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-surface border border-border overflow-hidden">
                      <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Manager */}
        {activeTier === "manager" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs text-sky-700 bg-sky-50 px-3 py-1 rounded-md border border-sky-100 font-semibold">
                {managerView.badge}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-medium text-navy">
                {managerView.title}
              </h4>
              <p className="text-navy-500 text-sm sm:text-base leading-relaxed font-light">
                {managerView.body}
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-navy-500">
                {managerView.points.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
                <span className="font-mono text-xs font-bold text-navy">{managerView.panelTitle}</span>
                <span className="text-[10px] font-mono text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded shrink-0">
                  {managerView.panelBadge}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {managerView.stats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-surface-elevated border border-border">
                    <span className="text-[10px] font-mono text-navy-500 block">{stat.label}</span>
                    <span className="font-serif text-2xl font-bold text-navy mt-1 block">{stat.value}</span>
                    <span className="text-[10px] font-mono text-navy-500">{stat.note}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between gap-3">
                <div>
                  <strong>{managerView.alertLead}</strong> {managerView.alertBody}
                </div>
                <button className="px-3 py-1 rounded bg-amber-200 hover:bg-amber-300 text-amber-900 font-mono text-[10px] font-bold transition-colors shrink-0">
                  {managerView.alertAction}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Admin */}
        {activeTier === "executive" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-md border border-purple-100 font-semibold">
                {adminView.badge}
              </span>
              <h4 className="font-serif text-2xl sm:text-3xl font-medium text-navy">
                {adminView.title}
              </h4>
              <p className="text-navy-500 text-sm sm:text-base leading-relaxed font-light">
                {adminView.body}
              </p>

              <div className="space-y-2 pt-2 text-xs font-mono text-navy-500">
                {adminView.points.map((point) => (
                  <div key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-surface border border-border shadow-xs space-y-4">
              <div className="flex items-center justify-between gap-3 pb-3 border-b border-border">
                <span className="font-mono text-xs font-bold text-navy">{adminView.panelTitle}</span>
                <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded shrink-0">
                  {adminView.panelBadge}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {adminView.stats.map((stat) => (
                  <div key={stat.label} className="p-4 rounded-xl bg-surface-elevated border border-border text-center">
                    <span className="text-[10px] font-mono text-navy-500 block">{stat.label}</span>
                    <span className="font-serif text-2xl font-bold text-navy mt-1 block">{stat.value}</span>
                    <span className="text-[10px] font-mono text-navy-500">{stat.note}</span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-navy text-white text-xs space-y-2">
                <div className="flex justify-between font-mono text-[11px] text-white/80 gap-3">
                  <span>{adminView.rowLabel}</span>
                  <span className="text-emerald-400 font-bold shrink-0">{adminView.rowValue}</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-indigo-400 to-emerald-400 rounded-full" style={{ width: "94%" }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
