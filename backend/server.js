import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Resume from './models/Resume.js';

dotenv.config();
const app = express();


app.use(cors({ origin: '*' })); 
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const upload = multer({ storage: multer.memoryStorage() });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/analyze', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Analyze this resume text. Return ONLY a valid JSON object with no markdown formatting. The JSON must contain exactly these keys: "name" (string), "email" (string), "skills" (array of strings), "score" (number from 0-100 evaluating the resume quality), and "feedback" (string with 2 sentences of constructive feedback). Resume text: ${text}`;
    
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const analysis = JSON.parse(responseText);

    const newResume = new Resume(analysis);
    await newResume.save();

    res.json(analysis);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

const PORT = process.env.PORT ||;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
