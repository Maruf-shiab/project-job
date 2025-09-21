// src/components/JobListing.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import JobCard from "./JobCard";
import { JobCategories, JobLocations } from "../assets/assets";

const PAGE_SIZE = 6;

/**
 * Props (from Home.jsx):
 *  - selectedCategories, setSelectedCategories
 *  - selectedLocations,  setSelectedLocations
 *  - showSideFilters (ignored here when filters live in the main sidebar)
 */
const JobListing = ({
  selectedCategories,
  setSelectedCategories,
  selectedLocations,
  setSelectedLocations,
  showSideFilters = false, // filters are in the main app sidebar now
}) => {
  const { searchFilter, setSearchFilter, jobs } = useContext(AppContext);

  // Fallback to internal state if props aren't provided (backwards-compat)
  const [catsInternal, setCatsInternal] = useState([]);
  const [locsInternal, setLocsInternal] = useState([]);
  const cats = selectedCategories ?? catsInternal;
  const setCats = setSelectedCategories ?? setCatsInternal;
  const locs = selectedLocations ?? locsInternal;
  const setLocs = setSelectedLocations ?? setLocsInternal;

  const [currentPage, setCurrentPage] = useState(1);

  // -------- Filtering (unchanged) --------
  const norm = (s) => (s ?? "").toString().trim().toLowerCase();

  const filteredJobs = useMemo(() => {
    const titleQuery = norm(searchFilter?.title);
    const locationQuery = norm(searchFilter?.location);

    const matchesCategory = (job) =>
      cats.length === 0 || cats.some((c) => norm(c) === norm(job.category));

    const matchesLocation = (job) =>
      locs.length === 0 || locs.some((l) => norm(l) === norm(job.location));

    const matchesTitle = (job) =>
      !titleQuery || norm(job.title).includes(titleQuery);

    const matchesSearchLocation = (job) =>
      !locationQuery || norm(job.location).includes(locationQuery);

    return (jobs || [])
      .slice()
      .reverse()
      .filter(
        (job) =>
          matchesCategory(job) &&
          matchesLocation(job) &&
          matchesTitle(job) &&
          matchesSearchLocation(job)
      );
  }, [jobs, cats, locs, searchFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredJobs.slice(start, start + PAGE_SIZE);
  }, [filteredJobs, currentPage]);

  useEffect(() => setCurrentPage(1), [cats, locs, searchFilter]);

  // -------- Current search pills --------
  const removeSearchPill = (key) => setSearchFilter({ ...searchFilter, [key]: "" });
  const toggleCat = (c) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  const toggleLoc = (l) =>
    setLocs((prev) => (prev.includes(l) ? prev.filter((x) => x !== l) : [...prev, l]));
  const clearAll = () => {
    setCats([]);
    setLocs([]);
    setSearchFilter({ title: "", location: "" });
  };

  const Pill = ({ children, onRemove }) => (
    <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-sm">
      {children}
      <button
        onClick={onRemove}
        className="rounded-full border border-gray-300 bg-gray-50 px-1.5 text-xs text-gray-600 hover:bg-gray-100"
        aria-label="Remove filter"
      >
        ✕
      </button>
    </span>
  );

  const hasAnyFilter =
    (searchFilter?.title || "").trim() !== "" ||
    (searchFilter?.location || "").trim() !== "" ||
    cats.length > 0 ||
    locs.length > 0;

  return (
    <div className="mx-auto w-full max-w-[95rem] px-6 2xl:px-10 py-8">
      {/* Sticky current search — aligned with the wider container */}
      <div className="sticky top-5 z-30 mb-6">
        <div className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur px-4 py-3 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-semibold text-gray-800">Current Search</div>

            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {(searchFilter?.title || "").trim() !== "" && (
                <Pill onRemove={() => removeSearchPill("title")}>{searchFilter.title}</Pill>
              )}
              {(searchFilter?.location || "").trim() !== "" && (
                <Pill onRemove={() => removeSearchPill("location")}>{searchFilter.location}</Pill>
              )}
              {cats.map((c) => (
                <Pill key={`c-${c}`} onRemove={() => toggleCat(c)}>
                  {c}
                </Pill>
              ))}
              {locs.map((l) => (
                <Pill key={`l-${l}`} onRemove={() => toggleLoc(l)}>
                  {l}
                </Pill>
              ))}
              {!hasAnyFilter && <span className="text-sm text-gray-500">No filters applied</span>}
            </div>

            {hasAnyFilter && (
              <button
                onClick={clearAll}
                className="w-max rounded-full border border-gray-300 bg-gray-50 px-3 py-1 text-sm text-gray-700 hover:bg-gray-100"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Header + results count */}
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Latest Jobs</h2>
        </div>
        <div className="text-sm text-gray-500">
          {filteredJobs.length} result{filteredJobs.length !== 1 && "s"}
        </div>
      </div>

      {/* Denser, wider grid — fully uses horizontal space on big screens */}
      {paginated.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-gray-500">
          No jobs match your filters. Try clearing filters or changing your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {paginated.map((job, idx) => (
            <JobCard key={`${job.id || job._id || job.title}-${idx}`} job={job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              onClick={() => setCurrentPage(n)}
              className={`rounded-lg px-3 py-2 text-sm ${
                n === currentPage
                  ? "bg-blue-600 text-white shadow-sm"
                  : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
              }`}
              aria-current={n === currentPage ? "page" : undefined}
            >
              {n}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-40"
            disabled={currentPage === totalPages}
            aria-label="Next page"
          >
            ›
          </button>
        </nav>
      )}
    </div>
  );
};

export default JobListing;
