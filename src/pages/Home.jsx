// src/pages/Home.jsx
import React, { useMemo, useContext, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AppDownload from "../components/AppDownload";
import { AppContext } from "../context/AppContext";
import { JobCategories, JobLocations } from "../assets/assets";
import Jobs from "./Jobs";

/* ---------------- Polished Sidebar ---------------- */
const Sidebar = ({
  open,
  collapsed,
  onToggle,
  onClose,
  onSelect,
  active,
  cats,
  setCats,
  locs,
  setLocs,
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const items = [
    { key: "welcome", label: "Home", icon: "🏠" },
    { key: "jobs", label: "Jobs", icon: "💼" },
  ];

  const toggleCat = (c) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleLoc = (l) =>
    setLocs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));

  const Section = ({ title, children }) => (
    <div className=" mt-4 rounded-xl border border-gray-100 bg-gray-50/50 p-4 shadow-sm">
      {!collapsed && <div className="mb-3 text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</div>}
      {children}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/50 transition-opacity lg:hidden z-40 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      />

      <aside
        className={`fixed z-50 top-21 left-0 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-lg transition-all duration-300 overflow-y-auto
        ${open ? "translate-x-0" : "-translate-x-full"} 
        ${collapsed ? "w-20" : "w-80"} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className={`text-sm font-semibold text-gray-700 ${collapsed ? 'hidden' : 'block'}`}>
              Navigation
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onToggle}
                className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                {collapsed ? "→" : "←"}
              </button>
              <button
                onClick={onClose}
                className="lg:hidden flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
                aria-label="Close sidebar"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        {/* Nav items */}
        <nav className="p-4 space-y-2">
          {items.map((item) => {
            const isActive = active === item.key;
            return (
              <button
                key={item.key}
                onClick={() => {
                  onSelect(item.key);
                  onClose();
                }}
                className={`group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                    ? "bg-blue-600 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  }`}
              >
                <span className="text-lg">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span>{item.label}</span>
                    {isActive && (
                      <div className="absolute right-3 w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </>
                )}
                {collapsed && (
                  <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all ${isActive ? "bg-white" : "bg-transparent"
                    }`}></div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Filters toggle + panel (only on Jobs tab) */}
        {active === "jobs" && (
          <div className="px-4 pb-6">
            <button
              onClick={() => setShowFilters((v) => !v)}
              className={`w-full rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${showFilters
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                }`}
            >
              <div className="flex items-center justify-center gap-2">
                <span>🔍</span>
                {!collapsed && <span>{showFilters ? "Hide Filters" : "Show Filters"}</span>}
              </div>
            </button>

            {showFilters && !collapsed && (
              <div className="mt-4 space-y-4">
                <Section title="Job Categories">
                  <div className="space-y-2 max-h-60 overflow-auto">
                    {JobCategories.map((c) => {
                      const checked = cats.includes(c);
                      return (
                        <label
                          key={c}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleCat(c)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm transition-colors ${checked
                                ? "font-semibold text-blue-700"
                                : "text-gray-700 group-hover:text-gray-900"
                              }`}
                          >
                            {c}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Section>

                <Section title="Locations">
                  <div className="space-y-2 max-h-60 overflow-auto">
                    {JobLocations.map((l) => {
                      const checked = locs.includes(l);
                      return (
                        <label
                          key={l}
                          className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors group"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => toggleLoc(l)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span
                            className={`text-sm transition-colors ${checked
                                ? "font-semibold text-blue-700"
                                : "text-gray-700 group-hover:text-gray-900"
                              }`}
                          >
                            📍 {l}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </Section>

                {(cats.length > 0 || locs.length > 0) && (
                  <button
                    onClick={() => {
                      setCats([]);
                      setLocs([]);
                    }}
                    className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
                  >
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

/* --------------------- PRO Welcome --------------------- */
const Welcome = ({ goToJobs }) => {
  const { jobs, setSearchFilter, setIsSearched } = useContext(AppContext);

  const stats = useMemo(() => {
    const total = jobs?.length || 0;
    const locations = new Set((jobs || []).map((j) => j.location)).size;
    const categories = new Set((jobs || []).map((j) => j.category)).size;
    return { total, locations, categories };
  }, [jobs]);

  return (
    <div className="relative">
      {/* All your homepage content */}
      <div className="mx-auto max-w-7xl px-4 2xl:px-20 py-10 ">
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-50 via-pink-200 to-purple-300 border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: copy */}
            <div className="relative p-8 md:p-12 lg:p-16">
              <p className="text-xs md:text-sm tracking-widest uppercase text-indigo-700/90">
                Opportunities, curated
              </p>
              <h1 className="mt-2 text-3xl md:text-5xl font-black leading-[1.1] text-gray-900">
                <span>Find your next role with </span>
                <span className="bg-gradient-to-br from-blue-900 to-orange-400 bg-clip-text text-transparent">Job</span>
                <span className="bg-gradient-to-br from-purple-900 to-blue-400 bg-clip-text text-transparent">হাট</span>
              </h1>
              <p className="mt-4 max-w-xl text-gray-700 md:text-lg">
                Explore verified openings across roles, locations and categories. Zero fluff — just quality jobs.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  onClick={goToJobs}
                  className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-md ring-1 ring-indigo-500/50 transition hover:bg-indigo-700"
                >
                  Explore Jobs
                </button>
              </div>

              <div className="mt-6 text-sm text-gray-500">
                Hand-picked roles • Fast apply • Smart filters
              </div>
            </div>

            {/* Right: stats */}
            <div className="flex flex-col gap-4 p-6 md:p-12 lg:p-16 bg-gradient-to-br from-pink-50 via-pink-200 to-purple-300">
              {[
                { label: "Total Jobs", value: stats.total, sub: "active listings", icon: "🗂️" },
                { label: "Locations", value: stats.locations, sub: "cities worldwide", icon: "📍" },
                { label: "Categories", value: stats.categories, sub: "specializations", icon: "🏷️" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-pink-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{s.icon}</span>
                    <div className="text-sm text-gray-500">{s.label}</div>
                  </div>
                  <div className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900">
                    {s.value}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hot locations */}
        <section id="featured" className="mt-10">
          <h3 className="mt-8 text-xl font-bold text-gray-900">Hot locations</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {["Dhaka", "Washington", "Hyderabad", "New York", "California"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  setSearchFilter({ title: "", location: l });
                  setIsSearched(true);
                  goToJobs();
                }}
                className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
              >
                📍 {l}
              </button>
            ))}
          </div>
        </section>

        {/* App download */}
        <section className="mt-10">
          <AppDownload />
        </section>

        {/* Final CTA */}
        <section className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-fuchsia-600 text-white shadow-lg">
          <div className="px-6 py-8 md:px-12 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Ready to make your next move?</h3>
              <p className="text-white/90 mt-1">Discover roles that fit your skills and goals today.</p>
            </div>
            <button
              onClick={goToJobs}
              className="rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 shadow-md ring-1 ring-white/40 transition hover:shadow-lg"
            >
              Explore Jobs
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

/* -------------------------------- Page -------------------------------- */
const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState("welcome");

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  const goToJobs = () => setActive("jobs");

  const content = useMemo(() => {
    switch (active) {
      case "jobs":
        return (
          <Jobs
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedLocations={selectedLocations}
            setSelectedLocations={setSelectedLocations}
          />
        );
      case "welcome":
      default:
        return <Welcome goToJobs={goToJobs} />;
    }
  }, [active, selectedCategories, selectedLocations]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-16 z-40 bg-white/95 backdrop-blur border-b border-gray-200 overflow-x-hidden">
        <div className="mx-auto flex h-12 max-w-7xl items-center justify-between px-4 2xl:px-20">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            aria-label="Open menu"
          >
            <span className="text-lg">☰</span>
            Menu
          </button>
          <div className="text-sm font-medium text-gray-600">
            {active === "welcome" ? "🏠 Welcome" : "💼 Jobs"}
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="lg:flex">
        <Sidebar
          open={sidebarOpen}
          collapsed={collapsed}
          onToggle={() => setCollapsed((v) => !v)}
          onClose={() => setSidebarOpen(false)}
          onSelect={setActive}
          active={active}
          cats={selectedCategories}
          setCats={setSelectedCategories}
          locs={selectedLocations}
          setLocs={setSelectedLocations}
        />

        <main
          className={`flex-1 bg-gradient-to-br from-blue-300 via-purple-300 to-pink-50 transition-[margin] duration-300 pt-0 overflow-x-hidden ${collapsed ? "lg:ml-20" : "lg:ml-80"
            }`}
        >
          <div className="min-h-[calc(100vh-4rem)]">
            {content}
          </div>
          <section className="bg-gradient-to-tr from-white via-pink-100 to-purple-500 shadow">
            <Footer />
          </section>
          
        </main>
      </div>
    </div>
  );
};

export default Home;