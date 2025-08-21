import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="container 2xl:px-20 mx-auto my-10">
      <div className="bg-gradient-to-r from-purple-600 via-blue-500 to-blue-400 text-white p-10 rounded-2xl shadow-2xl py-16 text-center mx-2 lg:mx-0">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Over <span className="text-yellow-300">1000+</span> jobs available
        </h2>
        <p className="mb-10 max-w-xl mx-auto text-lg font-light px-5 lg:px-0 italic">
          "Your dream job isn't out there—it's waiting to be created by you. Start here."
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center bg-white rounded-full text-gray-700 max-w-xl mx-auto shadow-lg px-4 py-3 gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <img className="h-5" src={assets.search_icon} alt="Search" />
            <input
              type="text"
              placeholder="Search for jobs"
              className="text-sm p-2 rounded-full outline-none w-full bg-gray-100"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <img className="h-5" src={assets.location_icon} alt="Location" />
            <input
              type="text"
              placeholder="Location"
              className="text-sm p-2 rounded-full outline-none w-full bg-gray-100"
            />
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-2 rounded-full text-white font-semibold shadow-md">
            Search
          </button>
        </div>
      </div>
      <div className="border border-gray-200 shadow-md mx-2 mt-8 p-6 rounded-xl flex justify-center bg-white">
        <div className="flex items-center gap-10 lg:gap-16 flex-wrap justify-center">
          <p className="font-semibold text-gray-700">Trusted By</p>
          <img className="h-8 hover:scale-110 transition" src={assets.microsoft_logo} alt="Microsoft" />
          <img className="h-8 hover:scale-110 transition" src={assets.walmart_logo} alt="Walmart" />
          <img className="h-8 hover:scale-110 transition" src={assets.accenture_logo} alt="Accenture" />
          <img className="h-8 hover:scale-110 transition" src={assets.samsung_logo} alt="Samsung" />
          <img className="h-8 hover:scale-110 transition" src={assets.amazon_logo} alt="Amazon" />
          <img className="h-8 hover:scale-110 transition" src={assets.adobe_logo} alt="Adobe" />
        </div>
      </div>
    </div>
  );
};

export default Hero;