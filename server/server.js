import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js'

//intialize express
const app = express()
//connect to db
await connectDB()

//middleware
app.use(cors())
app.use(express.json())

//import routes
app.get('/',(req,res) =>("API Working") )
app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
app.post('/webhooks',clerkWebhooks)

//port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);
app.listen(PORT, () =>{
     console.log(`Server running on port ${PORT}`);
    })
     
 