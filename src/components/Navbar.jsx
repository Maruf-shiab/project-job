import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <div className='sticky top-0 z-50 bg-gradient-to-br from-white via-pink-100 to-purple-500 shadow py-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <img 
                    onClick={() => navigate('/home')} 
                    className='cursor-pointer w-40 h-auto mx-5' 
                    src={assets.logo2} 
                    alt="" 
                />
                {
                    user && (
                        <div className='flex items-center gap-4 max-sm:text-xs mr-5'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;