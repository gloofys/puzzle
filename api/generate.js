import { InferenceClient } from "@huggingface/inference";

export default async function handler(req, res) {
    const API_KEY = process.env.API_KEY;

    if (!API_KEY) {
        return res.status(500).json({ error: "Missing API_KEY env var on server" });
    }

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== "string") {
        return res.status(400).json({ error: "Invalid prompt. Please provide a valid string." });
    }

    try {
        const hf = new InferenceClient(API_KEY);

        const image = await hf.textToImage({
            model: "black-forest-labs/FLUX.1-dev",
            inputs: prompt,
            provider: "auto",
        });

        // Works in Node 18+ (Blob)
        const arrayBuffer = await image.arrayBuffer();
        res.setHeader("Content-Type", image.type || "image/png");
        return res.status(200).send(Buffer.from(arrayBuffer));
    } catch (err) {
        // ✅ Make the real HF error visible
        const status =
            err?.status ||
            err?.response?.status ||
            err?.cause?.status ||
            500;

        const details =
            err?.message ||
            err?.response?.statusText ||
            "Unknown error";

        console.error("HF error full:", err);

        return res.status(status).json({
            error: "Hugging Face request failed",
            status,
            details,
        });
    }
}