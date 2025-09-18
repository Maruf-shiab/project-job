/*import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    _id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    resume: {type:String},
    image :{type:String,required:true},
    
})
const User = mongoose.model('User',userSchema)
export default User;*/
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true, index: true }, // Clerk userId
    name: { type: String }, // pulled from Clerk
    email: { type: String }, // pulled from Clerk
    image: { type: String }, // Clerk profile image URL
    resume: { type: String }, // uploaded to Cloudinary
  },
  { timestamps: true } // adds createdAt, updatedAt
);

export default mongoose.model("User", userSchema);
