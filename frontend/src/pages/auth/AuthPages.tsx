import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { siteConfig } from "../../config/site";
import { ASSETS, MOCK_USERS } from "../../mock/data";
import { Sprout, ShieldCheck, Mail, Lock, User, Phone, MapPin, ArrowRight, Check } from "lucide-react";
import { UserRole } from "../../types";

interface AuthProps {
  mode: "login" | "register" | "forgot-password";
}

export const AuthPage: React.FC<AuthProps> = ({ mode }) => {
  const { navigate, setCurrentUser, switchRole, showToast } = useApp();

  // Login form state
  const [email, setEmail] = useState("muhammadanaskhaann@gmail.com");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCity, setRegCity] = useState("Karachi");
  const [regPass, setRegPass] = useState("");
  const [regConfirmPass, setRegConfirmPass] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Forgot password state
  const [resetSent, setResetSent] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundUser = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (foundUser) {
      setCurrentUser(foundUser);
      showToast(`Welcome back, ${foundUser.name}!`);
      if (foundUser.role === "admin") navigate("/admin");
      else if (foundUser.role === "plantation_team") navigate("/team");
      else if (foundUser.role === "organization") navigate("/organization");
      else navigate("/dashboard");
    } else {
      // Default to Anas
      setCurrentUser(MOCK_USERS[0]);
      showToast("Signed in as Muhammad Anas (Donor)");
      navigate("/dashboard");
    }
  };

  const handleQuickDemoLogin = (role: UserRole) => {
    switchRole(role);
    if (role === "admin") navigate("/admin");
    else if (role === "plantation_team") navigate("/team");
    else if (role === "organization") navigate("/organization");
    else navigate("/dashboard");
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions to continue.");
      return;
    }
    showToast("Registration successful! Welcome to TreeMint.");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white">
      {/* Left Column: Side Branding & Visual */}
      <div className="md:w-1/2 relative bg-emerald-950 text-white p-8 md:p-14 flex flex-col justify-between overflow-hidden">
        {/* Background photo with deep eco gradient */}
        <img
          src={ASSETS.hero}
          alt="TreeMint Environmental Foundation"
          className="absolute inset-0 h-full w-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/80 to-transparent" />

        {/* Brand header */}
        <div className="relative z-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-md">
              <Sprout className="h-6 w-6" />
            </span>
            <span className="text-2xl font-bold tracking-tight font-display text-white">
              {siteConfig.name}
            </span>
          </button>
        </div>

        {/* Value Proposition */}
        <div className="relative z-10 space-y-4 my-12">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400">
            {siteConfig.tagline}
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display leading-tight">
            Transparent Digital Reforestation.
          </h2>
          <p className="text-sm text-emerald-200/90 max-w-md leading-relaxed">
            Every sponsored sapling is paired with field GPS coordinates, high-resolution growth audits, and verifiable digital certificates.
          </p>

          <div className="space-y-2 pt-4 text-xs text-emerald-100/80">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Real-time lifecycle tracking (Month 1, 3, 6, 12)</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Earn Green Points and achievement badges</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" />
              <span>Verified by forestry officers & conservation NGOs</span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 border-t border-emerald-900/80 pt-4 text-xs text-emerald-300/80">
          "The best time to plant a tree was 20 years ago. The second best time is now."
        </div>
      </div>

      {/* Right Column: Form Container */}
      <div className="md:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-[#F8FAFC]">
        <div className="w-full max-w-md space-y-6">
          {mode === "login" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  Welcome to TreeMint
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Sign in to monitor your sponsored trees, download certificates, and earn Green Points.
                </p>
              </div>

              {/* 1-Click FYP Evaluation Quick Switcher */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                  Quick Demo Login (Switch Roles Easily):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("donor")}
                    className="rounded-lg bg-white border border-emerald-200 px-2.5 py-1.5 text-left text-xs text-slate-800 font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    👤 Donor (Anas)
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("admin")}
                    className="rounded-lg bg-slate-900 px-2.5 py-1.5 text-left text-xs text-white font-semibold hover:bg-slate-800 transition-colors"
                  >
                    🛡️ Admin Console
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("plantation_team")}
                    className="rounded-lg bg-white border border-emerald-200 px-2.5 py-1.5 text-left text-xs text-slate-800 font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    🌱 Field Team
                  </button>
                  <button
                    type="button"
                    onClick={() => handleQuickDemoLogin("organization")}
                    className="rounded-lg bg-white border border-emerald-200 px-2.5 py-1.5 text-left text-xs text-slate-800 font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    🏛️ Forest Org
                  </button>
                </div>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => navigate("/forgot-password")}
                      className="text-xs text-emerald-700 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Remember this session</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors"
                >
                  Sign In to Dashboard
                </button>
              </form>

              <div className="text-center text-xs text-slate-500 pt-2">
                Don't have a donor account yet?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Register here
                </button>
              </div>
            </>
          )}

          {mode === "register" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  Create Donor Account
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Start sponsoring native trees and receiving verifiable GPS growth reports.
                </p>
              </div>

              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Muhammad Anas"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="anas@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                    City
                  </label>
                  <select
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Peshawar">Peshawar</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regPass}
                      onChange={(e) => setRegPass(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={regConfirmPass}
                      onChange={(e) => setRegConfirmPass(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <label className="flex items-start gap-2 text-xs text-slate-600 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-emerald-600"
                  />
                  <span>
                    I agree to the TreeMint Conservation Guidelines, Transparency Charter & Privacy Terms.
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors mt-2"
                >
                  Create Account & Claim 100 Welcome Points
                </button>
              </form>

              <div className="text-center text-xs text-slate-500">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="font-semibold text-emerald-700 hover:underline"
                >
                  Sign In
                </button>
              </div>
            </>
          )}

          {mode === "forgot-password" && (
            <>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 font-display">
                  Reset Password
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your verified donor email address and we'll send a password recovery token.
                </p>
              </div>

              {resetSent ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center space-y-3">
                  <Check className="mx-auto h-8 w-8 text-emerald-700" />
                  <p className="text-xs font-semibold text-emerald-900">
                    Recovery link dispatched to {email}!
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Please check your inbox and spam folder. Click below to return to login.
                  </p>
                  <button
                    onClick={() => navigate("/login")}
                    className="rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white"
                  >
                    Back to Login
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setResetSent(true);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-emerald-700 py-3 text-xs font-bold text-white shadow-sm hover:bg-emerald-800"
                  >
                    Send Recovery Email
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="text-xs text-slate-500 hover:text-slate-800"
                    >
                      Cancel and return to login
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
