import React, { useState, useMemo } from "react";
import { useApp } from "../../context/AppContext";
import { Navbar } from "../../components/layout/Navbar";
import { Footer } from "../../components/layout/Footer";
import { SponsorModal } from "../../components/campaigns/SponsorModal";
import { Campaign, OrgType, CampaignStatus } from "../../types";
import { Search, MapPin, Filter, SlidersHorizontal, ArrowRight, Building2, Calendar, Sprout } from "lucide-react";

export const CampaignsPage: React.FC = () => {
  const { campaigns, navigate } = useApp();
  const [selectedCampaignForSponsor, setSelectedCampaignForSponsor] = useState<Campaign | null>(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedOrgType, setSelectedOrgType] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedSpecies, setSelectedSpecies] = useState("All");
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "progress" | "price">("popular");

  const cities = ["All", "Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan", "Hyderabad", "Peshawar"];
  const orgTypes = ["All", "Government", "NGO", "Corporate", "Educational", "Community"];
  const speciesList = ["All", "Neem", "Peepal", "Mangrove", "Sheesham", "Pine", "Amaltas", "Moringa"];

  const filteredCampaigns = useMemo(() => {
    return campaigns
      .filter((camp) => {
        const matchesSearch =
          camp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          camp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          camp.organizationName.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCity = selectedCity === "All" || camp.city === selectedCity;
        const matchesOrgType = selectedOrgType === "All" || camp.organizationType === selectedOrgType;
        const matchesStatus = selectedStatus === "All" || camp.status === selectedStatus;
        const matchesSpecies =
          selectedSpecies === "All" ||
          camp.treeSpecies.some((s) => s.toLowerCase().includes(selectedSpecies.toLowerCase()));

        return matchesSearch && matchesCity && matchesOrgType && matchesStatus && matchesSpecies;
      })
      .sort((a, b) => {
        if (sortBy === "popular") return b.sponsoredTrees - a.sponsoredTrees;
        if (sortBy === "newest") return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
        if (sortBy === "progress")
          return b.sponsoredTrees / b.targetTrees - a.sponsoredTrees / a.targetTrees;
        if (sortBy === "price") return a.pricePerTree - b.pricePerTree;
        return 0;
      });
  }, [campaigns, searchTerm, selectedCity, selectedOrgType, selectedStatus, selectedSpecies, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      {/* Page Header */}
      <div className="border-b border-slate-200 bg-white py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Directory of Verified Initiatives
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mt-1">
              Afforestation Campaigns
            </h1>
            <p className="text-sm text-slate-600 mt-2">
              Browse transparent afforestation programs led by government departments, non-profits, and educational institutions across Pakistan.
            </p>
          </div>
        </div>
      </div>

      {/* Controls & Filter Bar */}
      <div className="border-b border-slate-200 bg-white/70 sticky top-16 z-20 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Live Search Bar */}
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search campaigns, organizations, species..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 focus:border-emerald-600 focus:outline-none"
              >
                <option value="popular">Most Sponsored</option>
                <option value="progress">Highest Progress %</option>
                <option value="newest">Recently Launched</option>
                <option value="price">Lowest Price / Tree</option>
              </select>
            </div>
          </div>

          {/* Interactive Filter Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* City Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1">
                City:
              </span>
              <div className="flex flex-wrap gap-1">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      selectedCity === city
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Org Type Filter */}
            <div className="flex items-center gap-1 ml-auto">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mr-1">
                Sector:
              </span>
              <select
                value={selectedOrgType}
                onChange={(e) => setSelectedOrgType(e.target.value)}
                className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700"
              >
                {orgTypes.map((ot) => (
                  <option key={ot} value={ot}>
                    {ot}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Campaign Directory */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex-1">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Showing <strong className="text-slate-900">{filteredCampaigns.length}</strong> active campaigns
          </span>
          {(searchTerm || selectedCity !== "All" || selectedOrgType !== "All") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("All");
                setSelectedOrgType("All");
                setSelectedStatus("All");
              }}
              className="text-emerald-700 hover:underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Campaign Cards Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCampaigns.map((camp) => {
              const progressPct = Math.round((camp.sponsoredTrees / camp.targetTrees) * 100);
              const remaining = Math.max(camp.targetTrees - camp.sponsoredTrees, 0);

              return (
                <div
                  key={camp.id}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
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
                    <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] uppercase font-semibold">
                      {camp.status}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex items-center gap-1 text-[11px] text-slate-500 mb-1 truncate">
                        <span className="font-semibold text-slate-700 truncate">{camp.organizationName}</span>
                        <span>·</span>
                        <span className="shrink-0">{camp.organizationType}</span>
                      </div>

                      <h3 className="text-base font-bold text-slate-900 font-display line-clamp-1">
                        {camp.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
                        {camp.description}
                      </p>
                    </div>

                    {/* Progress Bar & Details */}
                    <div className="space-y-2 border-t border-slate-100 pt-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-600 font-medium">
                          {camp.sponsoredTrees.toLocaleString()} / {camp.targetTrees.toLocaleString()} trees
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
                        <span>{remaining.toLocaleString()} remaining</span>
                        <span className="font-bold text-slate-800">PKR {camp.pricePerTree} / tree</span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => navigate(`/campaigns/${camp.id}`)}
                        className="flex-1 rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 text-center transition-colors"
                      >
                        View Campaign
                      </button>
                      <button
                        onClick={() => setSelectedCampaignForSponsor(camp)}
                        className="flex-1 rounded-lg bg-emerald-700 py-2 text-xs font-semibold text-white shadow-xs hover:bg-emerald-800 text-center transition-colors"
                      >
                        Sponsor Tree
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-white space-y-3">
            <Sprout className="mx-auto h-10 w-10 text-slate-400" />
            <h3 className="text-base font-bold text-slate-800">No campaigns found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              We couldn't find any afforestation campaigns matching your active filter criteria. Try adjusting your search or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCity("All");
                setSelectedOrgType("All");
              }}
              className="rounded-lg bg-emerald-700 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-800"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </main>

      <Footer />

      {selectedCampaignForSponsor && (
        <SponsorModal
          campaign={selectedCampaignForSponsor}
          onClose={() => setSelectedCampaignForSponsor(null)}
        />
      )}
    </div>
  );
};
