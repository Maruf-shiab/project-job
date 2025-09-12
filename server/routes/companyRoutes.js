import express from 'express'
import { changeJobApplicationsStatus, changeVisibility, getCompanyData, getCompanyJobApplicants, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/companyController.js'
import upload from '../config/multer.js'
const router =express.Router()

//Register a company 
router.post('/register',upload.single('image'),registerCompany)

//company login

router.post('/login',loginCompany)

//Get company data
router.get('/company',getCompanyData)

//Post a Job
router.post('/post-job',postJob)

//get Applicants Data

router.get('/applicants',getCompanyJobApplicants)

//get company Job List
router.get('/list-jobs',getCompanyPostedJobs)

//get appli status

router.post('/change-status',changeJobApplicationsStatus)

//change Appli visibility

router.post('/change-visiblity',changeVisibility)

export default router
