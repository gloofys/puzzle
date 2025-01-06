export default async function handler(req, res) {
    // eslint-disable-next-line no-undef
    const API_KEY = process.env.API_KEY; // Securely access the API key from environment variables

    // Allow only POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const requestData = req.body; // The data sent from your frontend

    try {
        // Make a request to the external API (e.g., Hugging Face)
        const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`, // Use the API key for authorization
            },
            body: JSON.stringify({ inputs: requestData.prompt }), // Send the request payload
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`API Error: ${response.status} - ${errorText}`);
            return res.status(response.status).json({ error: `API error: ${response.statusText}` });
        }

        const data = await response.arrayBuffer(); // Parse the image response as binary data
        res.setHeader("Content-Type", "image/png"); // Set the response type to an image
        // eslint-disable-next-line no-undef
        return res.status(200).send(Buffer.from(data)); // Send the image back to the frontend
    } catch (error) {
        console.error("Serverless Function Error:", error.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
}
