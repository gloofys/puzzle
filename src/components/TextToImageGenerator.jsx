// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "/src/assets/TextToImageGenerator.css";



const TextToImageGenerator = ({ onImageGenerated }) => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateImage = async () => {
        setIsLoading(true);
        const API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2";
        const API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

        try {
            const response = await axios.post(
                API_URL,
                { inputs: prompt },
                {
                    headers: {
                        Authorization: `Bearer ${API_KEY}`,
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    responseType: "arraybuffer", // Binary data
                }
            );

            console.log("Headers:", response.headers); // Log headers to check rate limits

            const imageBlob = new Blob([response.data], { type: "image/png" });
            const imageUrl = URL.createObjectURL(imageBlob);

            onImageGenerated(imageUrl); // Send image URL to parent
            setIsLoading(false);
        } catch (error) {
            console.error("Error generating image:", error.response?.headers); // Log error headers
            setIsLoading(false);
        }
    };

    return (
        <div className="text-to-image-generator">
            <h3>Generate Puzzle Image</h3>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your image..."
                rows="3"
            />
            <button onClick={handleGenerateImage} disabled={isLoading}>
                {isLoading ? "Generating..." : "Generate Image"}
            </button>
        </div>
    );
};

TextToImageGenerator.propTypes = {
    onImageGenerated: PropTypes.func.isRequired,
};

export default TextToImageGenerator;
