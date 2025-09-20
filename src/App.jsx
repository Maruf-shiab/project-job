import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LandingPage from './pages/LandingPage.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import 'quill/dist/quill.snow.css'
import RecruiterLogin from './components/RecruiterLogin.jsx'
import { AppContext } from './context/AppContext.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import AddJob from './pages/AddJob.jsx'
import Dashboard from './pages/Dashboard.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  const { showRecruiterLogin, companyToken } = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard />}>
          {/* default child route when visiting /dashboard */}

          {companyToken ? <>
            <Route index element={<Navigate to="manage-jobs" replace />} />
            <Route path='add-job' element={<AddJob />} />
            <Route path='manage-jobs' element={<ManageJobs />} />
            <Route path='view-applications' element={<ViewApplications />} />
          </> : null
          }

        </Route>
      </Routes>
    </div>
  )
}

export default App