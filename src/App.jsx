import React, { useContext } from 'react'
import { Route,Routes,Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ApplyJob from './pages/ApplyJob.jsx'
import Applications from './pages/Applications.jsx'
import 'quill/dist/quill.snow.css'
import RecruiterLogin from './components/RecruiterLogin.jsx'
import { AppContext } from './context/AppContext.jsx'
import ViewApplications from './pages/ViewApplications.jsx'
import ManageJobs from './pages/ManageJobs.jsx'
import AddJob from './pages/AddJob.jsx'
import Dashboard from './pages/Dashboard.jsx'

const App = () => {

  const {showRecruiterLogin} = useContext(AppContext)

  return (
    <div>
      {showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/apply-job/:id" element={<ApplyJob />} />
        <Route path="/applications" element={<Applications />} />
        <Route path='/dashboard' element={<Dashboard/>}>
  {/* default child route when visiting /dashboard */}
  <Route index element={<Navigate to="add-job" replace />} />
  <Route path='add-job' element={<AddJob />} />
  <Route path='manage-jobs' element={<ManageJobs/>}/>
  <Route path='view-applications' element={<ViewApplications/>} />
</Route>


      </Routes>
    </div>
  )
}

export default App
