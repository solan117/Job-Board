import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';
import * as Sentry from "@sentry/node";
import connectDB from "./config/db.js";
import {clerkWebhooks} from "./controllers/webhooks.js";

dotenv.config();

// Initialize express
const app = express()

// Connect to database
await connectDB()


// Middlewares
app.use(cors())
app.use(express.json())


// Routes
app.get('/', (req, res) => res.send("API WORKING"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebhooks)

// Port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})