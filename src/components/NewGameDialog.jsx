import PropTypes from 'prop-types';
import { useState } from 'react';
import '/src/assets/NewGameDialog.css';

const NewGameDialog = ({ onStartGame, onClose }) => {
    const [selectedSize, setSelectedSize] = useState({ rows: 4, columns: 4 });
    const [selectedImage, setSelectedImage] = useState('/est_forest_vary.png');

    const availableImages = [
        { src: '/est_forest_vary.png', name: 'Forest' },
        { src: '/muhu.webp', name: 'Beach' },
        { src: '/hill.webp', name: 'Hillside' },
    ];

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

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const handleStartGame = () => {
        onStartGame({ rows: selectedSize.rows, columns: selectedSize.columns, image: selectedImage });
    };

    return (
        <div className="new-game-dialog-container">
            <div className="dialog-overlay" onClick={onClose}></div>
            <div className="new-game-dialog">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h3>New Game Settings</h3>
                <div className="grid-size-buttons">
                    <p>Select Grid Size:</p>
                    {gridSizes.map((size) => (
                        <button
                            key={`${size.rows}x${size.columns}`}
                            onClick={() => handleSizeClick(size)}
                            className={selectedSize.rows === size.rows && selectedSize.columns === size.columns ? 'selected' : ''}
                        >
                            {size.rows}x{size.columns}
                        </button>
                    ))}
                </div>
                <label>
                    Select Image:
                    <select
                        value={selectedImage}
                        onChange={(e) => setSelectedImage(e.target.value)}
                    >
                        {availableImages.map((img) => (
                            <option key={img.src} value={img.src}>
                                {img.name}
                            </option>
                        ))}
                    </select>
                </label>
                <button onClick={handleStartGame}>Start Game</button>
            </div>
        </div>
    );
};

NewGameDialog.propTypes = {
    onStartGame: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired, // Add the onClose prop
};

export default NewGameDialog;
