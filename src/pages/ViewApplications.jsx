import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {
  const { backendUrl, companyToken } = useContext(AppContext)
  const [applicants, setApplicants] = useState([])
  const [openDropdown, setOpenDropdown] = useState(null)

  const fetchCompanyJobApplications = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/company/applicants', {
        headers: { token: companyToken },
      })
      if (data.success) setApplicants(data.applications.reverse())
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const changeJobApplicationStatus = async (id, status) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )
      if (data.success) fetchCompanyJobApplications()
      else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) fetchCompanyJobApplications()
  }, [companyToken])

  if (!applicants) return <Loading />
  if (applicants.length === 0)
    return <p className="text-center text-gray-600 mt-20 text-xl">No Applications Yet</p>

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow shadow-purple-300">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">Applications</h2>

      <div className="flex flex-col gap-4">
        {applicants.filter((app) => app.jobId && app.userId).map((applicant, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
          >
            {/* Index */}
            <div className="text-gray-600 font-medium sm:w-6">{index + 1}</div>

            {/* User Info */}
            <div className="flex items-start gap-2 break-words sm:w-48">
              <img
                src={applicant.userId.image}
                alt="user"
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <span>{applicant.userId.name}</span>
            </div>

            {/* Job Title */}
            <div className="sm:w-48 break-words font-medium">{applicant.jobId.title}</div>

            {/* Location */}
            <div className="sm:w-32 break-words text-gray-600">{applicant.jobId.location}</div>

            {/* Resume */}
            <div className="break-words">
              <a
                href={applicant.userId.resume}
                target="_blank"
                className="bg-blue-50 text-blue-600 px-3 py-1 rounded inline-flex items-center gap-2 hover:bg-blue-100 transition sm:w-30 break-words"
              >
                Resume
                <img src={assets.resume_download_icon} alt="resume" />
              </a>
            </div>

            {/* Action */}
            <div className="sm:w-60 relative">
              {applicant.status === 'Pending' ? (
                <>
                  <button
                    className="text-gray-500 font-bold px-2 py-1 border rounded hover:bg-gray-100"
                    onClick={() =>
                      setOpenDropdown((prev) => (prev === index ? null : index))
                    }
                  >
                    ...
                  </button>
                  {openDropdown === index && (
                    <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                      <button
                        onClick={() => {
                          changeJobApplicationStatus(applicant._id, 'Accepted')
                          setOpenDropdown(null)
                        }}
                        className="block w-full px-4 py-2 text-left text-blue-600 hover:bg-gray-100 break-words"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => {
                          changeJobApplicationStatus(applicant._id, 'Rejected')
                          setOpenDropdown(null)
                        }}
                        className="block w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100 break-words"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <span
                  className={`font-medium ${
                    applicant.status === 'Accepted' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {applicant.status}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ViewApplications
