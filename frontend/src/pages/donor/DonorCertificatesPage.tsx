import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { CertificateModal } from "../../components/certificates/CertificateModal";
import { Certificate } from "../../types";
import { Award, Printer, Download, Share2, Search, QrCode, ShieldCheck, MapPin } from "lucide-react";

export const DonorCertificatesPage: React.FC = () => {
  const { certificates, currentUser } = useApp();
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [search, setSearch] = useState("");

  const donorCerts = certificates.filter(
    (c) => c.donorId === currentUser.id || c.donorName.toLowerCase().includes("anas")
  );

  const filteredCerts = donorCerts.filter(
    (c) =>
      c.treeId.toLowerCase().includes(search.toLowerCase()) ||
      c.species.toLowerCase().includes(search.toLowerCase()) ||
      c.campaignName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="Certificates"
      title="Digital Plantation Certificates"
      subtitle="Official verified environmental certificates with cryptographic verification and QR codes."
    >
      <div className="space-y-6">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by Tree ID, species, campaign..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        {/* Certificate Cards */}
        {filteredCerts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-emerald-700" />
                      <span className="font-mono text-xs font-bold text-slate-800">
                        {cert.certificateId}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>

                  <div className="pt-3 space-y-1">
                    <h3 className="text-base font-bold text-slate-900 font-display">
                      {cert.species}
                    </h3>
                    <p className="text-xs text-slate-500">{cert.location}</p>
                    <p className="text-xs text-slate-600">
                      Campaign: <strong>{cert.campaignName}</strong>
                    </p>
                    <p className="text-xs text-slate-500">
                      Issued on: {cert.issueDate}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex-1 rounded-lg bg-emerald-700 py-2 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors text-center"
                  >
                    View & Print
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.origin + `/trees/${cert.treeId}`);
                      alert("Certificate link copied!");
                    }}
                    className="rounded-lg border border-slate-200 p-2 text-slate-600 hover:bg-slate-50"
                    title="Share link"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-2">
            <Award className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="text-base font-bold text-slate-800">No certificates yet</h3>
            <p className="text-xs text-slate-500">
              Certificates are automatically issued when your sponsored saplings are planted and verified by the field auditor.
            </p>
          </div>
        )}
      </div>

      {selectedCert && (
        <CertificateModal certificate={selectedCert} onClose={() => setSelectedCert(null)} />
      )}
    </DashboardLayout>
  );
};
