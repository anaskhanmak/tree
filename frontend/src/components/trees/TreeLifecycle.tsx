import React from "react";
import { Tree, TreeLifecycleStage } from "../../types";
import { Check, Circle, Clock, ShieldCheck, Sprout, Trees, Eye, CheckCircle2 } from "lucide-react";

interface TreeLifecycleProps {
  tree: Tree;
  orientation?: "horizontal" | "vertical";
  showDetails?: boolean;
}

const STAGES: {
  key: TreeLifecycleStage;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    key: "sponsored",
    label: "Sponsored",
    description: "Donor contribution confirmed and digital Tree ID generated.",
    icon: Sprout,
  },
  {
    key: "assigned",
    label: "Assigned",
    description: "Allocated to authorized field plantation squad with geo-grid target.",
    icon: Clock,
  },
  {
    key: "planted",
    label: "Planted",
    description: "Sapling rooted in soil; field team submitted high-res proof & GPS.",
    icon: Sprout,
  },
  {
    key: "verified",
    label: "Verified",
    description: "Admin audited GPS coordinates, soil tag, and plantation proof photo.",
    icon: ShieldCheck,
  },
  {
    key: "growing",
    label: "Growing",
    description: "Active canopy monitoring, periodic watering, and height measurements.",
    icon: Trees,
  },
  {
    key: "survival-check",
    label: "Survival Check",
    description: "Annual audit confirming root establishment and self-sustaining growth.",
    icon: CheckCircle2,
  },
];

const STAGE_ORDER: Record<TreeLifecycleStage, number> = {
  sponsored: 0,
  assigned: 1,
  planted: 2,
  verified: 3,
  growing: 4,
  "survival-check": 5,
};

export const TreeLifecycle: React.FC<TreeLifecycleProps> = ({
  tree,
  orientation = "horizontal",
  showDetails = true,
}) => {
  const currentStageIndex = STAGE_ORDER[tree.status] ?? 0;

  return (
    <div className="w-full">
      {orientation === "horizontal" ? (
        <div className="relative">
          {/* Progress Connecting Line */}
          <div className="absolute top-5 left-6 right-6 hidden md:block h-0.5 bg-slate-200" />
          <div
            className="absolute top-5 left-6 hidden md:block h-0.5 bg-emerald-600 transition-all duration-500"
            style={{
              width: `${(currentStageIndex / (STAGES.length - 1)) * 90}%`,
            }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
            {STAGES.map((stage, idx) => {
              const isCompleted = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              const isUpcoming = idx > currentStageIndex;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.key}
                  className="flex flex-col items-center text-center p-3 rounded-xl transition-all"
                >
                  {/* Step Circle Indicator */}
                  <div
                    className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full font-medium transition-all ${
                      isCompleted
                        ? "bg-emerald-700 text-white shadow-sm ring-4 ring-emerald-50"
                        : isCurrent
                        ? "bg-emerald-600 text-white ring-4 ring-emerald-100 shadow-md animate-pulse"
                        : "bg-slate-100 text-slate-400 border border-slate-200"
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5 stroke-[2.5]" />
                    ) : (
                      <Icon className="h-4 w-4" />
                    )}
                  </div>

                  {/* Stage Label */}
                  <div className="mt-3">
                    <span
                      className={`block text-xs font-semibold uppercase tracking-wider ${
                        isCompleted
                          ? "text-emerald-800"
                          : isCurrent
                          ? "text-emerald-700 font-bold"
                          : "text-slate-400"
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {isCompleted
                        ? "Completed"
                        : isCurrent
                        ? "Current Phase"
                        : "Upcoming"}
                    </span>
                  </div>

                  {/* Specific timestamps & annotations */}
                  {showDetails && (
                    <div className="mt-2 text-[11px] text-slate-500 max-w-[130px] leading-tight hidden lg:block">
                      {stage.key === "sponsored" && <span>{tree.sponsoredDate}</span>}
                      {stage.key === "planted" && tree.plantationDate && (
                        <span>{tree.plantationDate}</span>
                      )}
                      {stage.key === "verified" && tree.verificationStatus === "verified" && (
                        <span className="text-emerald-700 font-medium">Verified ID</span>
                      )}
                      {stage.key === "growing" && tree.currentHeightCm && (
                        <span>{tree.currentHeightCm} cm height</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Vertical Orientation for Mobile & Sidebars */
        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
          {STAGES.map((stage, idx) => {
            const isCompleted = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;
            const isUpcoming = idx > currentStageIndex;
            const Icon = stage.icon;

            return (
              <div key={stage.key} className="flex items-start gap-4 relative">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    isCompleted
                      ? "bg-emerald-700 text-white shadow-sm"
                      : isCurrent
                      ? "bg-emerald-600 text-white ring-4 ring-emerald-100"
                      : "bg-slate-100 text-slate-400 border border-slate-200"
                  }`}
                >
                  {isCompleted ? <Check className="h-4 w-4" /> : idx + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-sm font-semibold ${
                        isCurrent
                          ? "text-emerald-800"
                          : isCompleted
                          ? "text-slate-900"
                          : "text-slate-400"
                      }`}
                    >
                      {stage.label}
                    </h4>
                    {isCurrent && (
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-medium">
                        Active
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{stage.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
