// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "/src/assets/TextToImageGenerator.css";
import"/src/assets/Buttons.css"

const TextToImageGenerator = ({ onImageGenerated, onGridSelected }) => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedGrid, setSelectedGrid] = useState({ rows: 4, columns: 4 });

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

            onImageGenerated(imageUrl); // Send the image URL to the parent
            onGridSelected(selectedGrid); // Send grid selection to the parent
            setIsLoading(false);
        } catch (error) {
            console.error("Error generating image:", error.response?.headers); // Log error headers
            setIsLoading(false);
        }
    };

    const handleGridClick = (rows, columns) => {
        setSelectedGrid({ rows, columns });
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
            <div className="grid-size-buttons">
                <p>Select Grid Size:</p>
                {[...Array(9).keys()].map((i) => {
                    const size = i + 2; // From 2x2 to 10x10
                    return (
                        <button
                            key={size}
                            onClick={() => handleGridClick(size, size)}
                            className={
                                selectedGrid.rows === size ? "selected" : ""
                            }
                        >
                            {size}x{size}
                        </button>
                    );
                })}
            </div>
            <button onClick={handleGenerateImage} disabled={isLoading || !prompt}>
                {isLoading ? "Generating..." : "Generate Image"}
            </button>
        </div>
    );
};

TextToImageGenerator.propTypes = {
    onImageGenerated: PropTypes.func.isRequired,
    onGridSelected: PropTypes.func.isRequired,
};

export default TextToImageGenerator;
