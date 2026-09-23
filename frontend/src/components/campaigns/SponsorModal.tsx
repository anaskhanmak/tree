import React, { useState } from "react";
import { Campaign } from "../../types";
import { useApp } from "../../context/AppContext";
import { X, Sprout, Check, ShieldCheck, ArrowRight, Heart } from "lucide-react";
import confetti from "canvas-confetti";

interface SponsorModalProps {
  campaign: Campaign;
  onClose: () => void;
}

export const SponsorModal: React.FC<SponsorModalProps> = ({ campaign, onClose }) => {
  const { sponsorTree, navigate, currentUser } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedSpecies, setSelectedSpecies] = useState<string>(
    campaign.treeSpecies[0] || "Azadirachta indica (Neem)"
  );
  const [dedication, setDedication] = useState<string>("");
  const [sponsorName, setSponsorName] = useState<string>(currentUser.name);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [completedTreeIds, setCompletedTreeIds] = useState<string[] | null>(null);

  const totalCost = quantity * campaign.pricePerTree;
  const pointsEarned = quantity * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sponsorTree(campaign.id, quantity, selectedSpecies, dedication);
      setIsSubmitting(false);
      setCompletedTreeIds(result.treeIds);

      // Trigger celebratory eco-confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#15803D", "#84CC16", "#DCFCE7", "#166534"],
        });
      } catch {
        // Confetti fallback
      }
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-emerald-50/50">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-700 text-white">
              <Sprout className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Sponsor a Tree
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xs">{campaign.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {completedTreeIds ? (
          /* Confirmation State */
          <div className="p-6 text-center space-y-4">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Sponsorship Confirmed!
              </h4>
              <p className="text-xs text-slate-600 mt-1 max-w-sm mx-auto">
                Thank you, {sponsorName}! Your unique Tree ID has been issued. Our field team will plant your tree and upload verified GPS photos.
              </p>
            </div>

            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-left space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Issued Tree ID:</span>
                <span className="font-mono font-bold text-emerald-800 text-sm">
                  {completedTreeIds[0]}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Species:</span>
                <span className="font-medium text-slate-800">{selectedSpecies}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500">Location:</span>
                <span className="font-medium text-slate-800">
                  {campaign.area}, {campaign.city}
                </span>
              </div>
              <div className="flex justify-between items-center text-xs border-t border-emerald-200/60 pt-2">
                <span className="text-slate-500">Green Points Earned:</span>
                <span className="font-bold text-emerald-700">+{pointsEarned} Points</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  navigate(`/trees/${completedTreeIds[0]}`);
                }}
                className="flex-1 rounded-lg bg-emerald-700 py-2.5 text-xs font-semibold text-white hover:bg-emerald-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Track Tree Lifecycle</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => {
                  onClose();
                  navigate("/dashboard/trees");
                }}
                className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                View in Donor Dashboard
              </button>
            </div>
          </div>
        ) : (
          /* Form State */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Quantity Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Number of Trees
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 3, 5, 10].map((qty) => (
                  <button
                    type="button"
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`rounded-lg border py-2 text-xs font-bold transition-all ${
                      quantity === qty
                        ? "border-emerald-700 bg-emerald-50 text-emerald-800 shadow-sm"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {qty} {qty === 1 ? "Tree" : "Trees"}
                  </button>
                ))}
              </div>
            </div>

            {/* Species Selector */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Select Native Species
              </label>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-emerald-600 focus:outline-none"
              >
                {campaign.treeSpecies.map((sp) => (
                  <option key={sp} value={sp}>
                    {sp} (Indigenous)
                  </option>
                ))}
              </select>
            </div>

            {/* Dedication Message */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-2">
                Dedication Plaque (Optional)
              </label>
              <input
                type="text"
                value={dedication}
                onChange={(e) => setDedication(e.target.value)}
                placeholder="e.g. In honor of our family / For a cleaner Karachi"
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-800 focus:border-emerald-600 focus:outline-none placeholder:text-slate-400"
              />
            </div>

            {/* Cost & Verification Breakdown */}
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Cost per tree sapling + 2yr care:</span>
                <span className="font-medium text-slate-800">PKR {campaign.pricePerTree.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Total Contribution:</span>
                <span className="font-bold text-slate-900 text-sm">PKR {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-emerald-700 font-medium pt-1 border-t border-slate-200/60">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Verified Survival Guarantee</span>
                </span>
                <span>+{pointsEarned} Green Points</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-emerald-700 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Generating Tree ID..." : `Confirm Sponsorship (PKR ${totalCost.toLocaleString()})`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
