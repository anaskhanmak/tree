import React from "react";
import { Certificate } from "../../types";
import { X, Printer, Download, Share2, ShieldCheck, Sprout, QrCode } from "lucide-react";
import { siteConfig } from "../../config/site";

interface CertificateModalProps {
  certificate: Certificate;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ certificate, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.origin + `/trees/${certificate.treeId}`);
    alert("Verification link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 my-8">
        {/* Modal Controls (Hidden in Print) */}
        <div className="no-print flex items-center justify-between border-b border-slate-200 px-6 py-3 bg-slate-50">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <ShieldCheck className="h-4 w-4 text-emerald-700" />
            <span>Digital Certificate of Plantation Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>Share</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Certificate Canvas */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-12 bg-[#FCFDFB] text-slate-900 relative border-8 border-double border-emerald-900/20 m-2 rounded-xl"
        >
          {/* Subtle Eco Watermark Emblem */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
            <Sprout className="w-96 h-96 text-emerald-900" />
          </div>

          {/* Certificate Header */}
          <div className="text-center space-y-2 relative">
            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-800 text-white mb-2 shadow-sm">
              <Sprout className="h-6 w-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-800">
              {siteConfig.name} Foundation
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Certificate of Verified Plantation
            </h1>
            <p className="text-xs text-slate-500 tracking-wide uppercase">
              Official Environmental Stewardship Record
            </p>
          </div>

          {/* Certificate Body */}
          <div className="my-8 text-center space-y-4 relative">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              This is to certify that
            </p>
            <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-900 border-b border-emerald-200 pb-2 inline-block px-8">
              {certificate.donorName}
            </div>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed pt-1">
              has sponsored and fostered the plantation of a native tree sapling, contributing to climate resilience and urban reforestation in Pakistan.
            </p>
          </div>

          {/* Verification Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-left relative">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Tree ID
              </span>
              <span className="font-mono font-bold text-emerald-900">
                {certificate.treeId}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Species
              </span>
              <span className="font-medium text-slate-800 truncate block">
                {certificate.species}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Plantation Date
              </span>
              <span className="font-medium text-slate-800">
                {certificate.plantationDate}
              </span>
            </div>
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Location
              </span>
              <span className="font-medium text-slate-800 truncate block">
                {certificate.location}
              </span>
            </div>
          </div>

          {/* Campaign & Partner */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 px-2 gap-2">
            <div>
              <span className="text-slate-400">Campaign: </span>
              <span className="font-semibold text-slate-800">{certificate.campaignName}</span>
            </div>
            <div>
              <span className="text-slate-400">Executing Org: </span>
              <span className="font-semibold text-slate-800">{certificate.organizationName}</span>
            </div>
          </div>

          {/* Certificate Footer with Signatures & QR Code */}
          <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-3 items-end gap-4 text-center">
            {/* Signatory 1 */}
            <div className="space-y-1">
              <div className="font-serif italic text-emerald-900 text-sm font-semibold border-b border-slate-300 pb-1 mx-2">
                Dr. Tariq Mansoor
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                Chief Conservation Officer
              </div>
            </div>

            {/* QR Code Verification */}
            <div className="flex flex-col items-center space-y-1">
              <div className="p-2 border border-slate-300 rounded-lg bg-white shadow-xs">
                <QrCode className="h-12 w-12 text-slate-800" />
              </div>
              <span className="text-[9px] font-mono text-slate-400 truncate max-w-[140px]">
                {certificate.certificateId}
              </span>
            </div>

            {/* Signatory 2 */}
            <div className="space-y-1">
              <div className="font-serif italic text-emerald-900 text-sm font-semibold border-b border-slate-300 pb-1 mx-2">
                Farhan Siddiqui
              </div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wider">
                Lead Field Verifier
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-[9px] text-slate-400 font-mono">
            Cryptographic Verification Hash: {certificate.verificationHash} · Issued on {certificate.issueDate}
          </div>
        </div>
      </div>
    </div>
  );
};
