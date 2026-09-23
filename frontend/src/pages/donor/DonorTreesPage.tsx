import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { TreeLifecycle } from "../../components/trees/TreeLifecycle";
import { CertificateModal } from "../../components/certificates/CertificateModal";
import { Search, Filter, ShieldCheck, MapPin, Award, ArrowRight, Sprout, LayoutGrid, List } from "lucide-react";
import { Tree, Certificate } from "../../types";

export const DonorTreesPage: React.FC = () => {
  const { currentUser, trees, certificates, navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  const myTrees = trees.filter((t) => t.donorId === currentUser.id);

  const filteredTrees = myTrees.filter((tree) => {
    const matchesSearch =
      tree.treeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.campaignName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tree.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || tree.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="My Trees"
      title="My Sponsored Trees"
      subtitle={`You have sponsored ${myTrees.length} native trees across Pakistan.`}
      actions={
        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-lg border border-slate-200 bg-white p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded ${viewMode === "grid" ? "bg-slate-100 text-slate-800" : "text-slate-400"}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded ${viewMode === "table" ? "bg-slate-100 text-slate-800" : "text-slate-400"}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={() => navigate("/campaigns")}
            className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
          >
            + Sponsor Another Tree
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Tree ID, species, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs text-slate-500 font-medium">Filter Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 focus:border-emerald-600 focus:outline-none"
            >
              <option value="all">All Stages ({myTrees.length})</option>
              <option value="sponsored">Sponsored</option>
              <option value="assigned">Assigned</option>
              <option value="planted">Planted</option>
              <option value="verified">Verified</option>
              <option value="growing">Growing</option>
            </select>
          </div>
        </div>

        {/* Trees View */}
        {filteredTrees.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTrees.map((tree) => {
                const cert = certificates.find((c) => c.treeId === tree.treeId);
                return (
                  <div
                    key={tree.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded">
                          {tree.treeId}
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded capitalize">
                          {tree.status}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-display">
                        {tree.species}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-emerald-600 shrink-0" />
                        <span>{tree.area}, {tree.city}</span>
                      </p>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                        Campaign: {tree.campaignName}
                      </p>

                      {tree.dedicationMessage && (
                        <div className="mt-2 text-[11px] italic text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                          "{tree.dedicationMessage}"
                        </div>
                      )}

                      {/* Mini Lifecycle Bar */}
                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <TreeLifecycle tree={tree} orientation="horizontal" showDetails={false} />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => navigate(`/trees/${tree.treeId}`)}
                        className="flex-1 rounded-lg bg-emerald-50 py-2 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors text-center"
                      >
                        View Public Ledger
                      </button>
                      {cert && (
                        <button
                          onClick={() => setActiveCert(cert)}
                          className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                          title="View Digital Certificate"
                        >
                          <Award className="h-4 w-4 text-emerald-700" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Table View */
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold">
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
                  {filteredTrees.map((tree) => {
                    const cert = certificates.find((c) => c.treeId === tree.treeId);
                    return (
                      <tr key={tree.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-mono font-bold text-emerald-900">
                          {tree.treeId}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">{tree.species}</td>
                        <td className="py-3.5 px-4 text-slate-600">{tree.campaignName}</td>
                        <td className="py-3.5 px-4 text-slate-600">{tree.area}, {tree.city}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase bg-emerald-50 text-emerald-800">
                            {tree.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="text-emerald-700 font-medium capitalize">
                            {tree.verificationStatus}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-2">
                          {cert && (
                            <button
                              onClick={() => setActiveCert(cert)}
                              className="text-emerald-700 hover:underline font-semibold"
                            >
                              Certificate
                            </button>
                          )}
                          <button
                            onClick={() => navigate(`/trees/${tree.treeId}`)}
                            className="text-slate-700 hover:underline font-semibold"
                          >
                            Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-3">
            <Sprout className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="text-base font-bold text-slate-800">No trees found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No sponsored trees matched your search or status filter.
            </p>
          </div>
        )}
      </div>

      {activeCert && (
        <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />
      )}
    </DashboardLayout>
  );
};
