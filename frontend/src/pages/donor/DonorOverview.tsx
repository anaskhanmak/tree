import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CertificateModal } from "../../components/certificates/CertificateModal";
import {
  Trees,
  Sprout,
  ShieldCheck,
  Award,
  Flame,
  ArrowRight,
  TrendingUp,
  Download,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Wind,
  Leaf,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import { Certificate } from "../../types";

export const DonorOverview: React.FC = () => {
  const { currentUser, trees, certificates, badges, navigate } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  // Filter donor's trees
  const myTrees = trees.filter((t) => t.donorId === currentUser.id);
  const plantedCount = myTrees.filter((t) => t.status !== "sponsored" && t.status !== "assigned").length;
  const verifiedCount = myTrees.filter((t) => t.verificationStatus === "verified").length;
  const survivingCount = myTrees.filter((t) => t.survivalStatus === "Alive & Thriving").length;

  const co2OffsetKg = myTrees.length * 22; // ~22 kg/year per tree
  const oxygenProducedKg = myTrees.length * 118; // ~118 kg/year per mature tree

  // Chart data
  const growthTimelineData = [
    { month: "Jan", height: 18, trees: 2 },
    { month: "Feb", height: 35, trees: 4 },
    { month: "Mar", height: 55, trees: 6 },
    { month: "Apr", height: 85, trees: 8 },
    { month: "May", height: 120, trees: 10 },
    { month: "Jun", height: 165, trees: myTrees.length },
  ];

  const monthlyImpactData = [
    { month: "Jan", co2: 24, o2: 120 },
    { month: "Feb", co2: 48, o2: 250 },
    { month: "Mar", co2: 82, o2: 410 },
    { month: "Apr", co2: 130, o2: 670 },
    { month: "May", co2: 185, o2: 950 },
    { month: "Jun", co2: co2OffsetKg, o2: oxygenProducedKg },
  ];

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="Overview"
      title={`Welcome back, ${currentUser.name}`}
      subtitle="Here is the real-time ecological audit and growth progress of your sponsored canopy."
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/dashboard/impact")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Export ESG Report</span>
          </button>
          <button
            onClick={() => navigate("/campaigns")}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
          >
            <Sprout className="h-3.5 w-3.5" />
            <span>Sponsor Another Tree</span>
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Metric Cards Grid - Strictly unboxed and clean per saas dashboard rules */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Trees Sponsored</span>
              <Trees className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {myTrees.length}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
              100% Native Pakistani Flora
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Verified Planted</span>
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-emerald-800 font-mono tabular-nums">
              {verifiedCount}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {plantedCount} Planted on ground
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Green Points</span>
              <Flame className="h-4 w-4 text-amber-500" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {currentUser.points.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
              Level 3 Eco Guardian
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>CO2 Offset Potential</span>
              <Wind className="h-4 w-4 text-emerald-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {co2OffsetKg} <span className="text-sm font-normal text-slate-500">kg/yr</span>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              {oxygenProducedKg} kg O2 output
            </span>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Average Canopy Growth Height (Cm) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Average Sapling Height Progression
                </h3>
                <p className="text-xs text-slate-500">
                  Recorded across field inspection milestones (Centimeters).
                </p>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                Healthy Canopy
              </span>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthTimelineData}>
                  <defs>
                    <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#15803D" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#15803D" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} unit=" cm" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderRadius: "8px",
                      border: "none",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="height"
                    stroke="#15803D"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#growthGradient)"
                    name="Avg Height (cm)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Cumulative Carbon Sequestration (kg) */}
          <div className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Annual Carbon Sequestration
                </h3>
                <p className="text-xs text-slate-500">CO2 absorbed vs O2 produced (kg).</p>
              </div>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyImpactData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                  <XAxis dataKey="month" stroke="#94A3B8" fontSize={11} />
                  <YAxis stroke="#94A3B8" fontSize={11} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0F172A",
                      borderRadius: "8px",
                      border: "none",
                      color: "#FFFFFF",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="co2" fill="#15803D" radius={[4, 4, 0, 0]} name="CO2 Absorbed (kg)" />
                  <Bar dataKey="o2" fill="#84CC16" radius={[4, 4, 0, 0]} name="Oxygen Produced (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* My Sponsored Trees Preview Table */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                My Sponsored Trees ({myTrees.length})
              </h3>
              <p className="text-xs text-slate-500">
                Click any tree to inspect its field photos, GPS coordinates, and milestone logs.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/trees")}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
            >
              <span>View All Trees</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-100 bg-slate-50/70 text-slate-500 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">Tree ID</th>
                  <th className="py-3 px-4">Species</th>
                  <th className="py-3 px-4">Campaign</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Verification</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {myTrees.map((tree) => (
                  <tr
                    key={tree.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => navigate(`/trees/${tree.treeId}`)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-900">
                      {tree.treeId}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{tree.species}</td>
                    <td className="py-3.5 px-4 text-slate-600 truncate max-w-[150px]">
                      {tree.campaignName}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {tree.area}, {tree.city}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-800">
                        {tree.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 font-medium ${
                          tree.verificationStatus === "verified"
                            ? "text-emerald-700"
                            : "text-amber-600"
                        }`}
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span className="capitalize">{tree.verificationStatus}</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/trees/${tree.treeId}`);
                        }}
                        className="text-xs font-semibold text-emerald-700 hover:text-emerald-900 hover:underline"
                      >
                        View Timeline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Badges & Rewards Highlights */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Unlocked Environmental Badges
              </h3>
              <p className="text-xs text-slate-500">
                Earn badges by sponsoring trees, attending plantation drives, and verifying updates.
              </p>
            </div>
            <button
              onClick={() => navigate("/dashboard/rewards")}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              See All Rewards
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-xl border p-4 text-center space-y-2 transition-all ${
                  badge.unlocked
                    ? "border-emerald-200 bg-emerald-50/50"
                    : "border-slate-200 bg-slate-50 opacity-50"
                }`}
              >
                <div className="text-3xl mx-auto">{badge.icon || badge.iconName || "🌱"}</div>
                <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-2">{badge.description}</p>
                {badge.unlocked ? (
                  <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                    Unlocked
                  </span>
                ) : (
                  <span className="inline-block text-[10px] font-medium text-slate-400">
                    Locked
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedCert && (
        <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </DashboardLayout>
  );
};
