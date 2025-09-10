import React from 'react'
import { manageJobsData } from '../assets/assets'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'

const ManageJobs = () => {
  
  const navigate=useNavigate()
  return (
    <div className='container p-4 max-w-5xl'>
      <div className='overflow-x-auto'> 
        <table className='min-w-full bg-white border border-gray-300 max-sm:text-sm'>
          <thead>
            <tr>
              <th className='py-2 px-4 border-b text-left max-sm:hidden text-blue-950'>#</th>
              <th className='py-2 px-4 border-b text-left text-blue-950'>Job Title</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden text-blue-950'>Date</th>
              <th className='py-2 px-4 border-b text-left max-sm:hidden text-blue-950' >Location</th>
      
              <th className='py-2 px-4 border-b text-center text-blue-950'>Applicants</th>
              <th className='py-2 px-4 border-b text-left text-blue-950'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {manageJobsData.map((job,index)=>(
              <tr key={index} className='text-gray-700'>
                <td className='py-2 px-4 border-b max-sm:hidden'>{index+1}</td>
                <td className='py-2 px-4 border-b'>{job.title}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                <td className='py-2 px-4 border-b text-center'>{job.applicants}</td>
                <td className='py-2 px-4 border-b'>
                  <input className='scale-125 ml-4' type="checkbox" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     <div className="flex justify-end my-4">
  <button onClick={()=>navigate('/dashboard/add-job')} className="bg-blue-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200">
    Add New Job
  </button>
</div>

    </div>
  )
}

export default ManageJobs