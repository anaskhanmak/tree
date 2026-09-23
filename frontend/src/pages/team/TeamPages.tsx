import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import {
  Sprout,
  Trees,
  FileCheck2,
  Camera,
  MapPin,
  Check,
  Upload,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { ASSETS } from "../../mock/data";

export const TeamOverviewPage: React.FC = () => {
  const { trees, currentUser, navigate } = useApp();

  const assignedTrees = trees.filter(
    (t) => t.status === "assigned" || t.status === "sponsored" || t.status === "planted"
  );
  const pendingPlantation = trees.filter((t) => t.status === "assigned" || t.status === "sponsored");
  const plantedCount = trees.filter((t) => t.status === "planted" || t.status === "growing").length;

  return (
    <DashboardLayout
      roleScope="plantation_team"
      activeSection="Overview"
      title="Field Plantation Operations"
      subtitle="Operational console for field squads planting saplings and capturing geotagged evidence."
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/team/plantation")}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
          >
            <Camera className="h-4 w-4" />
            <span>Upload Plantation Proof</span>
          </button>
          <button
            onClick={() => navigate("/team/growth-updates")}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Sprout className="h-4 w-4 text-emerald-600" />
            <span>Log Growth Audit</span>
          </button>
        </div>
      }
    >
      <div className="space-y-8">
        {/* Quick Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Assigned to Unit</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
              {assignedTrees.length}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Karachi & Thatta Grids</span>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-5 shadow-xs">
            <span className="text-xs text-amber-800 font-medium">Awaiting In-Soil Planting</span>
            <div className="mt-2 text-2xl font-extrabold text-amber-900 font-mono">
              {pendingPlantation.length}
            </div>
            <span className="text-[11px] text-amber-700 mt-1 block">Nursery ready</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Proof Uploaded</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-800 font-mono">
              {plantedCount}
            </div>
            <span className="text-[11px] text-emerald-700 mt-1 block">GPS coordinates verified</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Field Unit Status</span>
            <div className="mt-2 text-lg font-bold text-emerald-900">Active Duty</div>
            <span className="text-[11px] text-slate-500 mt-1 block">Alpha Field Squad</span>
          </div>
        </div>

        {/* Assigned Trees List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Field Queue: Saplings Assigned for Planting
              </h3>
              <p className="text-xs text-slate-500">
                Pick a tree to upload field photograph and record coordinates.
              </p>
            </div>
            <button
              onClick={() => navigate("/team/plantation")}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              Submit Evidence →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {assignedTrees.slice(0, 6).map((tree) => (
              <div
                key={tree.id}
                className="rounded-xl border border-slate-200 p-4 space-y-3 bg-[#FCFDFB] hover:border-emerald-300 transition-colors"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-emerald-900">{tree.treeId}</span>
                  <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                    {tree.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{tree.species}</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {tree.area}, {tree.city}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Donor: {tree.donorName}
                  </span>
                  <button
                    onClick={() => navigate("/team/plantation")}
                    className="text-xs font-bold text-emerald-700 hover:underline"
                  >
                    Upload Proof
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export const TeamPlantationProofPage: React.FC = () => {
  const { trees, submitPlantationProof, navigate } = useApp();

  const [selectedTreeId, setSelectedTreeId] = useState<string>(
    trees.find((t) => t.status === "assigned" || t.status === "sponsored")?.treeId || trees[0].treeId
  );
  const [gpsText, setGpsText] = useState("24.8607° N, 67.0011° E (Clifton Zone 4)");
  const [soilNotes, setSoilNotes] = useState("Loamy sand amended with organic compost; drip watered 8L.");
  const [teamName, setTeamName] = useState("Alpha Karachi Field Squad");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      submitPlantationProof(selectedTreeId, {
        gpsText,
        notes: soilNotes,
        teamName,
        photoUrl: ASSETS.sapling,
      });
      setIsSubmitting(false);
      navigate(`/trees/${selectedTreeId}`);
    }, 600);
  };

  return (
    <DashboardLayout
      roleScope="plantation_team"
      activeSection="Plantation Proof"
      title="Submit In-Soil Plantation Proof"
      subtitle="Upload geotagged photographic proof to fulfill donor sponsorship and trigger verification."
    >
      <div className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          {/* Target Tree Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Assigned Tree ID
            </label>
            <select
              value={selectedTreeId}
              onChange={(e) => setSelectedTreeId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            >
              {trees.map((t) => (
                <option key={t.treeId} value={t.treeId}>
                  {t.treeId} — {t.species} ({t.city}, {t.area})
                </option>
              ))}
            </select>
          </div>

          {/* Photo Upload Area */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Field High-Res Photo Evidence
            </label>
            <div className="rounded-xl border-2 border-dashed border-slate-300 p-6 text-center bg-slate-50 space-y-3">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-800">
                  Field Photo Attached (Ready for Sync)
                </p>
                <p className="text-[11px] text-slate-500">
                  EXIF metadata parsed: 4032 x 3024 px · Tag: Stake #412
                </p>
              </div>
              <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                ✓ Valid Geotag Timestamp Embedded
              </span>
            </div>
          </div>

          {/* GPS Coordinates */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              GPS Location Coordinates
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-emerald-600" />
              <input
                type="text"
                value={gpsText}
                onChange={(e) => setGpsText(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs font-mono text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Squad & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Field Squad Name
              </label>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Plantation Date
              </label>
              <input
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Soil Condition & Mulch Notes
            </label>
            <textarea
              rows={3}
              value={soilNotes}
              onChange={(e) => setSoilNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Uploading Geotagged Proof..." : "Submit Proof for Admin Verification"}
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export const TeamGrowthUpdatesPage: React.FC = () => {
  const { trees, submitGrowthUpdate, navigate } = useApp();

  const [treeId, setTreeId] = useState(trees[0].treeId);
  const [milestone, setMilestone] = useState<"Month 1" | "Month 3" | "Month 6" | "Month 12">(
    "Month 3"
  );
  const [heightCm, setHeightCm] = useState(65);
  const [healthStatus, setHealthStatus] = useState<"Thriving" | "Good" | "Needs Care">("Thriving");
  const [notes, setNotes] = useState("Vigorous shoot growth, stem caliper increased to 3cm, root anchor firm.");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitGrowthUpdate(treeId, {
      milestone,
      heightCm,
      healthStatus,
      notes,
    });
    navigate(`/trees/${treeId}`);
  };

  return (
    <DashboardLayout
      roleScope="plantation_team"
      activeSection="Growth Updates"
      title="Field Growth & Survival Audit"
      subtitle="Submit scheduled height measurements and health audits for living saplings."
    >
      <div className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Tree ID
            </label>
            <select
              value={treeId}
              onChange={(e) => setTreeId(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            >
              {trees.map((t) => (
                <option key={t.treeId} value={t.treeId}>
                  {t.treeId} — {t.species} ({t.city})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Audit Milestone
              </label>
              <select
                value={milestone}
                onChange={(e) => setMilestone(e.target.value as any)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              >
                <option value="Month 1">Month 1 (Rooting)</option>
                <option value="Month 3">Month 3 (Vegetative)</option>
                <option value="Month 6">Month 6 (Canopy)</option>
                <option value="Month 12">Month 12 (Survival Check)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Height (Centimeters)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Health Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["Thriving", "Good", "Needs Care"] as const).map((h) => (
                <button
                  type="button"
                  key={h}
                  onClick={() => setHealthStatus(h)}
                  className={`rounded-lg border py-2 text-xs font-bold transition-colors ${
                    healthStatus === h
                      ? "border-emerald-700 bg-emerald-50 text-emerald-800"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Field Observations & Maintenance Notes
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
          >
            Save Growth Log & Notify Donor
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};
