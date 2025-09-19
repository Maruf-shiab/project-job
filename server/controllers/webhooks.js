/*import {webhook} from "svix";
import user from "../models/User.js";
//Api Controller Function to manage clerk User With database
export const clerkWebhooks = async (req, res) => {
  try {
    //CREATE a svix instance with clerk secret
    const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET)
    //Verify Headers
    await whook.verify(JSON.stringify(req.body),{
        "svix-id": req.headers["svix-id"]
        ,"svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
    })
    //gETTING DATA FROM REQ BODY
    const {data,event_type} = req.body;
    //SWITCH CASE FOR DIFFERENT EVENTS
    switch(type){
        case "user.created":{
            const userData = {
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                image:data.image_url,
                resume:''
            }
            await User.create(userData)
            res.json({})
            break;

        }
        case "user.updated":{
            const userData = {
               
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                image:data.image_url,
                
            }
            await User.findByIdAndUpdate(data.id,userData)
            res.json({})
            break;
           
        }
        case "user.deleted":{
            await User.findByIdAndDelete(data.id)
            res.json({})
            break;
        }
        default:
            break;
    }
  } catch (error) {
    console.log(error.message);
    res.json({success:false, message:'Webhooks Error'})

  }

}
  */
 /*import { Webhook } from "svix";
import user from "../models/User.js";

// Api Controller Function to manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    // CREATE a Svix instance with Clerk secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    
    // Verify Headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // GETTING DATA FROM REQ BODY
    const { data, type } = req.body;

    // SWITCH CASE FOR DIFFERENT EVENTS
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
          resume: '',
        };
        await user.create(userData);
        return res.json({});
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          image: data.image_url,
        };
        await user.findByIdAndUpdate(data.id, userData);
        return res.json({});
      }

      case "user.deleted": {
        await user.findByIdAndDelete(data.id);
        return res.json({});
      }
      
      default:
        return res.status(400).json({ success: false, message: 'Invalid event type' });
    }
    
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ success: false, message: 'Webhooks Error' });
  }
};
*/
import {Svix, Webhook} from 'svix'
import User from '../models/User.js'
//Api Controller Function
export const clerkWebhooks =async (req,res) =>{
  try {
     const whook =new Webhook (process.env.CLERK_WEBHOOK_SECRET)
     await whook.verify(JSON.stringify(req.body),{
      "svix-id" :req.headers["svix-id"],
      "svix-timestamp" :req.headers["svix-timestamp"],
      "svix-signature" :req.headers["svix-signature"],
     })
    
     //getting data from
     const { data, type } = req.body;
     switch (key) {
      case 'user.created':{
               const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name+" "+ data.last_name,
          image: data.image_url,
          resume: ''
        }
        await User.create(userData)
         res.json({})
        break;
      }
      case 'user.updated':{
        
               const userData = {
         
          email: data.email_addresses[0].email_address,
          name: data.first_name+" "+ data.last_name,
          image: data.image_url,
         
        }
        await User.findIdAndUpdate(data.id,userData)
         res.json({})
        break;
      }

      
      case 'user.deleted':{
        await User.findIdAndUpdate(data.id)
        res.json({})
        break;

      }
        
        
      default:
        break;
     }
  } catch (error) {
    console.log({success:false,message:'Webhook Eroor'})
  }
}
