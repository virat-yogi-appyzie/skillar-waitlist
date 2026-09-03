"use client";

import { useMemo, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SampleDataBadge from "@/components/SampleDataBadge";
import { mapCopy, tree, type MapNode } from "@/content/fixtures/capability-map";

/**
 * An operable drill-down, not a picture of one: the visitor clicks from the
 * whole organisation to one flagged skill, and the breadcrumb they build is
 * the point of the section ("the same query at different depths").
 *
 * Rows the product would flag carry a subtle score bar and a below-target
 * marker; leaves show what the product does about the gap.
 */

function nodeAtPath(path: string[]): MapNode {
  let node: MapNode = tree;
  for (const id of path) {
    const next = node.children?.find((c) => c.id === id);
    if (!next) break;
    node = next;
  }
  return node;
}

function ScoreBar({ node }: { node: MapNode }) {
  const below = node.score < node.target;
  return (
    <div className="w-24 shrink-0">
      <div className="flex justify-between text-[11px] tabular mb-1">
        <span className={below ? "text-rose-300" : "text-emerald-300"}>{node.score}</span>
        <span className="text-white/60">{node.target}</span>
      </div>
      <div className="relative h-1 rounded-full bg-white/10 overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 rounded-full ${below ? "bg-rose-400" : "bg-emerald-400"}`}
          style={{ width: `${node.score}%` }}
        />
        <div className="absolute inset-y-0 w-px bg-white/60" style={{ left: `${node.target}%` }} />
      </div>
    </div>
  );
}

export default function CapabilityMap({ className = "" }: { className?: string }) {
  const [path, setPath] = useState<string[]>([]);

  const current = useMemo(() => nodeAtPath(path), [path]);
  const depth = path.length;
  const crumbs = useMemo(() => {
    const nodes: MapNode[] = [tree];
    let node = tree;
    for (const id of path) {
      const next = node.children?.find((c) => c.id === id);
      if (!next) break;
      nodes.push(next);
      node = next;
    }
    return nodes;
  }, [path]);

  return (
    <div className={`rounded-2xl bg-[#0B1424] border border-white/10 shadow-2xl shadow-navy/40 text-white overflow-hidden ${className}`}>
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-white/10 flex items-center justify-between gap-3 flex-wrap">
        <span className="font-serif text-lg sm:text-xl">{mapCopy.title}</span>
        <SampleDataBadge tone="dark" />
      </div>

      {/* Breadcrumb trail: the artifact the interaction builds */}
      <nav aria-label="Drill-down path" className="px-5 sm:px-6 py-3 border-b border-white/10 bg-white/[0.02]">
        <ol className="flex items-center gap-1 flex-wrap text-sm">
          {crumbs.map((node, i) => {
            const isLast = i === crumbs.length - 1;
            return (
              <li key={node.id} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-white/40" aria-hidden="true" />}
                {isLast ? (
                  <span aria-current="location" className="px-1.5 py-0.5 text-white font-medium">
                    {node.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPath(path.slice(0, i))}
                    className="px-1.5 py-0.5 rounded text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    {node.label}
                  </button>
                )}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="grid grid-cols-[auto_1fr]">
        {/* Depth rail */}
        <div className="hidden sm:flex flex-col gap-0 border-r border-white/10 py-5 px-4">
          {mapCopy.levels.map((level, i) => (
            <div key={level} className="flex items-center gap-2.5 py-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${i === depth ? "bg-cyan-300" : i < depth ? "bg-white/50" : "bg-white/20"}`}
              />
              <span className={`text-xs ${i === depth ? "text-white" : "text-white/60"}`}>{level}</span>
            </div>
          ))}
        </div>

        {/* Current level */}
        <div className="p-5 sm:p-6 min-h-[21rem]">
          {current.children ? (
            <>
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-sm text-white/70">{current.sublabel}</p>
                {depth > 0 && (
                  <button
                    type="button"
                    onClick={() => setPath(path.slice(0, -1))}
                    className="inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    {mapCopy.backLabel}
                  </button>
                )}
              </div>
              <ul className="space-y-1.5">
                {current.children.map((child) => (
                  <li key={child.id}>
                    <button
                      type="button"
                      onClick={() =>
                        child.children || child.action
                          ? setPath([...path, child.id])
                          : undefined
                      }
                      disabled={!child.children && !child.action}
                      className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border text-left transition-colors duration-150 ${
                        child.flagged
                          ? "border-rose-400/40 bg-rose-500/[0.08]"
                          : "border-white/10 bg-white/[0.03]"
                      } ${
                        child.children || child.action
                          ? "cursor-pointer hover:border-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                          : "opacity-80 cursor-default"
                      }`}
                    >
                      <span className="flex-1 min-w-0">
                        <span className="block text-sm font-medium text-white truncate">
                          {child.label}
                        </span>
                        <span className="block text-xs text-white/60 truncate">{child.sublabel}</span>
                      </span>
                      <ScoreBar node={child} />
                      <span className="hidden sm:block text-xs text-white/60 w-24 text-right shrink-0">
                        {child.countLabel}
                      </span>
                      {(child.children || child.action) && (
                        <ChevronRight className="w-4 h-4 text-white/40 shrink-0" aria-hidden="true" />
                      )}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-white/60">{mapCopy.hint}</p>
            </>
          ) : (
            /* Leaf: the skill, and what happens about it */
            <div className="flex flex-col justify-center min-h-[18rem]">
              <button
                type="button"
                onClick={() => setPath(path.slice(0, -1))}
                className="self-start inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition-colors mb-6 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                {mapCopy.backLabel}
              </button>
              <p className="text-sm text-white/70">{current.sublabel}</p>
              <p className="font-serif text-3xl text-white mt-1">{current.label}</p>
              <div className="mt-5 flex items-baseline gap-2">
                <span
                  className={`font-mono text-5xl tabular ${current.score < current.target ? "text-rose-300" : "text-emerald-300"}`}
                >
                  {current.score}
                </span>
                <span className="text-sm text-white/60 tabular">vs {current.target} required</span>
              </div>
              <div className="relative mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden max-w-sm">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full ${current.score < current.target ? "bg-rose-400" : "bg-emerald-400"}`}
                  style={{ width: `${current.score}%` }}
                />
                <div className="absolute inset-y-0 w-px bg-white/70" style={{ left: `${current.target}%` }} />
              </div>
              {current.action && (
                <p className="mt-6 text-sm text-white/70 leading-relaxed max-w-md">{current.action}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
