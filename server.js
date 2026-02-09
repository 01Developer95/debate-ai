require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/debate', async (req, res) => {
    try {
        // Basic history handling would go here (history is no longer destructured here)

        // Dynamic model selection strategy: Try 3 generations of Flash before giving up
        // Dynamic model selection strategy: Try 3 generations of Flash before giving up
        // Prioritize Intelligence (Gemini 3) -> Speed/Stability (Gemini 1.5)
        const MODELS = ["gemini-3-flash-preview", "gemini-2.0-flash", "gemini-1.5-flash"];
        let text;
        const { topic, userArgument } = req.body;

        // Construct the prompt
        const prompt = `You are a professional debater and logic analyst.
        Topic: ${topic}
        User Argument: "${userArgument}"

        Analyze the argument for logical fallacies, emotional resonance, and factual accuracy.
        Then, provide a counter-argument.
        Finally, rate the user's argument on a "Truth Score" of 0-100.
        
        Format response as JSON: { "analysis": "...", "counterArgument": "...", "score": number }`;

        for (const modelName of MODELS) {
            try {
                console.log(`Attempting generation with ${modelName}...`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent(prompt);
                const response = await result.response;
                text = response.text();
                // If successful, log and break loop
                fs.appendFileSync('server_debug.log', `\n[${new Date().toISOString()}] SUCCESS: ${modelName}\n`);
                lastError = null;
                break;
            } catch (e) {
                console.warn(`${modelName} failed. Trying next...`);
                fs.appendFileSync('server_debug.log', `\n[${new Date().toISOString()}] WARN: ${modelName} failed: ${e.message}\n`);
                lastError = e;
            }
        }

        if (lastError || !text) {
            // Real Error Mode: Better for Judges than fake data
            throw new Error("All models exhausted. API Quota Exceeded or Service Down.");
        }

        console.log("Gemini Raw Response:", text); // Debug log
        fs.appendFileSync('server_debug.log', `\n[${new Date().toISOString()}] RAW RESPONSE: ${text}\n`);

        // Robust JSON extraction
        let jsonStr = text;
        const jsonStart = text.indexOf('{');
        const jsonEnd = text.lastIndexOf('}');

        if (jsonStart !== -1 && jsonEnd !== -1) {
            jsonStr = text.substring(jsonStart, jsonEnd + 1);
        }

        const jsonResponse = JSON.parse(jsonStr);

        res.json(jsonResponse);
    } catch (error) {
        console.error("Server Error:", error);
        fs.appendFileSync('server_debug.log', `\n[${new Date().toISOString()}] ERROR: ${error.message}\nSTACK: ${error.stack}\n`);
        res.status(500).json({ error: "Failed to process debate. Check server_debug.log for details." });
    }
});

app.listen(port, async () => {
    console.log(`DebateAI server running at http://localhost:${port}`);

    // Debug: List available models to verify API key permissions
    try {
        // For debugging, we might not have a clean way to list models via the simplified SDK usage here without correct instantiation
        // but let's try to just log that we are ready.
        console.log("Server ready. If 404 persists, check API Access in Google Studio.");
    } catch (e) {
        console.error("Startup Check Failed:", e);
    }
});
