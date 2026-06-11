import * as dotenv from "dotenv";
dotenv.config();
import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import userRouter from "./routes/userRouter.js";
import resumeRouter from "./routes/resumeroutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

connectDB()

// Middleware
app.use(cors({ origin:[ 
    "http://localhost:5173", 
    "https://resume-builder-beta-taupe.vercel.app"
],
    credentials: true, 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']}));
app.options('*', cors())
app.use(express.json())

// Routes
app.get('/', (req, res) => {
    res.send('API WORKING')
})
app.use('/auth', userRouter)
app.use('/api/resume', resumeRouter)

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
})
