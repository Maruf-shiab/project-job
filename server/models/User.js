import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // Clerk user id – must be unique
    clerkId: { type: String, required: true, unique: true },

    // Profile fields
    name: { type: String },
    email: { type: String },   // no "unique" here
    image: { type: String },
    resume: { type: String },
  },
  { timestamps: true }
);

// Prevent recompilation in dev/hot-reload
export default mongoose.models.User || mongoose.model("User", userSchema);
