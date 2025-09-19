import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { assets, jobsApplied } from '../assets/assets';
import moment from 'moment';
import Footer from '../components/Footer';
import { AppContext } from '../context/AppContext';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';
import axios from 'axios';

const Applications = () => {
  // read from context
  const { userApplications } = useContext(AppContext);
  const { backendUrl, userData, fetchUserData, fetchUserApllications } = useContext(AppContext);
  const { user } = useUser();
  const { getToken } = useAuth();

  const [isEdit, setIsEdit] = useState(false);
  const [resume, setResume] = useState(null);

  const updateResume = async () => {
    try {
      if (!resume) {
        toast.error('Please select a PDF resume first.');
        return;
      }
      const formData = new FormData();
      formData.append('resume', resume);

      const token = await getToken();
      const { data } = await axios.post(
        `${backendUrl}/api/users/update-resume`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message || 'Resume updated');
        await fetchUserData();
      } else {
        toast.error(data.message || 'Failed to update resume');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message || 'Upload failed');
    } finally {
      setIsEdit(false);
      setResume(null);
    }
  };

  const canEdit = isEdit || (!!userData && !userData.resume);

  useEffect(() => {
    if (user) {
      // ✅ use the exact function name from your context
      fetchUserApllications();
    }
  }, [user]); // keep minimal deps per your style

  // ✅ never crash if userApplications is undefined
  const list = Array.isArray(userApplications) ? userApplications : [];

  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10">
        <h2 className="text-xl font-semibold">Your Resume</h2>

        <div className="flex gap-2 mb-6 mt-3">
          {canEdit ? (
            <>
              <label className="flex items-center" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">
                  {resume ? resume.name : 'Select resume'}
                </p>
                <input
                  id="resumeUpload"
                  onChange={(e) => setResume(e.target.files?.[0] ?? null)}
                  accept="application/pdf"
                  type="file"
                  hidden
                />
                <img src={assets.profile_upload_icon} alt="upload" />
              </label>
              <button
                onClick={updateResume}
                disabled={!resume}
                className={`rounded-lg px-4 py-2 border ${
                  resume
                    ? 'bg-amber-200 border-amber-400'
                    : 'bg-gray-100 border-gray-300 cursor-not-allowed'
                }`}
              >
                Save
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <a
                className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg"
                href={userData?.resume || '#'}
                target={userData?.resume ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                Resume
              </a>
              <button
                onClick={() => setIsEdit(true)}
                className="text-gray-500 border border-gray-300 rounded-lg px-4 py-2"
              >
                Edit
              </button>
            </div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-4">Applied Jobs</h2>
        <table className="min-w-full bg-amber-50 border border-amber-800 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b text-left">Company</th>
              <th className="px-4 py-3 border-b text-left">Job Title</th>
              <th className="px-4 py-3 border-b text-left max-sm:hidden">Location</th>
              <th className="px-4 py-3 border-b text-left max-sm:hidden">Date</th>
              <th className="px-4 py-3 border-b text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((job, index) => {
              // ✅ handle both shapes: populated objects OR plain IDs
              const companyDoc =
                job?.companyId && typeof job.companyId === 'object' ? job.companyId : null;
              const jobDoc =
                job?.jobId && typeof job.jobId === 'object' ? job.jobId : null;

              const companyName = companyDoc?.name || 'Company';
              const companyImage = companyDoc?.image || '';
              const title = jobDoc?.title || 'Untitled Job';
              const location = jobDoc?.location || '—';
              const appliedDate = job?.date || job?.createdAt;
              const status = job?.status || 'submitted';

              return (
                <tr key={job._id || index}>
                  <td className="py-3 px-4 flex items-center gap-2 border-b">
                    {companyImage ? <img className="w-8 h-8" src={companyImage} alt="" /> : null}
                    {companyName}
                  </td>
                  <td className="py-2 px-4 border-b">{title}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">{location}</td>
                  <td className="py-2 px-4 border-b max-sm:hidden">
                    {appliedDate ? moment(appliedDate).format('ll') : '—'}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`${
                        status === 'Accepted'
                          ? 'bg-green-100'
                          : status === 'Rejected'
                          ? 'bg-red-100'
                          : 'bg-blue-100'
                      } px-4 py-1.5 rounded`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default Applications;
