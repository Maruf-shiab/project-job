import React, { useContext, useEffect, useState, useRef } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Dashboard = () => {
  const navigate = useNavigate()
  const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext)
  const [showLogout, setShowLogout] = useState(false) // dropdown visibility
  const dropdownRef = useRef(null)

  const logout = () => {
    setCompanyToken(null)
    localStorage.removeItem('companyToken')
    setCompanyData(null)
    navigate('/')
  }

  useEffect(() => {
    if (companyData) {
      navigate('/dashboard/manage-jobs')
    }
  }, [companyData])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowLogout(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="shadow-md bg-gradient-to-br from-white via-blue-50 to-blue-200">
        <div className="px-6 py-4 flex justify-between items-center">
          <img
            onClick={() => navigate('/')}
            className="w-36 cursor-pointer"
            src={assets.logo2}
            alt="logo"
          />

          {companyData && (
            <div className="flex items-center gap-4 relative" ref={dropdownRef}>
              <p className="max-sm:hidden font-medium text-gray-600">
                Welcome, <span className="text-blue-600">{companyData.name}</span>
              </p>

              {/* Profile with click-to-toggle dropdown */}
              <img
                className="w-10 h-10 border rounded-full object-cover cursor-pointer"
                src={companyData.image}
                alt="profile"
                onClick={() => setShowLogout(prev => !prev)}
              />

              {showLogout && (
                <div className="absolute top-12 right-0 z-50 w-36 bg-white border rounded-md shadow-lg">
                  <ul className="list-none m-0 p-0">
                    <li
                      onClick={logout}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-60 bg-gradient-to-b from-white via-blue-200 to-blue-400 border-r border-gray-400 shadow-sm">
          <ul className="flex flex-col pt-6 font-medium text-black">
            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-200 transition ${
                  isActive ? 'bg-red-100 border-r-4 border-blue-500 text-blue-600' : ''
                }`
              }
              to="add-job"
            >
              <img className="w-5" src={assets.add_icon} alt="add" />
              <span>Add Job</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-200 transition ${
                  isActive ? 'bg-red-100 border-r-4 border-blue-500 text-blue-600' : ''
                }`
              }
              to="manage-jobs"
            >
              <img className="w-5" src={assets.home_icon} alt="manage" />
              <span>Manage Jobs</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 hover:bg-purple-200 transition ${
                  isActive ? 'bg-red-100 border-r-4 border-blue-500 text-blue-600' : ''
                }`
              }
              to="view-applications"
            >
              <img className="w-5" src={assets.person_tick_icon} alt="applications" />
              <span>View Applications</span>
            </NavLink>
          </ul>
        </aside>

        {/* Page Content */}
        <main className="flex-1 p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Dashboard
