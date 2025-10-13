import express from "express";
import cors from "cors";
import "dotenv/config";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 5000;


const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/resume", resumeRoutes);

app.get("/api/status", (req, res) => res.send('Server is live'));

await connectDB();

app.listen(port, () => console.log('Server running on port ' + port))


