import Resume from "../models/resume-schema.js";
import OpenAI from "openai";
import dotenv from "dotenv"

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY});

export const generateResume = async (req,res) => {
    const {userProfile, jobDescription, userId} = req.body;
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            message: [
                { role: "system", content: "You are an expert resume writer." },
                { role: "user", content: `Generate a resume for: ${userProfile}, tailored to ${jobDescription}` }
            ]
        });

        const content = completion.choices[0].message.content;
        const resume = await Resume.create({ userId, content, tailoredFor: jobDescription });
        res.status(200).json({success:true, data: resume});

    }catch(err){
        res.status(500).json({success:failed, message:err.message})
    }
}