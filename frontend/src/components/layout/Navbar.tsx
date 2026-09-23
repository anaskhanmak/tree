import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { siteConfig } from "../../config/site";
import { Sprout, User, Shield, Users, Menu, X, ArrowRight, Server, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import { UserRole } from "../../types";

export const Navbar: React.FC = () => {
  const { currentPath, navigate, currentUser, switchRole, backendStatus, backendInfo, pingBackend } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [apiModalOpen, setApiModalOpen] = useState(false);
  const [isPinging, setIsPinging] = useState(false);

  const navLinks = [
    { label: "Campaigns", path: "/campaigns" },
    { label: "Verify Tree", path: "/trees/TREE-KHI-2026-00125" },
    { label: "Our Impact", path: "/#impact" },
    { label: "How It Works", path: "/#how-it-works" },
  ];

  const roles: { role: UserRole; label: string; icon: React.ElementType }[] = [
    { role: "donor", label: "Donor (Muhammad Anas)", icon: User },
    { role: "admin", label: "Admin Console", icon: Shield },
    { role: "plantation_team", label: "Plantation Team", icon: Users },
    { role: "organization", label: "Govt / NGO Org", icon: Sprout },
  ];

  const handlePing = async () => {
    setIsPinging(true);
    await pingBackend();
    setTimeout(() => setIsPinging(false), 500);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Wordmark */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-left focus:outline-none"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-700 text-white shadow-sm transition-transform group-hover:scale-105">
              <Sprout className="h-5 w-5" />
            </span>
            <span className="text-xl font-bold tracking-tight text-slate-900 font-display">
              {siteConfig.name}
            </span>
          </button>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                if (link.path.startsWith("/#")) {
                  if (currentPath !== "/") {
                    navigate("/");
                    setTimeout(() => {
                      const el = document.getElementById(link.path.replace("/#", ""));
                      el?.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                  } else {
                    const el = document.getElementById(link.path.replace("/#", ""));
                    el?.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  navigate(link.path);
                }
              }}
              className={`transition-colors hover:text-emerald-800 ${
                currentPath === link.path ? "text-emerald-700 font-semibold" : ""
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Zone 3: Actions + API status + Role demo switcher */}
        <div className="flex items-center gap-2.5">
          {/* Backend API Status Pill */}
          <button
            onClick={() => setApiModalOpen(true)}
            className={`hidden lg:flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-mono transition-colors ${
              backendStatus === "connected"
                ? "border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                : "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
            }`}
            title="Backend REST API status - Click for details"
          >
            <span
              className={`h-2 w-2 rounded-full ${
                backendStatus === "connected" ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
              }`}
            />
            <span className="text-[11px] font-semibold">
              {backendStatus === "connected" ? "API: Live (5000)" : "API: Simulated"}
            </span>
          </button>

          {/* Perspective Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              title="Switch demo perspective (Donor, Admin, Field Team, NGO)"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping opacity-80" />
              <span className="hidden sm:inline capitalize font-semibold text-emerald-800">
                {currentUser.role.replace("_", " ")}
              </span>
              <span className="text-slate-400 text-[10px]">▼</span>
            </button>

            {roleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Switch Demo Role
                </div>
                {roles.map((r) => {
                  const Icon = r.icon;
                  const isActive = currentUser.role === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => {
                        switchRole(r.role);
                        setRoleDropdownOpen(false);
                        if (r.role === "admin") navigate("/admin");
                        else if (r.role === "plantation_team") navigate("/team");
                        else if (r.role === "organization") navigate("/organization");
                        else navigate("/dashboard");
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-800"
                          : "text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span className="truncate">{r.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Portal Navigation based on role */}
          {currentUser.role === "admin" ? (
            <button
              onClick={() => navigate("/admin")}
              className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-medium text-white hover:bg-slate-800 transition-colors"
            >
              Admin Panel
            </button>
          ) : currentUser.role === "plantation_team" ? (
            <button
              onClick={() => navigate("/team")}
              className="rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-medium text-white hover:bg-emerald-900 transition-colors"
            >
              Field Portal
            </button>
          ) : currentUser.role === "organization" ? (
            <button
              onClick={() => navigate("/organization")}
              className="rounded-lg bg-emerald-800 px-3.5 py-2 text-xs font-medium text-white hover:bg-emerald-900 transition-colors"
            >
              Org Portal
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Donor Dashboard
            </button>
          )}

          <button
            onClick={() => navigate("/campaigns")}
            className="flex items-center gap-1.5 rounded-lg bg-emerald-700 px-3.5 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-800 transition-colors"
          >
            <span>Sponsor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 md:hidden hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Backend API Info Modal */}
      {apiModalOpen && (
        <div className="fixed inset-0 p-50 h-screen z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5 text-emerald-700" />
                <h3 className="font-semibold text-slate-900">Backend API Integration</h3>
              </div>
              <button
                onClick={() => setApiModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3 border border-slate-200/80">
                <span className="text-slate-600 font-medium">Status</span>
                <span className="flex items-center gap-1.5 font-semibold text-xs">
                  {backendStatus === "connected" ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-emerald-700">Live Express API Connected</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-amber-600" />
                      <span className="text-amber-700">Offline Fallback / Demo Active</span>
                    </>
                  )}
                </span>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Endpoint:</span>
                  <span className="font-mono text-slate-700">{import.meta.env.VITE_API_URL}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-400">Engine / Driver:</span>
                  <span className="font-medium text-slate-700">
                    {backendInfo?.engine || "MySQL2 Pool & Simulation"}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Integrated Endpoints:</span>
                  <span className="font-semibold text-emerald-700">Auth, Sponsorship, Proofs, Certs</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100">
                💡 The frontend makes real HTTP calls to the Express REST API. If the backend process is running (`cd backend && npm run dev`), queries sync directly with the server. If offline, the client continues seamlessly via zero-crash local simulation.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                onClick={handlePing}
                disabled={isPinging}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`h-3.5 w-3.5 ${isPinging ? "animate-spin" : ""}`} />
                <span>{isPinging ? "Pinging..." : "Test Connection"}</span>
              </button>
              <button
                onClick={() => setApiModalOpen(false)}
                className="rounded-lg bg-emerald-700 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="flex flex-col space-y-3 text-sm">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (link.path.startsWith("/#")) {
                    navigate("/");
                  } else {
                    navigate(link.path);
                  }
                }}
                className="text-left font-medium text-slate-700 py-1"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setApiModalOpen(true);
                }}
                className="text-left text-xs font-medium text-emerald-700 py-1 flex items-center gap-1.5"
              >
                <Server className="h-3.5 w-3.5" />
                <span>API Status: {backendStatus}</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  navigate("/campaigns");
                }}
                className="rounded-lg bg-emerald-700 py-2.5 text-center text-xs font-semibold text-white"
              >
                Sponsor a Tree Now
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
