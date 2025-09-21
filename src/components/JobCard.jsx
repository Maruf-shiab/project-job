// src/components/JobCard.jsx
import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

/**
 * Ultra-polished, modern JobCard
 * - Premium glass morphism design with subtle gradients
 * - Enhanced micro-interactions and animations
 * - Professional typography with better hierarchy
 * - Improved badge system with icons and colors
 */
const JobCard = ({ job }) => {
  const navigate = useNavigate();

  const logo =
    job?.companyId?.image ||
    assets?.logo2 ||
    assets?.logo ||
    "https://via.placeholder.com/64x64.png?text=Logo";

  const companyName = job?.companyId?.name || "Company";
  const title = job?.title || "Job title";
  const location = job?.location || "";
  const level = job?.level || "";
  const category = job?.category || "";

  const stripHtml = (html = "") =>
    typeof html === "string" ? html.replace(/<[^>]+>/g, "") : "";

  const summary = (() => {
    const txt = stripHtml(job?.description || "");
    return txt.length > 160 ? txt.slice(0, 160).trim() + "…" : txt;
  })();

  const goApply = (e) => {
    e?.stopPropagation?.();
    navigate(`/apply-job/${job?._id}`);
  };

  // Enhanced badge styling with better colors and icons
  const getBadgeStyle = (type) => {
    const styles = {
      category: "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200 text-violet-700",
      location: "bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 text-emerald-700",
      level: "bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-700"
    };
    return styles[type] || "bg-gray-50 border-gray-200 text-gray-700";
  };

  return (
    <article
      onClick={goApply}
      className="group relative w-full cursor-pointer overflow-hidden rounded-3xl border border-gray-200/60 bg-white/90 backdrop-blur-sm p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-1 hover:border-gray-300/80 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.15)] hover:bg-white"
      aria-label={`${title} at ${companyName}`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && goApply(e)}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header: logo + title + company */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative">
            <img
              src={logo}
              alt={`${companyName} logo`}
              className="h-14 w-14 rounded-2xl object-contain ring-2 ring-gray-100 bg-white shadow-sm transition-all duration-300 group-hover:ring-gray-200 group-hover:shadow-md"
              loading="lazy"
            />
            {/* Subtle glow effect on hover */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
          
          <div className="min-w-0 flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-1 leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-gray-800">
              {title}
            </h3>
            <p className="text-sm font-medium text-gray-500 mb-3 transition-colors duration-200 group-hover:text-gray-600">
              {companyName}
            </p>

            {/* Enhanced badges with better spacing and design */}
            <div className="flex flex-wrap items-center gap-2">
              {category && (
                <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${getBadgeStyle('category')}`}>
                  <span className="w-2 h-2 rounded-full bg-violet-400"></span>
                  {category}
                </span>
              )}
              {location && (
                <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${getBadgeStyle('location')}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {location}
                </span>
              )}
              {level && (
                <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-200 ${getBadgeStyle('level')}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                  {level}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Summary with better typography */}
        {summary && (
          <div className="mb-6">
            <p className="text-sm leading-relaxed text-gray-600 line-clamp-3 transition-colors duration-200 group-hover:text-gray-700">
              {summary}
            </p>
          </div>
        )}

        {/* Enhanced footer with gradient buttons */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-gray-100/80">
          <div className="flex items-center gap-2">
            <button
              onClick={goApply}
              className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
              aria-label="Apply now"
            >
              <span className="relative z-10">Apply Now</span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/apply-job/${job?._id}`);
              }}
              className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300/40"
              aria-label="Learn more"
            >
              Details
            </button>
          </div>

          {/* Animated arrow indicator */}
          <div className="flex items-center gap-2 text-gray-400 transition-all duration-300 group-hover:text-gray-600">
            <span className="text-xs font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              View
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100/80 transition-all duration-300 group-hover:bg-blue-100 group-hover:text-blue-600">
              <svg 
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Premium corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400/10 via-purple-400/10 to-transparent rounded-bl-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </article>
  );
};

export default JobCard;