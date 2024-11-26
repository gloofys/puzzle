// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "/src/assets/TextToImageGenerator.css";
import "/src/assets/Buttons.css";

const TextToImageGenerator = ({ onImageGenerated, onGridSelected }) => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSize, setSelectedSize] = useState({ rows: 4, columns: 4 });
    const [error, setError] = useState("");

    const gridSizes = [
        { rows: 2, columns: 2 },
        { rows: 3, columns: 3 },
        { rows: 4, columns: 4 },
        { rows: 5, columns: 5 },
        { rows: 6, columns: 6 },
        { rows: 7, columns: 7 },
        { rows: 8, columns: 8 },
        { rows: 9, columns: 9 },
        { rows: 10, columns: 10 },
    ];

    const handleGenerateImage = async () => {
        setIsLoading(true);
        setError("");
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
                    responseType: "arraybuffer",
                }
            );

            const imageBlob = new Blob([response.data], { type: "image/png" });
            const imageUrl = URL.createObjectURL(imageBlob);

            onImageGenerated(imageUrl);
            onGridSelected(selectedSize);

            setIsLoading(false);
            // eslint-disable-next-line no-unused-vars
        } catch (error) {
            setError("Failed to generate image. Please try again later.");
            setIsLoading(false);
        }
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
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
                {gridSizes.map((size) => (
                    <button
                        key={`${size.rows}x${size.columns}`}
                        onClick={() => handleSizeClick(size)}
                        className={
                            selectedSize.rows === size.rows && selectedSize.columns === size.columns
                                ? "selected"
                                : ""
                        }
                    >
                        {size.rows}x{size.columns}
                    </button>
                ))}
            </div>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleGenerateImage} disabled={isLoading || !prompt.trim()}>
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
