import React, { useContext, useEffect } from "react";
import { useClerk, useUser } from "@clerk/clerk-react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
    const { openSignIn } = useClerk();
    const { fetchUserData, fetchUserApllications, setShowRecruiterLogin } = useContext(AppContext);
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    // Run these functions once user is signed in, then redirect to home
    useEffect(() => {
        if (isSignedIn) {
            fetchUserData();
            fetchUserApllications();
            navigate('/home');
        }
    }, [isSignedIn, navigate, fetchUserData, fetchUserApllications]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-pink-50">
            {/* Header with Logo */}
            <div className="container mx-auto px-4 pt-8">
                <div className="text-center mb-12">
                    {/* <img className="w-48 h-auto mx-auto mb-6" src={assets.logo2} alt="Logo" /> */}
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Welcome to{" "}
                        <span className="bg-gradient-to-br from-blue-900 to-orange-400 bg-clip-text text-transparent">
                            Job
                        </span>
                        <span className="bg-gradient-to-br from-purple-900 to-blue-400 bg-clip-text text-transparent">
                            হাট
                        </span>
                    </h1>


                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Connect talent with opportunity. Whether you're looking for your dream job or the perfect candidate, we've got you covered.
                    </p>
                </div>
            </div>

            {/* Login Options */}
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="border border-purple-800 bg-gradient-to-br from-blue-200 via-purple-200 to-blue-400 shadow-2xl rounded-3xl p-12 flex flex-col lg:flex-row gap-12 items-center max-w-4xl mx-4">

                    {/* Recruiter Login */}
                    <div
                        onClick={() => setShowRecruiterLogin(true)}
                        className="cursor-pointer group border-2 border-blue-500 hover:border-blue-600 hover:shadow-xl transition-all duration-300 rounded-2xl p-10 w-80 h-64 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200"
                    >

                        <h2 className="text-2xl font-bold text-blue-700 mb-3">Recruiter</h2>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Post jobs, manage applications, and find the perfect candidates for your company
                        </p>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center">
                        <div className="w-px h-32 bg-black hidden lg:block"></div>
                        <div className="w-32 h-px bg-black lg:hidden"></div>
                    </div>

                    {/* Job Seeker Login */}
                    <div
                        onClick={() => openSignIn()}
                        className="cursor-pointer group border-2 border-green-500 hover:border-green-600 hover:shadow-xl transition-all duration-300 rounded-2xl p-10 w-80 h-64 flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200"
                    >

                        <h2 className="text-2xl font-bold text-green-700 mb-3">Job Seeker</h2>
                        <p className="text-gray-600 text-center leading-relaxed">
                            Search and apply for jobs, track your applications, and build your career
                        </p>
                    </div>

                </div>
            </div>

            {/* Footer */}
            <div className="text-center py-8 text-gray-500">
                <p>&copy; JobHut. Connecting dreams with opportunities.</p>
            </div>
        </div>
    );
};

export default LandingPage;