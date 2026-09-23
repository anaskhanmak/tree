import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import {
  FolderKanban,
  Trees,
  Sprout,
  Plus,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { Campaign } from "../../types";

export const OrganizationOverviewPage: React.FC = () => {
  const { campaigns, trees, currentUser, navigate } = useApp();

  const orgCampaigns = campaigns.filter(
    (c) => c.organizationId === currentUser.organizationId || c.organizationName.includes("Sindh")
  );

  const totalTarget = orgCampaigns.reduce((acc, c) => acc + c.targetTrees, 0);
  const totalSponsored = orgCampaigns.reduce((acc, c) => acc + c.sponsoredTrees, 0);

  return (
    <DashboardLayout
      roleScope="organization"
      activeSection="Overview"
      title="Partner Organization Portal"
      subtitle="Forestry initiative management for registered governmental, NGO, and institutional bodies."
      actions={
        <button
          onClick={() => navigate("/organization/campaigns/new")}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Launch New Campaign</span>
        </button>
      }
    >
      <div className="space-y-8">
        {/* Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Active Programs</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
              {orgCampaigns.length}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Government Verified</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Cumulative Target</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
              {totalTarget.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Trees scheduled</span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Sponsored by Donors</span>
            <div className="mt-2 text-2xl font-extrabold text-emerald-800 font-mono">
              {totalSponsored.toLocaleString()}
            </div>
            <span className="text-[11px] text-emerald-700 mt-1 block">
              {Math.round((totalSponsored / (totalTarget || 1)) * 100)}% funded
            </span>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
            <span className="text-xs text-slate-500 font-medium">Field Verification Score</span>
            <div className="mt-2 text-2xl font-extrabold text-slate-900 font-mono">
              98.4%
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">Zero discrepancy audits</span>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Managed Afforestation Programs
            </h3>
            <button
              onClick={() => navigate("/organization/campaigns/new")}
              className="text-xs font-semibold text-emerald-700 hover:underline"
            >
              + Create New Campaign
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orgCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="rounded-xl border border-slate-200 p-5 space-y-3 bg-[#FCFDFB]"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-emerald-800">{camp.city}</span>
                  <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                    {camp.status}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{camp.name}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{camp.description}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                  <span>
                    Sponsored: <strong>{camp.sponsoredTrees.toLocaleString()}</strong> / {camp.targetTrees.toLocaleString()}
                  </span>
                  <button
                    onClick={() => navigate(`/campaigns/${camp.id}`)}
                    className="text-emerald-700 font-bold hover:underline"
                  >
                    View Public Page →
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

export const OrganizationNewCampaignPage: React.FC = () => {
  const { createCampaign, navigate } = useApp();

  const [name, setName] = useState("");
  const [city, setCity] = useState("Karachi");
  const [area, setArea] = useState("");
  const [targetTrees, setTargetTrees] = useState(5000);
  const [pricePerTree, setPricePerTree] = useState(1500);
  const [description, setDescription] = useState("");
  const [mission, setMission] = useState("");
  const [speciesString, setSpeciesString] = useState("Neem, Peepal, Amaltas, Sheesham");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createCampaign({
      name,
      city,
      area,
      targetTrees,
      pricePerTree,
      description,
      mission,
      treeSpecies: speciesString.split(",").map((s) => s.trim()),
    });
    navigate("/organization");
  };

  return (
    <DashboardLayout
      roleScope="organization"
      activeSection="My Campaigns"
      title="Create Afforestation Campaign"
      subtitle="Launch a transparent, verified native planting initiative open for public and corporate sponsorship."
    >
      <div className="max-w-2xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-5"
        >
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Campaign Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Malir River Basin Native Tree Re-greening"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Target City
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Multan">Multan</option>
                <option value="Hyderabad">Hyderabad</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Area / Geo District
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Malir District, Zone B"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Target Trees (Quantity)
              </label>
              <input
                type="number"
                required
                value={targetTrees}
                onChange={(e) => setTargetTrees(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Price per Tree (PKR)
              </label>
              <input
                type="number"
                required
                value={pricePerTree}
                onChange={(e) => setPricePerTree(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Native Species (Comma separated)
            </label>
            <input
              type="text"
              required
              value={speciesString}
              onChange={(e) => setSpeciesString(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Campaign Description
            </label>
            <textarea
              rows={3}
              required
              placeholder="Ecological goals, community benefits, and site conditions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Ecological Mission & Commitment
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Establishing a permanent native buffer forest with 2-year irrigation..."
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
          >
            Publish Campaign to TreeMint Directory
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};
