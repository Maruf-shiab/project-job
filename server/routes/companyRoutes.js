import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
import { protectCompany } from '../middleware/authMiddleware.js'
const router =express.Router()

//Register a company 
router.post('/register',upload.single('image'),registerCompany)

//company login

router.post('/login',loginCompany)

//Get company data
router.get('/company',protectCompany,getCompanyData)

//Post a Job
router.post('/post-job',protectCompany,postJob)

//get Applicants Data

router.get('/applicants',protectCompany,getCompanyJobApplicants)

//get company Job List
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//get appli status

router.post('/change-status',protectCompany,changeJobApplicationsStatus)

//change Appli visibility

router.post('/change-visiblity',protectCompany,changeVisibility)

export default router
