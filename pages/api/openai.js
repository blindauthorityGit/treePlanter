import { Configuration, OpenAIApi } from "openai";
console.log(process.env.OPENAI_API_KEY);

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
    try {
        console.log(process.env.OPENAI_API_KEY);
        const prompt = req.body.prompt;

        if (!prompt || prompt === "") {
            return res.status(400).json({ error: "Please send your prompt" });
        }

        const aiResult = await openai.chat.createCompletion({
            model: "gpt-3.5-turbo",
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 2048,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const response = aiResult.data.choices[0].text?.trim() || "Sorry problem";
        console.log(response);
        res.status(200).json({ text: response });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
