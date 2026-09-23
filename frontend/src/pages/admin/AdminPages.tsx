import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { TreeLifecycle } from "../../components/trees/TreeLifecycle";
import { CertificateModal } from "../../components/certificates/CertificateModal";
import {
  ShieldCheck,
  FileCheck2,
  Trees,
  FolderKanban,
  Users,
  Building2,
  Check,
  X,
  AlertTriangle,
  Eye,
  Search,
  ExternalLink,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Tree, VerificationStatus } from "../../types";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export const AdminOverviewPage: React.FC = () => {
  const { trees, campaigns, organizations, navigate, verifyPlantation } = useApp();

  const pendingVerificationTrees = trees.filter(
    (t) => t.verificationStatus === "pending" || t.status === "planted"
  );
  const verifiedCount = trees.filter((t) => t.verificationStatus === "verified").length;
  const plantedCount = trees.filter((t) => t.status !== "sponsored" && t.status !== "assigned").length;

  const statusDistribution = [
    { name: "Verified", value: verifiedCount, color: "#15803D" },
    { name: "Pending Audit", value: pendingVerificationTrees.length, color: "#EAB308" },
    { name: "Growing", value: trees.filter((t) => t.status === "growing").length, color: "#166534" },
    { name: "Sponsored Queue", value: trees.filter((t) => t.status === "sponsored").length, color: "#94A3B8" },
  ];

  return (
    <DashboardLayout
      roleScope="admin"
      activeSection="Overview"
      title="Admin Operations Console"
      subtitle="Auditing field plantation proof, regulating campaigns, and certifying environmental impact."
      actions={
        <button
          onClick={() => navigate("/admin/verification")}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
        >
          <FileCheck2 className="h-4 w-4" />
          <span>Verification Queue ({pendingVerificationTrees.length})</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* System Metric Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Total Trees Registered</span>
              <Trees className="h-4 w-4 text-slate-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {trees.length.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">
              Across {campaigns.length} campaigns
            </span>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-amber-800 font-medium">
              <span>Pending Audit Queue</span>
              <AlertTriangle className="h-4 w-4 text-amber-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-amber-900 font-mono tabular-nums">
              {pendingVerificationTrees.length}
            </div>
            <button
              onClick={() => navigate("/admin/verification")}
              className="text-[11px] text-amber-800 font-semibold hover:underline mt-1 block"
            >
              Inspect Proofs →
            </button>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Verified & Certified</span>
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-emerald-800 font-mono tabular-nums">
              {verifiedCount}
            </div>
            <span className="text-[11px] text-emerald-700 font-medium mt-1 block">
              Issued cryptographic IDs
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Partner Organizations</span>
              <Building2 className="h-4 w-4 text-slate-600" />
            </div>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
              {organizations.length}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Govt, NGOs & CSRs</span>
          </div>
        </div>

        {/* Charts & Quick Audit Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Status Breakdown */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Tree Lifecycle Distribution
            </h3>
            <div className="h-60 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
              {statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span>
                    {item.name}: <strong>{item.value}</strong>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Pending Verifications Feed */}
          <div className="lg:col-span-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  High Priority Verification Queue
                </h3>
                <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {pendingVerificationTrees.length} Pending
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Field photos submitted with GPS tags requiring auditor review.
              </p>

              <div className="mt-4 space-y-3">
                {pendingVerificationTrees.slice(0, 3).map((tree) => (
                  <div
                    key={tree.id}
                    className="p-3.5 rounded-xl border border-slate-100 bg-[#FCFDFB] flex items-center justify-between gap-4"
                  >
                    <div className="space-y-0.5 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-900">{tree.treeId}</span>
                        <span className="text-[10px] text-slate-500">{tree.city}</span>
                      </div>
                      <p className="font-medium text-slate-800">{tree.species}</p>
                      <p className="text-[11px] text-slate-500">
                        GPS: {tree.plantationProof?.gpsCoordinates?.display || "24.8607° N, 67.0011° E"}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => verifyPlantation(tree.treeId, "verified")}
                        className="rounded-lg bg-emerald-700 p-2 text-white hover:bg-emerald-800 transition-colors shadow-xs"
                        title="Quick Approve & Issue Certificate"
                      >
                        <Check className="h-4 w-4 stroke-[3]" />
                      </button>
                      <button
                        onClick={() => navigate("/admin/verification")}
                        className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 transition-colors"
                        title="Inspect full details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/admin/verification")}
              className="mt-4 w-full rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center"
            >
              Open Full Verification Console →
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export const AdminVerificationPage: React.FC = () => {
  const { trees, verifyPlantation, navigate } = useApp();
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<VerificationStatus | "all">("pending");

  const pendingList = trees.filter((tree) => {
    const matchesFilter = activeFilter === "all" || tree.verificationStatus === activeFilter;
    const matchesSearch =
      tree.treeId.toLowerCase().includes(search.toLowerCase()) ||
      tree.species.toLowerCase().includes(search.toLowerCase()) ||
      tree.city.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <DashboardLayout
      roleScope="admin"
      activeSection="Verification Queue"
      title="Plantation Verification Auditing"
      subtitle="Inspect high-res photos, coordinate tags, and timestamps submitted by field teams before approving."
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search Tree ID, species, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {(["pending", "verified", "rejected", "all"] as const).map((st) => (
              <button
                key={st}
                onClick={() => setActiveFilter(st)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                  activeFilter === st
                    ? "bg-slate-900 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Queue Table */}
        <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Tree ID</th>
                <th className="py-3 px-4">Species</th>
                <th className="py-3 px-4">Field Squad</th>
                <th className="py-3 px-4">GPS Coordinates</th>
                <th className="py-3 px-4">Audit Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pendingList.map((tree) => (
                <tr key={tree.id} className="hover:bg-slate-50">
                  <td className="py-3.5 px-4 font-mono font-bold text-emerald-900">
                    {tree.treeId}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800">{tree.species}</td>
                  <td className="py-3.5 px-4 text-slate-600">
                    {tree.plantationProof?.plantedByTeamName || "Alpha Field Team"}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                    {tree.plantationProof?.gpsCoordinates?.display || "24.8607° N, 67.0011° E"}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        tree.verificationStatus === "verified"
                          ? "bg-emerald-100 text-emerald-800"
                          : tree.verificationStatus === "rejected"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {tree.verificationStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedTree(tree)}
                      className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                    >
                      Inspect Proof
                    </button>
                    {tree.verificationStatus === "pending" && (
                      <button
                        onClick={() => verifyPlantation(tree.treeId, "verified")}
                        className="rounded-lg bg-emerald-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Proof Inspection Modal */}
      {selectedTree && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50">
              <div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Auditing Proof: {selectedTree.treeId}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedTree.species} · {selectedTree.campaignName}
                </p>
              </div>
              <button
                onClick={() => setSelectedTree(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Photo */}
              <div className="rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200">
                <img
                  src={selectedTree.plantationProof?.photoUrl || "/assets/images/tree_sapling.png"}
                  alt="Field plantation proof"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Coordinates & Metadata */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Coordinates
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {selectedTree.plantationProof?.gpsCoordinates?.display || "24.8607° N, 67.0011° E"}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Plantation Timestamp
                  </span>
                  <span className="font-medium text-slate-800">
                    {selectedTree.plantationProof?.plantedAt || "2026-02-15 09:30 AM"}
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">
                    Field Team Soil & Survival Notes
                  </span>
                  <span className="text-slate-700">
                    {selectedTree.plantationProof?.notes || "Healthy root ball set in rich organic mulch. 10L drip irrigation delivered."}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    verifyPlantation(selectedTree.treeId, "rejected", "Photo quality insufficient");
                    setSelectedTree(null);
                  }}
                  className="flex-1 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors"
                >
                  Reject Proof (Request Retake)
                </button>
                <button
                  onClick={() => {
                    verifyPlantation(selectedTree.treeId, "verified");
                    setSelectedTree(null);
                  }}
                  className="flex-1 rounded-xl bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
                >
                  Approve & Issue Certificate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
