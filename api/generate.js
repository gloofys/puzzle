import { InferenceClient } from "@huggingface/inference";

export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Invalid prompt. Please provide a valid string." });
    }

    try {
        const hf = new InferenceClient(API_KEY);

        // "auto" will pick the first available provider for this model based on your HF settings
        // You can also set provider: "fal-ai" / "replicate" if you want to force one.
        const imageBlob = await hf.textToImage({
            model: "black-forest-labs/FLUX.1-dev",
            inputs: prompt,
            provider: "auto",
        });

        const arrayBuffer = await imageBlob.arrayBuffer();
        res.setHeader("Content-Type", imageBlob.type || "image/png");
        return res.status(200).send(Buffer.from(arrayBuffer));
    } catch (error) {
        console.error("HF image generation error:", error);
        return res.status(500).json({ error: error?.message || "Something went wrong." });
    }
}