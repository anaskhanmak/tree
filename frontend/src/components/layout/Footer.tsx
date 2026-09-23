import React from "react";
import { useApp } from "../../context/AppContext";
import { siteConfig } from "../../config/site";
import { Sprout, ShieldCheck, HeartHandshake, MapPin, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white">
                <Sprout className="h-5 w-5" />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              {siteConfig.description} Verified digital afforestation linking individual donors to verified field teams and government reserves.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                <span>{siteConfig.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Mail className="h-3.5 w-3.5 text-emerald-600" />
                <span>{siteConfig.contactEmail}</span>
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Platform
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/campaigns")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Explore Campaigns
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/trees/TREE-KHI-2026-00125")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Live Tree Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Donor Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard/rewards")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Green Points & Rewards
                </button>
              </li>
            </ul>
          </div>

          {/* Stakeholders */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Stakeholders
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => navigate("/organization")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Government & NGOs
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/team")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Plantation Field Teams
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/admin")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Admin Verification Panel
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate("/dashboard/certificates")}
                  className="hover:text-emerald-700 transition-colors"
                >
                  Digital Certificates
                </button>
              </li>
            </ul>
          </div>

          {/* Verification Badge */}
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/50 p-4 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              <span>Anti-Greenwashing</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every tree is assigned a verifiable serial ID with GPS coordinates, photographic proof of plantation, and scheduled 12-month survival health audits.
            </p>
            <div className="text-[11px] font-semibold text-emerald-700">
              100% Cryptographically Traceable
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {siteConfig.name} Platform. Final Year Project in Computer Science.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/#how-it-works")} className="hover:underline">
              Lifecycle Protocol
            </button>
            <button onClick={() => navigate("/dashboard/impact")} className="hover:underline">
              Carbon Metrics
            </button>
            <button onClick={() => navigate("/login")} className="hover:underline">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
