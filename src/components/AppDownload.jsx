import React from 'react'
import { assets } from '../assets/assets';

const AppDownload = () => {
  return (
    <div className="container px-4 2xl:px-20 mx-auto my-16">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-50 to-purple-50 p-10 sm:p-16">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-200/60 blur-2xl" />
        <div className="absolute -left-10 -bottom-12 h-40 w-40 rounded-full bg-purple-200/60 blur-2xl" />

        <h3 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
          Download Mobile App for a Better Experience
        </h3>
        <p className="text-gray-600 mb-8 max-w-xl">
          Apply faster, track your applications, and get instant updates.
        </p>

        <div className="flex flex-wrap gap-4">
          {assets?.play_store && (
            <a href="#" className="inline-block">
              <img className="h-12" src={assets.play_store} alt="Play Store" />
            </a>
          )}
          {assets?.app_store && (
            <a href="#" className="inline-block">
              <img className="h-12" src={assets.app_store} alt="App Store" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
