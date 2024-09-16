import OpenAI from "openai";

import axios from "axios";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: "org-org-70znNudSNHqjY0g9CPs5JHNw",
    project: "proj_D40NofVUdrlSQ2wP36tfD7uR",
});

export default async function handler(req, res) {
    try {
        const { default: OpenAI } = await import("openai");

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            organization: "org-70znNudSNHqjY0g9CPs5JHNw",
            project: "proj_D40NofVUdrlSQ2wP36tfD7uR",
        });

        const prompt = req.body.prompt || "Say this is a test!";

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo", // or "gpt-3.5-turbo"
            messages: [{ role: "user", content: prompt }],
        });

        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.data) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    }
}
