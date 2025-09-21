// src/pages/Jobs.jsx
import React from "react";
import JobListing from "../components/JobListing";

const Jobs = ({ selectedCategories, setSelectedCategories, selectedLocations, setSelectedLocations }) => {
  return (
    <JobListing
      selectedCategories={selectedCategories}
      setSelectedCategories={setSelectedCategories}
      selectedLocations={selectedLocations}
      setSelectedLocations={setSelectedLocations}
      showSideFilters={false} // filters live in main sidebar
    />
  );
};

export default Jobs;
