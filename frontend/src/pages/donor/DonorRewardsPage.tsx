import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { DashboardLayout } from "../../components/layout/DashboardLayout";
import { Flame, Sparkles, Award, Sprout, Check, Gift, ArrowRight } from "lucide-react";

export const DonorRewardsPage: React.FC = () => {
  const { currentUser, badges, showToast } = useApp();

  const [redeemedRewards, setRedeemedRewards] = useState<string[]>([]);

  const perks = [
    {
      id: "perk-1",
      title: "Custom Wooden Dedication Stake",
      points: 800,
      desc: "Handcrafted reclaimed wood marker with your custom inscription installed at the tree.",
      icon: "🪵",
    },
    {
      id: "perk-2",
      title: "1 Free Native Neem Sapling",
      points: 1200,
      desc: "Automatically sponsors 1 indigenous sapling added to your donor passport.",
      icon: "🌱",
    },
    {
      id: "perk-3",
      title: "TreeMint Organic Cotton T-Shirt",
      points: 2000,
      desc: "Eco-dyed certified organic tee featuring the TreeMint canopy coordinates.",
      icon: "👕",
    },
    {
      id: "perk-4",
      title: "Forestry Nursery VIP Field Tour",
      points: 3500,
      desc: "Guided Saturday tour of the native propagation center in Malir / Margalla.",
      icon: "🎟️",
    },
  ];

  const handleRedeem = (perk: (typeof perks)[0]) => {
    if (currentUser.points < perk.points) {
      alert("You need more Green Points to redeem this item!");
      return;
    }
    setRedeemedRewards((prev) => [...prev, perk.id]);
    showToast(`Redeemed "${perk.title}"! Voucher code sent to your email.`);
  };

  return (
    <DashboardLayout
      roleScope="donor"
      activeSection="Rewards & Badges"
      title="Green Points & Achievements"
      subtitle="Earn rewards for active environmental stewardship and tree survival milestones."
    >
      <div className="space-y-8">
        {/* Points Banner */}
        <div className="rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-900 to-emerald-800 p-8 text-white shadow-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Available Green Points
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-extrabold font-mono tabular-nums">
                  {currentUser.points.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-emerald-200">Points</span>
              </div>
              <p className="text-xs text-emerald-100 max-w-md">
                Tier: <strong>Level 3 - Canopy Custodian</strong>. 600 points until Tier 4 Reforestation Champion.
              </p>
            </div>

            {/* Quick breakdown */}
            <div className="rounded-xl bg-emerald-950/40 p-4 text-xs space-y-2 border border-emerald-700/50">
              <div className="flex justify-between gap-6">
                <span className="text-emerald-300">Trees Sponsored:</span>
                <span className="font-mono font-bold">{currentUser.treesSponsoredCount * 100} pts</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-emerald-300">Survival Audits:</span>
                <span className="font-mono font-bold">+250 pts</span>
              </div>
              <div className="flex justify-between gap-6">
                <span className="text-emerald-300">Community Bonus:</span>
                <span className="font-mono font-bold">+100 pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Badges Section */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Achievement Badges
            </h3>
            <p className="text-xs text-slate-500">
              Milestone achievements unlocked as your sponsored trees take root and survive.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`rounded-xl border p-5 text-center space-y-3 transition-all ${
                  badge.unlocked
                    ? "border-emerald-200 bg-emerald-50/40 shadow-xs"
                    : "border-slate-200 bg-slate-50/60 opacity-60"
                }`}
              >
                <div className="text-4xl mx-auto">{badge.icon || badge.iconName || "🌱"}</div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{badge.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    {badge.description}
                  </p>
                </div>

                <div>
                  {badge.unlocked ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                      <Check className="h-3 w-3" /> Unlocked
                    </span>
                  ) : (
                    <div className="space-y-1">
                      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-400 rounded-full"
                          style={{ width: `${badge.progress || 20}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium block">
                        {badge.progress || 20}% completed
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Redeem Green Points */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Redeemable Eco Rewards
            </h3>
            <p className="text-xs text-slate-500">
              Exchange your points for on-the-ground perks and free forestry contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {perks.map((perk) => {
              const isClaimed = redeemedRewards.includes(perk.id);
              const canAfford = currentUser.points >= perk.points;

              return (
                <div
                  key={perk.id}
                  className="rounded-xl border border-slate-200 p-4 flex items-center justify-between gap-4 hover:border-emerald-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{perk.icon}</span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-slate-900">{perk.title}</h4>
                      <p className="text-[11px] text-slate-500 max-w-xs">{perk.desc}</p>
                      <span className="text-xs font-mono font-bold text-emerald-800 block pt-1">
                        {perk.points.toLocaleString()} Points
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRedeem(perk)}
                    disabled={isClaimed || !canAfford}
                    className={`shrink-0 rounded-lg px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      isClaimed
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : canAfford
                        ? "bg-emerald-700 text-white hover:bg-emerald-800"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    {isClaimed ? "Claimed" : canAfford ? "Redeem" : "Locked"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
