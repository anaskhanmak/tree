import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { siteConfig } from "../../config/site";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SponsorModal } from "../../components/campaigns/SponsorModal";
import { ASSETS } from "../../mock/data";
import { Campaign } from "../../types";
import {
  Sprout,
  ShieldCheck,
  MapPin,
  Trees,
  Award,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  Calendar,
  Building2,
  Check,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const LandingPage: React.FC = () => {
  const { campaigns, trees, navigate } = useApp();
  const [selectedCampaignForSponsor, setSelectedCampaignForSponsor] = useState<Campaign | null>(null);

  const featuredCampaigns = campaigns.slice(0, 3);
  const sampleTree = trees.find((t) => t.treeId === "TREE-KHI-2026-00125") || trees[0];

  const steps = [
    {
      num: "01",
      title: "Sponsor a Tree",
      desc: "Select an active urban forest, mangrove, or community campaign and fund native saplings.",
      icon: Sprout,
    },
    {
      num: "02",
      title: "Field Assignment",
      desc: "Our geo-system allocates your tree to an authorized, trained local plantation squad.",
      icon: MapPin,
    },
    {
      num: "03",
      title: "Planted in Soil",
      desc: "Field squads dig, plant, water, and upload photographic proof with GPS coordinates.",
      icon: Trees,
    },
    {
      num: "04",
      title: "Admin Verification",
      desc: "Independent conservation auditors inspect coordinates and issue cryptographic proof.",
      icon: ShieldCheck,
    },
    {
      num: "05",
      title: "Lifecycle Growth",
      desc: "Receive growth photos, height logs, and survival checks at 1, 3, 6, and 12 months.",
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80 bg-white">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 -z-10 h-[500px] w-[500px] rounded-full bg-emerald-50 blur-3xl opacity-70" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50/80 px-3.5 py-1 text-xs font-semibold text-emerald-800">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>Verified Anti-Greenwashing Environmental Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight font-display leading-[1.1]">
                Sponsor a Tree. <br />
                <span className="text-emerald-700">Track Its Journey.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Sponsor indigenous trees in critical urban and coastal ecosystems. Receive cryptographic Tree IDs, field GPS verification, and quarterly growth updates with digital certificates.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <button
                  onClick={() => navigate("/campaigns")}
                  className="flex items-center justify-center gap-2 rounded-xl bg-emerald-700 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-emerald-800 transition-all hover:shadow-lg"
                >
                  <span>Sponsor a Tree</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => navigate("/campaigns")}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <span>Explore 45 Campaigns</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-slate-100 grid grid-cols-3 gap-4 text-xs text-slate-500">
                <div>
                  <span className="block font-bold text-slate-900 text-sm">100% Native</span>
                  <span>Zero invasive species</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-sm">GPS Tagged</span>
                  <span>Geocoded soil coordinate</span>
                </div>
                <div>
                  <span className="block font-bold text-slate-900 text-sm">2-Year Care</span>
                  <span>Survival maintenance</span>
                </div>
              </div>
            </div>

            {/* Right Visual: Drone Plantation Shot + Floating Card (Mandated in #47) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 aspect-[4/3] group">
                <img
                  src={ASSETS.hero}
                  alt="Verified tree afforestation initiative"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                {/* Bottom photo caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <div className="font-semibold">{sampleTree.campaignName}</div>
                  <div className="text-emerald-300 text-[11px]">{sampleTree.area}, {sampleTree.city}</div>
                </div>
              </div>

              {/* Mandatory Floating Verification Card as requested in #47 */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border border-slate-200 w-64 animate-in fade-in slide-in-from-bottom-3 duration-500">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <span className="font-mono text-xs font-bold text-emerald-900">
                    {sampleTree.treeId}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">Verified ID</span>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                    <span>Planted (15 Jan 2025)</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700 font-medium">
                    <Check className="h-3.5 w-3.5 text-emerald-600 stroke-[3]" />
                    <span>Verified (Field Auditor)</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 font-bold">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>Growing (175 cm Height)</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/trees/${sampleTree.treeId}`)}
                  className="mt-3 flex w-full items-center justify-between rounded-lg bg-emerald-50 py-1.5 px-2.5 text-[11px] font-semibold text-emerald-800 hover:bg-emerald-100 transition-colors"
                >
                  <span>View Full Tree Timeline</span>
                  <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Platform Statistics Section (as specified in #6) */}
      <section className="border-b border-slate-200 bg-slate-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                25,430
              </div>
              <div className="text-xs font-medium text-slate-600 mt-1">Trees Sponsored</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
                21,850
              </div>
              <div className="text-xs font-medium text-slate-600 mt-1">Trees Planted</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
                18,420
              </div>
              <div className="text-xs font-medium text-slate-600 mt-1">Trees Verified</div>
            </div>
            <div className="p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
                17,260
              </div>
              <div className="text-xs font-medium text-slate-600 mt-1">Trees Surviving (93.8%)</div>
            </div>
            <div className="col-span-2 md:col-span-1 p-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 font-mono tabular-nums">
                45
              </div>
              <div className="text-xs font-medium text-slate-600 mt-1">Active Campaigns</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Transparent Lifecycle
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display">
              How TreeMint Works
            </h2>
            <p className="text-sm text-slate-600">
              A five-stage chain of custody connecting donors, verified ground teams, and survival tracking.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="rounded-xl border border-slate-200/80 bg-[#FCFDFB] p-6 space-y-3 hover:border-emerald-300 transition-colors relative"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {step.num}
                    </span>
                    <Icon className="h-5 w-5 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Featured Campaigns */}
      <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Verified Initiatives
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 font-display mt-1">
                Featured Plantation Campaigns
              </h2>
            </div>
            <button
              onClick={() => navigate("/campaigns")}
              className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <span>View All 45 Campaigns</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Campaign Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCampaigns.map((camp) => {
              const progressPct = Math.round((camp.sponsoredTrees / camp.targetTrees) * 100);
              const remainingTrees = camp.targetTrees - camp.sponsoredTrees;

              return (
                <div
                  key={camp.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  {/* Image Banner */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={camp.coverImage}
                      alt={camp.name}
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-slate-800 shadow-xs flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-emerald-600" />
                      <span>{camp.city}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Quiet Unboxed Metadata per Zero-Pill Rule */}
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1.5">
                        <span className="font-medium text-slate-700">{camp.organizationName}</span>
                        <span>·</span>
                        <span>{camp.organizationType}</span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 font-display leading-snug">
                        {camp.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                        {camp.description}
                      </p>
                    </div>

                    {/* Progress Bar & Stats */}
                    <div className="space-y-2 border-t border-slate-100 pt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-medium">
                          {camp.sponsoredTrees.toLocaleString()} / {camp.targetTrees.toLocaleString()} sponsored
                        </span>
                        <span className="font-bold text-emerald-800">{progressPct}%</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${Math.min(progressPct, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-[11px] text-slate-500">
                        <span>{remainingTrees.toLocaleString()} trees needed</span>
                        <span className="font-semibold text-slate-800">PKR {camp.pricePerTree} / tree</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                      <button
                        onClick={() => navigate(`/campaigns/${camp.id}`)}
                        className="flex-1 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors text-center"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setSelectedCampaignForSponsor(camp)}
                        className="flex-1 rounded-lg bg-emerald-700 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors text-center"
                      >
                        Sponsor Tree
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Why TreeMint Section */}
      <section className="py-16 sm:py-24 border-b border-slate-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Institutional Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 font-display">
                Why TreeMint Eliminates Greenwashing
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Conventional tree planting charities suffer from phantom numbers and zero post-planting accountability. TreeMint fixes this by pairing every sponsored tree with field GPS verification and long-term survival monitoring.
              </p>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-900">Cryptographic Tree IDs:</strong> Each sapling receives a unique permanent identifier tracked from nursery to forest canopy.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-900">Quad-Milestone Growth Logs:</strong> Height measurements and photo updates recorded at 1, 3, 6, and 12 months.
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-slate-900">Official Shareable Certificates:</strong> Download and print verifiable certificates with live QR verification codes.
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <img
                  src={ASSETS.fieldTeam}
                  alt="Verified field plantation teams"
                  className="w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Partner Organizations */}
      <section className="py-12 border-b border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-6">
            Authorized Campaign Partners & Conservation Bodies
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-80">
            <div className="flex items-center gap-2 font-display font-bold text-slate-700 text-sm">
              <span className="text-xl">🌿</span> Sindh Forest Dept
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-700 text-sm">
              <span className="text-xl">🐼</span> WWF Pakistan
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-700 text-sm">
              <span className="text-xl">🌳</span> Green Karachi Trust
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-700 text-sm">
              <span className="text-xl">🌲</span> Punjab Forestry
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-slate-700 text-sm">
              <span className="text-xl">🌱</span> Engro Foundation
            </div>
          </div>
        </div>
      </section>

      {/* 7. Call To Action */}
      <section className="py-16 sm:py-20 bg-emerald-900 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-display">
            Start Your Green Journey Today
          </h2>
          <p className="text-sm sm:text-base text-emerald-100 max-w-xl mx-auto leading-relaxed">
            Join thousands of individual donors and certified forestry partners restoring Pakistan's canopy cover. Receive your first verified Tree ID in under two minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate("/campaigns")}
              className="w-full sm:w-auto rounded-xl bg-white px-8 py-3.5 text-sm font-bold text-emerald-900 shadow-md hover:bg-emerald-50 transition-colors"
            >
              Sponsor Your First Tree
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="w-full sm:w-auto rounded-xl border border-emerald-700 px-8 py-3.5 text-sm font-semibold text-white hover:bg-emerald-800 transition-colors"
            >
              Explore Donor Dashboard
            </button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Interactive Sponsor Modal */}
      {selectedCampaignForSponsor && (
        <SponsorModal
          campaign={selectedCampaignForSponsor}
          onClose={() => setSelectedCampaignForSponsor(null)}
        />
      )}
    </div>
  );
};
