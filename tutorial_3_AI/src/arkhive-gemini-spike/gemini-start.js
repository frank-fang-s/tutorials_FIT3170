
//============================================================
//File:        gemini-start.js
//Author:      Aryan Cyrus 33114242
//Created:     2026-03/22
//Description: Tech Spike for Google Gemini LLM
//Version:     1.0
//Last Updated:2026-03-22 by Aryan Cyrus
//============================================================

//imports
import dotenv from 'dotenv'
import { GoogleGenAI } from '@google/genai'

//Configure .env file
dotenv.config();

//obtain API key from .env file
const API_KEY = process.env.GEMINI_API_KEY;
//initialise Google generative AI object
const genAI = new GoogleGenAI({apiKey: API_KEY})

//Function to run generative AI model
async function run() {
    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash-lite',
        contents: 'Briefly explain the concept of OCR and describe its uses',
    });
    console.log(response.text);
}

run();