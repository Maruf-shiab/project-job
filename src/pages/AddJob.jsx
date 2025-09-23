import React, { useState, useRef, useEffect, useContext } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets'
import axios from 'axios'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddJob = () => {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('Dhaka')
  const [category, setCategory] = useState('Programming')
  const [level, setLevel] = useState('Beginner level')
  const [salary, setSalary] = useState('0')

  const editorRef = useRef(null)
  const quillRef = useRef(null)

  const { backendUrl, companyToken } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      const description = quillRef.current.root.innerHTML
      const { data } = await axios.post(
        backendUrl + '/api/company/post-job',
        { title, description, location, salary, category, level },
        { headers: { token: companyToken } }
      )
      if (data.success) {
        toast.success(data.message)
        setTitle('')
        setSalary(0)
        quillRef.current.root.innerHTML = ''
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
      })
    }
  }, [])

  return (
    <div className="bg-white p-6 rounded-lg shadow shadow-purple-300 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6">Post a New Job</h2>
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-5">
        <div>
          <label className="font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            placeholder="Type Here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700 mb-2 block">Job Description</label>
          <div
            ref={editorRef}
            className="h-48 border border-gray-300 rounded-lg p-2 bg-white"
          ></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="font-medium text-gray-700">Category</label>
            <select
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {JobCategories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Location</label>
            <select
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              {JobLocations.map((loc, index) => (
                <option key={index} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Level</label>
            <select
              className="w-full px-3 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner level">Beginner Level</option>
              <option value="Intermediate level">Intermediate Level</option>
              <option value="Senior level">Senior Level</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-medium text-gray-700">Salary</label>
          <input
            type="number"
            placeholder="2500"
            min={0}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full sm:w-40 px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button className="w-full sm:w-40 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
          Post Job
        </button>
      </form>
    </div>
  )
}

export default AddJob
