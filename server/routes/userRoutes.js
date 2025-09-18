/*import express from 'express'
import { applyForJob, getUserData, getUserJobApplications, updateUserResume } from '../controllers/userController.js'
import upload from '../config/multer.js'

const router=express.Router()

//Get user Data
router.get('/user',getUserData)

//Apply for a job
router.post('/apply',applyForJob)

//get applied jobs data
router.get('/applications',getUserJobApplications)

//update user profile(resume)
router.post('/update-resume',upload.single('resume'),updateUserResume)

export default router;
*/
import express from 'express';
import {
  applyForJob,
  getUserData,
  getUserJobApplications,
  updateUserResume,
} from '../controllers/userController.js';
import upload from '../config/multer.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

/**
 * Temporary ping to verify the router is mounted
 * GET /api/users/ping  -> { ok: true, at: '/api/users/ping' }
 */
router.get('/ping', (req, res) => {
  res.json({ ok: true, at: '/api/users/ping' });
});

// Get user Data (protected)
router.get('/user', requireAuth(), getUserData);

// Apply for a job (protected)
router.post('/apply', requireAuth(), applyForJob);

// Get applied jobs data (protected)
router.get('/applications', requireAuth(), getUserJobApplications);

// Update user profile (protected)
router.post(
  '/update-resume',
  requireAuth(),
  upload.single('resume'),
  updateUserResume
);

export default router;
