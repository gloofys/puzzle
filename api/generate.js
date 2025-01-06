export default async function handler(req, res) {
    // eslint-disable-next-line no-undef
    const API_KEY = process.env.API_KEY;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const requestData = req.body;

    try {
        let retries = 5; // Number of retries
        let response;

        do {
            console.log(`Attempting API call. Retries left: ${retries}`);
            response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({ inputs: requestData.prompt }),
            });

            if (response.ok) break;

            const errorData = await response.json();
            console.error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);

            // If model is loading, wait before retrying
            if (response.status === 503 && errorData.error.includes("currently loading")) {
                console.log("Model is still loading. Retrying...");
                await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
            }

            retries--;
        } while (retries > 0);

        if (!response || !response.ok) {
            const errorText = await response.text();
            console.error(`Final API Error: ${response?.status} - ${errorText}`);
            return res.status(response?.status || 500).json({ error: `API error: ${response?.statusText || "Unknown error"}` });
        }

        const data = await response.arrayBuffer();
        res.setHeader("Content-Type", "image/png");
        // eslint-disable-next-line no-undef
        return res.status(200).send(Buffer.from(data));
    } catch (error) {
        console.error("Serverless Function Error:", error.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
}
