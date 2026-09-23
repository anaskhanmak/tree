import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SponsorModal } from "../../components/campaigns/SponsorModal";
import { Campaign } from "../../types";
import {
  MapPin,
  Building2,
  Calendar,
  ShieldCheck,
  Sprout,
  Trees,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Share2,
  Users,
} from "lucide-react";

interface CampaignDetailPageProps {
  campaignId: string;
}

export const CampaignDetailPage: React.FC<CampaignDetailPageProps> = ({ campaignId }) => {
  const { campaigns, trees, organizations, navigate } = useApp();
  const [sponsorModalOpen, setSponsorModalOpen] = useState(false);

  const campaign =
    campaigns.find((c) => c.id === campaignId || c.slug === campaignId) || campaigns[0];

  const organization =
    organizations.find((o) => o.id === campaign.organizationId) || organizations[0];

  const campaignTrees = trees.filter((t) => t.campaignId === campaign.id);

  const progressPct = Math.round((campaign.sponsoredTrees / campaign.targetTrees) * 100);
  const remainingTrees = Math.max(campaign.targetTrees - campaign.sponsoredTrees, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Cover Banner */}
      <div className="relative h-72 sm:h-96 w-full bg-slate-900 overflow-hidden">
        <img
          src={campaign.coverImage}
          alt={campaign.name}
          className="h-full w-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-0 inset-x-0 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-300 font-medium mb-2">
            <span className="flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{campaign.area}, {campaign.city}</span>
            </span>
            <span>·</span>
            <span>{campaign.organizationType} Initiative</span>
            <span>·</span>
            <span className="capitalize">{campaign.status}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-display text-white">
            {campaign.name}
          </h1>
        </div>
      </div>

      {/* Campaign Content Body */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Organization Trust Badge */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-white border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-emerald-50 text-xl border border-emerald-100">
                  {campaign.organizationLogo}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold text-slate-900">{campaign.organizationName}</h3>
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  </div>
                  <p className="text-xs text-slate-500">{organization.description.slice(0, 80)}...</p>
                </div>
              </div>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                Verified Authority
              </span>
            </div>

            {/* Mission & Overview */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Campaign Mission & Ecological Context
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">{campaign.description}</p>
              <div className="rounded-xl bg-emerald-50/70 border border-emerald-100 p-4">
                <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                  Strategic Target
                </h4>
                <p className="text-xs text-emerald-800 leading-relaxed">{campaign.mission}</p>
              </div>
            </div>

            {/* Indigenous Species Deployed */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Indigenous Tree Species Planted
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {campaign.treeSpecies.map((species) => (
                  <div
                    key={species}
                    className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center gap-2.5"
                  >
                    <Sprout className="h-4 w-4 text-emerald-700 shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-slate-800 block truncate">{species}</span>
                      <span className="text-[10px] text-slate-500">Native Climate Resilient</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Plantation Proofs from this Campaign */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900 font-display">
                  Recent Verified Plantations ({campaignTrees.length})
                </h2>
                <span className="text-xs text-slate-400">Live Field Records</span>
              </div>

              {campaignTrees.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {campaignTrees.slice(0, 4).map((tree) => (
                    <div
                      key={tree.id}
                      onClick={() => navigate(`/trees/${tree.treeId}`)}
                      className="group cursor-pointer rounded-xl border border-slate-200 p-3 hover:border-emerald-300 transition-colors bg-[#FCFDFB]"
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono font-bold text-emerald-900">{tree.treeId}</span>
                        <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded capitalize">
                          {tree.status}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-slate-800">{tree.species}</p>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Planted by {tree.plantationProof?.plantedByTeamName || "Alpha Field Squad"}
                      </p>
                      <div className="mt-2 text-[10px] text-emerald-700 font-semibold flex items-center gap-1 group-hover:underline">
                        <span>View lifecycle timeline</span>
                        <ArrowRight className="h-3 w-3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">
                  New campaign. First batch of sponsored trees are currently being assigned to the field unit.
                </p>
              )}
            </div>
          </div>

          {/* Sidebar Sponsorship Action (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Sponsorship Action Card */}
            <div className="sticky top-20 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Contribution Rate
                </span>
                <div className="text-3xl font-extrabold text-slate-900 font-mono mt-0.5">
                  PKR {campaign.pricePerTree.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500"> / sapling</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Includes native sapling, soil enrichers, GPS tagging, and 2 years of field maintenance.
                </p>
              </div>

              {/* Progress */}
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">Campaign Progress</span>
                  <span className="font-bold text-emerald-800">{progressPct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full"
                    style={{ width: `${Math.min(progressPct, 100)}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 text-slate-600">
                  <div>
                    <span className="block text-[10px] text-slate-400">Sponsored</span>
                    <span className="font-bold text-slate-900">
                      {campaign.sponsoredTrees.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Target</span>
                    <span className="font-bold text-slate-900">
                      {campaign.targetTrees.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Planted</span>
                    <span className="font-bold text-emerald-800">
                      {campaign.plantedTrees.toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400">Surviving</span>
                    <span className="font-bold text-emerald-700">
                      {campaign.survivingTrees.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sponsor CTA Button */}
              <button
                onClick={() => setSponsorModalOpen(true)}
                className="w-full rounded-xl bg-emerald-700 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-800 transition-colors flex items-center justify-center gap-2"
              >
                <span>Sponsor a Tree in This Campaign</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-500">
                <div className="flex justify-between">
                  <span>Start Date:</span>
                  <span className="font-medium text-slate-700">{campaign.startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Target Completion:</span>
                  <span className="font-medium text-slate-700">{campaign.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Verification Guarantee:</span>
                  <span className="font-medium text-emerald-800">100% Field Audited</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {sponsorModalOpen && (
        <SponsorModal campaign={campaign} onClose={() => setSponsorModalOpen(false)} />
      )}
    </div>
  );
};
