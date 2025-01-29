// eslint-disable-next-line no-unused-vars
import React, {useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "/src/assets/TextToImageGenerator.css";
import "/src/assets/Buttons.css";

const TextToImageGenerator = ({ onImageGenerated, onClose }) => {
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedSize, setSelectedSize] = useState({ rows: 4, columns: 4 });
    const [error, setError] = useState("");
    const [hasTextError, setHasTextError] = useState(false);

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
        if (prompt.trim().length < 1) {
            setError("Please enter a description to generate an image.");
            setHasTextError(true); // Add the red border
            return; // Prevent the rest of the function from executing
        }

        // Clear the error if validation passes
        setHasTextError(false);
        setError("");
        setIsLoading(true);

        try {
            const response = await axios.post(
                "/api/generate.js",
                { prompt },
                {
                    responseType: "arraybuffer",
                    timeout: 60000,
                }
            );

            const imageBlob = new Blob([response.data], { type: "image/png" });
            const imageUrl = URL.createObjectURL(imageBlob);

            onImageGenerated(imageUrl, selectedSize);
            setIsLoading(false);
        } catch (error) {
            if (error.code === "ECONNABORTED") {
                setError("Request timed out. Please try again later.");
            } else {
                setError("Failed to generate image. Please try again later.");
            }
            setIsLoading(false);
        }
    };


    return (
        <div className="text-to-image-generator-container">
            <div className="dialog-overlay" onClick={onClose}></div>
            <div className="text-to-image-generator">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h3>Generate Puzzle Image</h3>
                <textarea
                    value={prompt}
                    onChange={(e) => {
                        setPrompt(e.target.value);
                        setHasTextError(false); // Clear the error when the user types
                    }}
                    placeholder="Describe your image..."
                    rows="3"
                    className={hasTextError ? "error-border" : ""} // Add error-border class dynamically
                />
                <div className="grid-size-buttons">
                    <p>Select Grid Size:</p>
                    {gridSizes.map((size) => (
                        <button
                            key={`${size.rows}x${size.columns}`}
                            onClick={() => setSelectedSize(size)}
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
                <button
                    className="generate-button"
                    onClick={handleGenerateImage}
                    disabled={isLoading} // Only disable when loading
                >
                    {isLoading ? "Generating..." : "Generate Image"}
                </button>
                <div className="helper-text">
                <p>
                    Our AI image generator might take upto five minutes to warm up the first time you use it.
                    Subsequent generations will be much faster. Thank you for your patience!
                </p>
                </div>
            </div>

        </div>


    );
};

TextToImageGenerator.propTypes = {
    onImageGenerated: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TextToImageGenerator;
