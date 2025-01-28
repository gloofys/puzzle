export default async function handler(req, res) {
    // eslint-disable-next-line no-undef
    const API_KEY = process.env.API_KEY;

    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const requestData = req.body;

    if (!requestData.prompt || typeof requestData.prompt !== "string") {
        return res.status(400).json({ error: "Invalid prompt. Please provide a valid string." });
    }

    try {
        const { response, attempts } = await retryFetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({ inputs: requestData.prompt }),
            },
            5, // maxRetries
            5000 // delay (ms)
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Final API Error: ${response?.status} - ${errorText}`);
            return res.status(response?.status || 500).json({ error: `API error: ${response?.statusText || "Unknown error"}` });
        }

        const data = await response.arrayBuffer();
        res.setHeader("Content-Type", "image/png");
        res.setHeader("X-Retries", attempts); // Include the number of retries
        // eslint-disable-next-line no-undef
        return res.status(200).send(Buffer.from(data));
    } catch (error) {
        console.error("Serverless Function Error:", {
            message: error.message,
            stack: error.stack,
        });
        return res.status(500).json({ error: "Something went wrong." });
    }
}

async function retryFetch(url, options, maxRetries, delay) {
    let response;
    let attempts = 0; // Track the number of attempts

    for (attempts = 0; attempts <= maxRetries; attempts++) {
        try {
            response = await fetch(url, options);
            if (response.ok) return { response, attempts }; // Return response and attempts

            if (response.status === 503) {
                const errorData = await response.json();
                if (errorData.error.includes("currently loading")) {
                    console.log(`Model loading. Retry in ${delay / 1000} seconds. (${maxRetries - attempts} retries left)`);
                    await new Promise((resolve) => setTimeout(resolve, delay));
                    continue;
                }
            }
            break; // Exit loop on non-retriable error
        } catch (error) {
            console.error("Fetch error:", error.message);
            if (attempts === maxRetries) throw error; // Rethrow error if retries exhausted
            await new Promise((resolve) => setTimeout(resolve, delay)); // Retry delay
        }
    }

    return { response, attempts };
}
