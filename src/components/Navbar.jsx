import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { openSignIn } = useClerk();
    const { user } = useUser();
    const navigate=useNavigate();

    const {setShowRecruiterLogin} = useContext(AppContext)

    return (
        <div className='shadow py-4'>
            <div className='container mx-auto flex justify-between items-center'>
                <img onClick={()=>navigate('/')} className='cursor-pointer w-40 h-auto mx-5'src={assets.logo2} alt="" />
                {
                    user
                        ? <div className='flex items-center gap-4 max-sm:text-xs mr-5'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p className='max-sm:hidden'>Hi, {user.firstName + " " + user.lastName}</p>
                            <UserButton />
                        </div>
                        : <div className='flex gap-4 max-sm:text-xs mr-5'>
                            <button onClick={e=> setShowRecruiterLogin(true)}className='text-gray-600 cursor-pointer'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-4 rounded-full cursor-pointer'>Login</button>
                        </div>
                }
            </div>
        </div>
    );
};

export default Navbar;