import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import {
  Bell,
  CheckCircle2,
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FolderKanban,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const DonorNotificationsPage: React.FC = () => {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead, navigate } = useApp();
  const [filter, setFilter] = useState("all");

  const filtered = notifications.filter(
    (n) => filter === "all" || n.category === filter
  );

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="Notifications"
      title="Activity & Verification Alerts"
      subtitle="Lifecycle status changes, verification approvals, and monthly tree growth notifications."
      actions={
        <button
          onClick={markAllNotificationsAsRead}
          className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
        >
          Mark All as Read
        </button>
      }
    >
      <div className="space-y-4 max-w-4xl">
        <div className="flex gap-2 text-xs">
          {["all", "plantation", "verification", "growth", "system"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-lg px-3 py-1.5 font-semibold capitalize transition-colors ${
                filter === cat
                  ? "bg-emerald-800 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white divide-y divide-slate-100 overflow-hidden shadow-xs">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markNotificationAsRead(notif.id);
                if (notif.actionUrl) navigate(notif.actionUrl);
              }}
              className={`p-4 flex items-start justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors ${
                !notif.read ? "bg-emerald-50/40" : ""
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{notif.title}</span>
                  {!notif.read && (
                    <span className="h-2 w-2 rounded-full bg-emerald-600" />
                  )}
                </div>
                <p className="text-xs text-slate-600">{notif.message}</p>
                <span className="text-[10px] text-slate-400">{notif.timestamp}</span>
              </div>
              {notif.actionUrl && (
                <button className="text-xs font-semibold text-emerald-700 hover:underline shrink-0">
                  Inspect →
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export const DonorProfilePage: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [phone, setPhone] = useState(currentUser.phone || "+92 300 9876543");
  const [city, setCity] = useState(currentUser.city || "Karachi");
  const [defaultDedication, setDefaultDedication] = useState(
    "In commitment to a greener Pakistan"
  );

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Profile settings updated successfully!");
  };

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="Profile"
      title="Donor Profile & Preferences"
      subtitle="Manage your personal identity, contact details, and automatic plaque dedication preferences."
    >
      <div className="max-w-2xl space-y-6">
        <form onSubmit={handleSave} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-5">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="h-16 w-16 rounded-full border-2 border-emerald-500 bg-slate-100 object-cover"
            />
            <div>
              <h3 className="text-base font-bold text-slate-900">{currentUser.name}</h3>
              <p className="text-xs text-slate-500">{currentUser.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                {currentUser.role.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold uppercase text-slate-700 mb-1">
                Full Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-700 mb-1">
                Contact Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-700 mb-1">
                Primary City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold uppercase text-slate-700 mb-1">
                Default Plaque Dedication Inscription
              </label>
              <input
                type="text"
                value={defaultDedication}
                onChange={(e) => setDefaultDedication(e.target.value)}
                className="w-full rounded-lg border border-slate-200 p-2.5 text-xs text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="rounded-lg bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export const DonorCampaignsHistoryPage: React.FC = () => {
  const { campaigns, trees, currentUser, navigate } = useApp();

  const myTrees = trees.filter((t) => t.donorId === currentUser.id);
  const myCampaignIds = Array.from(new Set(myTrees.map((t) => t.campaignId)));
  const participatedCampaigns = campaigns.filter((c) => myCampaignIds.includes(c.id));

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="Campaigns"
      title="Participating Campaigns"
      subtitle="Forestry and urban afforestation programs in which you have active tree sponsorships."
      actions={
        <button
          onClick={() => navigate("/campaigns")}
          className="rounded-lg bg-emerald-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors"
        >
          Explore All Campaigns
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {participatedCampaigns.map((camp) => {
          const sponsoredByMe = myTrees.filter((t) => t.campaignId === camp.id).length;
          return (
            <div
              key={camp.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                  <span>{camp.city}</span>
                  <span className="font-semibold text-emerald-800">{camp.organizationType}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {camp.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{camp.description}</p>

                <div className="mt-4 rounded-xl bg-emerald-50/70 p-3 flex justify-between items-center text-xs">
                  <span className="text-slate-600">Your Sponsorship:</span>
                  <span className="font-bold text-emerald-900">
                    {sponsoredByMe} {sponsoredByMe === 1 ? "Tree" : "Trees"}
                  </span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => navigate(`/campaigns/${camp.id}`)}
                  className="flex-1 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-center"
                >
                  Campaign Page
                </button>
                <button
                  onClick={() => navigate("/campaigns")}
                  className="flex-1 rounded-lg bg-emerald-700 py-2 text-xs font-semibold text-white hover:bg-emerald-800 text-center"
                >
                  Sponsor More
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
};
