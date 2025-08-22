import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter } = useContext(AppContext);

    // Simple X icon as SVG
    const CloseIcon = ({ onClick }) => (
        <span
            onClick={onClick}
            className="ml-2 cursor-pointer text-lg font-bold text-gray-500 hover:text-gray-700 transition"
            style={{ lineHeight: 1 }}
            aria-label="Clear"
        >
            ×
        </span>
    );

    return (
        <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
            <div className="w-full lg:w-1/4 bg-white px-4">
                {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                    <>
                        <h3 className="font-semibold text-xl mb-4">Current Search</h3>
                        <div className="mb-4 flex gap-3 flex-wrap">
                            {searchFilter.title && (
                                <span className="inline-flex items-center bg-blue-50 border border-blue-200 text-blue-800 px-4 py-1 rounded-full shadow-sm font-medium text-base">
                                    {searchFilter.title}
                                    <CloseIcon onClick={() => setSearchFilter(prev => ({ ...prev, title: "" }))} />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className="ml-2 inline-flex items-center bg-red-50 border border-red-200 text-red-800 px-4 py-1 rounded-full shadow-sm font-medium text-base">
                                    {searchFilter.location}
                                    <CloseIcon onClick={() => setSearchFilter(prev => ({ ...prev, location: "" }))} />
                                </span>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default JobListing;