/*import { messageInRaw } from "svix"
import JobApplication from "../models/jobApplications.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"


//Get User data
export const getUserData= async(req,res)=>{
    
    const userId=req.auth.userId

    try {
        const user= await User.findById(userId)

        if(!user){
            return res.json({success:false,message:'User not found'})
        }
        res.json({success:true,user})
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }
}

//apply for a job
export const applyForJob= async(req,res)=>{

    const {jobId}=req.body

    const userId=req.auth.userId

    try {
        const isAlreadyApplied= await JobApplication.find({jobId,userId})

        if(isAlreadyApplied.length>0){
            return res.json({success: false, message:'Already Applied'})
        }

        const jobData= await Job.findById(jobId)

        if (!jobData) {
            return res.json({success:false,message:'Job Not found'})
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })
        res.json({success: true,message:"Applied Succesfully"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

//get user apllied application
export const getUserJobApplications=async(req,res)=>{

    try {
        const userId=req.auth.userId

        const applications= await JobApplication.find({userId})
        .populate('companyId','name email image')
        .populate('jobId','title description location category level salary')
        .exec()

        if(!applications){
            return res.json({success:false, message:'No Job applications found for this user'})
        }

        return res.json({success:true, applications})
    } catch (error) {
        res.json({success: false,message:error.message})
    }

}
//Update user profile(resume)
export const updateUserResume= async(req,res)=>{

    try {
        const userId= req.auth.userId

        const resumeFile= req.resumeFile

        const userData= await User.findById(userId)
        if (resumeFile) {
            const resumeUpload= await cloudinary.uploader.upload(resumeFile.path)

            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({sucess:true, message:'Resume Updated'})

    } catch (error) {
        res.json({success:false, message:error.message})
    }

}
*/
// controllers/userController.js
/*import JobApplication from "../models/jobApplications.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";
import { clerkClient } from "@clerk/express";

// GET /api/users/user
export const getUserData = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    // Fetch latest Clerk profile
    const cUser = await clerkClient.users.getUser(clerkId);
    const fullName = `${cUser.firstName || ""} ${cUser.lastName || ""}`.trim();
    const email = cUser.emailAddresses?.[0]?.emailAddress || "";
    const imageUrl = cUser.imageUrl || "";

    // Find or create user
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        name: fullName,
        email,
        image: imageUrl,
        resume: "",
      });
    } else {
      let updated = false;
      if (!user.name && fullName) { user.name = fullName; updated = true; }
      if (!user.email && email)   { user.email = email;   updated = true; }
      if (!user.image && imageUrl){ user.image = imageUrl;updated = true; }
      if (updated) await user.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/users/apply
export const applyForJob = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    const { jobId } = req.body;

    if (!clerkId || !jobId) {
      return res.json({ success: false, message: "Missing clerkId or jobId" });
    }

    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "User not found" });

    const existing = await JobApplication.findOne({ jobId, userId: user._id });
    if (existing) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) return res.json({ success: false, message: "Job not found" });

    await JobApplication.create({
      companyId: jobData.companyId,
      userId: user._id,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// GET /api/users/applications
export const getUserJobApplications = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "User not found" });

    const applications = await JobApplication.find({ userId: user._id })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary");

    if (!applications || applications.length === 0) {
      return res.json({ success: false, message: "No job applications found" });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// POST /api/users/update-resume
export const updateUserResume = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "User not found" });

    const resumeFile = req.file;
    if (!resumeFile) {
      return res.json({ success: false, message: "No resume file provided" });
    }

    const uploadRes = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    user.resume = uploadRes.secure_url;
    await user.save();

    return res.json({ success: true, message: "Resume Updated", resume: user.resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
*/
import JobApplication from "../models/jobApplications.js";
import User from "../models/User.js";
import Job from "../models/Job.js";
import { v2 as cloudinary } from "cloudinary";
import { clerkClient } from "@clerk/express";

// GET /api/users/user
export const getUserData = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    if (!clerkId) {
      return res.status(401).json({ success: false, message: "Unauthenticated" });
    }

    // Fetch latest Clerk profile
    const cUser = await clerkClient.users.getUser(clerkId);
    const fullName = `${cUser.firstName || ""} ${cUser.lastName || ""}`.trim();
    const email = cUser.emailAddresses?.[0]?.emailAddress || "";
    const imageUrl = cUser.imageUrl || "";

    // Find or create user
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = await User.create({
        clerkId,
        name: fullName,
        email,
        image: imageUrl,
        resume: "",
      });
    } else {
      let updated = false;
      if (!user.name && fullName) { user.name = fullName; updated = true; }
      if (!user.email && email)   { user.email = email;   updated = true; }
      if (!user.image && imageUrl){ user.image = imageUrl;updated = true; }
      if (updated) await user.save();
    }

    return res.json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/users/apply
export const applyForJob = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    const { jobId } = req.body;

    if (!clerkId || !jobId) {
      return res.json({ success: false, message: "Missing clerkId or jobId" });
    }

    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "User not found" });

    const existing = await JobApplication.findOne({ jobId, userId: user._id });
    if (existing) {
      return res.json({ success: false, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) return res.json({ success: false, message: "Job not found" });

    await JobApplication.create({
      companyId: jobData.companyId,
      userId: user._id,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// GET /api/users/applications
export const getUserJobApplications = async (req, res) => {
  try {
    const clerkId = req.auth?.userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "User not found" });

    const applications = await JobApplication.find({ userId: user._id })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary");

    if (!applications || applications.length === 0) {
      return res.json({ success: false, message: "No job applications found" });
    }

    return res.json({ success: true, applications });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// POST /api/users/update-resume
export const updateUserResume = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });
    if (!user) return res.json({ success: false, message: "User not found" });

    const resumeFile = req.file;
    if (!resumeFile) {
      return res.json({ success: false, message: "No resume file provided" });
    }

    const uploadRes = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "raw",
      folder: "resumes",
    });

    user.resume = uploadRes.secure_url;
    await user.save();

    return res.json({ success: true, message: "Resume Updated", resume: user.resume });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
