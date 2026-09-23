import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { TreeLifecycle } from "../../components/trees/TreeLifecycle";
import { CertificateModal } from "../../components/certificates/CertificateModal";
import {
  MapPin,
  Calendar,
  ShieldCheck,
  Sprout,
  QrCode,
  Award,
  ArrowRight,
  TrendingUp,
  Heart,
  Share2,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

interface TreeDetailPageProps {
  treeId: string;
}

export const TreeDetailPage: React.FC<TreeDetailPageProps> = ({ treeId }) => {
  const { trees, certificates, navigate } = useApp();
  const [certModalOpen, setCertModalOpen] = useState(false);

  const tree =
    trees.find((t) => t.treeId.toLowerCase() === treeId.toLowerCase() || t.id === treeId) ||
    trees[0];

  const certificate = certificates.find((c) => c.treeId === tree.treeId);

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    alert("Public Tree Verification link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* Header Banner */}
      <div className="border-b border-slate-200 bg-white py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-xs font-bold text-emerald-900 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  {tree.treeId}
                </span>
                <span className="text-xs text-slate-500 font-medium">Public Blockchain-Ready Ledger</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
                {tree.species}
              </h1>
              <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>{tree.area}, {tree.city}</span>
                <span>·</span>
                <span>Part of campaign: <strong>{tree.campaignName}</strong></span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={copyShareLink}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <Share2 className="h-3.5 w-3.5" />
                <span>Share Ledger</span>
              </button>
              {certificate && (
                <button
                  onClick={() => setCertModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 transition-colors"
                >
                  <Award className="h-4 w-4" />
                  <span>View Official Certificate</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1 space-y-8">
        {/* Important Tree Lifecycle Section (Mandated in #48) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Tree Lifecycle & Verification Pipeline
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                From initial sponsorship confirmation to 12-month survival certification.
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
              Current: {tree.status.toUpperCase()}
            </span>
          </div>

          <TreeLifecycle tree={tree} orientation="horizontal" showDetails={true} />
        </div>

        {/* Plantation Proof & Core Metadata Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Plantation Proof Photo & GPS Coordinates */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Field Plantation Proof
                </h3>
                <div className="flex items-center gap-1 text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Photo Proof</span>
                </div>
              </div>

              {tree.plantationProof ? (
                <div className="space-y-4">
                  <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-slate-100 border border-slate-200">
                    <img
                      src={tree.plantationProof.photoUrl}
                      alt={`Plantation proof for ${tree.treeId}`}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded">
                      GPS: {tree.plantationProof.gpsCoordinates.display}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                        Planted Timestamp
                      </span>
                      <span className="font-medium text-slate-800">
                        {tree.plantationProof.plantedAt}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                        Field Plantation Squad
                      </span>
                      <span className="font-medium text-slate-800">
                        {tree.plantationProof.plantedByTeamName}
                      </span>
                    </div>
                    {tree.plantationProof.soilCondition && (
                      <div className="col-span-2 border-t border-slate-200/60 pt-2">
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                          Soil & Medium Condition
                        </span>
                        <span className="text-slate-700">{tree.plantationProof.soilCondition}</span>
                      </div>
                    )}
                    {tree.plantationProof.notes && (
                      <div className="col-span-2">
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">
                          Field Notes
                        </span>
                        <span className="text-slate-700">{tree.plantationProof.notes}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center rounded-xl bg-slate-50 border border-dashed border-slate-200 text-xs text-slate-500">
                  Sapling is currently in propagation nursery prep. Ground team will plant and upload verified coordinates within 48 hours.
                </div>
              )}
            </div>

            {/* Growth Updates Timeline (Month 1, 3, 6, 12) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  Growth & Survival Updates ({tree.growthUpdates.length})
                </h3>
                <span className="text-xs text-slate-400">Quarterly Audits</span>
              </div>

              {tree.growthUpdates.length > 0 ? (
                <div className="space-y-4">
                  {tree.growthUpdates.map((update) => (
                    <div
                      key={update.id}
                      className="p-4 rounded-xl border border-slate-100 bg-[#FCFDFB] flex flex-col sm:flex-row gap-4"
                    >
                      <div className="h-24 w-24 shrink-0 rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        <img
                          src={update.imageUrl}
                          alt={update.monthMilestone}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="flex-1 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-emerald-800 text-sm">
                            {update.monthMilestone} Log
                          </span>
                          <span className="text-slate-400 text-[11px]">{update.date}</span>
                        </div>
                        <div className="flex items-center gap-4 text-slate-600">
                          <span>
                            Height: <strong className="text-slate-900">{update.heightCm} cm</strong>
                          </span>
                          <span>·</span>
                          <span>
                            Health: <strong className="text-emerald-700">{update.healthStatus}</strong>
                          </span>
                        </div>
                        <p className="text-slate-600 leading-relaxed pt-1">{update.notes}</p>
                        <span className="text-[10px] text-slate-400 block pt-1">
                          Audited by: {update.submittedBy}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl">
                  First monthly milestone audit (Month 1) will be posted after 30 days of root establishment.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Metadata & QR Verification */}
          <div className="lg:col-span-5 space-y-6">
            {/* Dedication Plaque */}
            {tree.dedicationMessage && (
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 space-y-2">
                <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <Heart className="h-3.5 w-3.5 fill-emerald-600 text-emerald-600" />
                  <span>Donor Dedication Plaque</span>
                </div>
                <blockquote className="italic text-xs text-slate-700 border-l-2 border-emerald-400 pl-3 py-1">
                  "{tree.dedicationMessage}"
                </blockquote>
                <div className="text-[11px] text-slate-500 font-medium">
                  Sponsored by <strong>{tree.donorName}</strong>
                </div>
              </div>
            )}

            {/* Tree Passport Details Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                Tree Registry Passport
              </h3>

              <div className="divide-y divide-slate-100 text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Tree Serial ID:</span>
                  <span className="font-mono font-bold text-slate-900">{tree.treeId}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Botanical Species:</span>
                  <span className="font-semibold text-slate-800">{tree.species}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Campaign:</span>
                  <span className="font-medium text-slate-800 truncate max-w-[180px] text-right">
                    {tree.campaignName}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Managing NGO / Dept:</span>
                  <span className="font-medium text-slate-800">{tree.organizationName}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Sponsored Date:</span>
                  <span className="text-slate-800">{tree.sponsoredDate}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Survival Status:</span>
                  <span className="font-bold text-emerald-700">{tree.survivalStatus}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-500">Audit Status:</span>
                  <span className="font-bold text-emerald-800 uppercase text-[11px]">
                    {tree.verificationStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Placeholder (Mandated in #49) */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center space-y-3 shadow-xs">
              <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 p-2 shadow-inner">
                <QrCode className="h-28 w-28 text-slate-800" />
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  On-Site QR Verification Code
                </h4>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto mt-1">
                  Physically engraved onto the weather-resistant bamboo stake next to this sapling. Scanning resolves directly to this public record.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {certModalOpen && certificate && (
        <CertificateModal certificate={certificate} onClose={() => setCertModalOpen(false)} />
      )}
    </div>
  );
};
