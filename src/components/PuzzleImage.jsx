import { useEffect } from 'react';
import PropTypes from 'prop-types';
import puzzleImage from '/muhu.webp';
import '/src/assets/PuzzlePieces.css';

const PuzzleImage = ({ setPieces, setInitialPositions }) => {
    useEffect(() => {
        const image = new Image();
        image.src = puzzleImage;
        image.onload = () => {
            console.log('Image loaded with dimensions:', image.width, image.height);

            const rows = 4;
            const cols = 4;
            const pieceWidth = image.width / cols;
            const pieceHeight = image.height / rows;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const newPieces = [];
            const initialPositions = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    canvas.width = pieceWidth;
                    canvas.height = pieceHeight;
                    ctx.clearRect(0, 0, pieceWidth, pieceHeight);

                    ctx.drawImage(
                        image,
                        col * pieceWidth,
                        row * pieceHeight,
                        pieceWidth,
                        pieceHeight,
                        0,
                        0,
                        pieceWidth,
                        pieceHeight
                    );

                    newPieces.push({
                        src: canvas.toDataURL(),
                        correctX: col * pieceWidth,
                        correctY: row * pieceHeight,
                    });

                    // Set initial random positions for the pieces
                    initialPositions.push({
                        x: Math.random() * (window.innerWidth - pieceWidth),
                        y: Math.random() * (window.innerHeight - pieceHeight)
                    });
                }
            }

            setPieces(newPieces);
            setInitialPositions(initialPositions);
            console.log('Initial positions set:', initialPositions);
        };

        image.onerror = () => {
            console.error('Failed to load image. Please check the image path.');
        };
    }, [setPieces, setInitialPositions]);

    return null; // No direct rendering; just setup logic
};

PuzzleImage.propTypes = {
    setPieces: PropTypes.func.isRequired,
    setInitialPositions: PropTypes.func.isRequired,
};

export default PuzzleImage;
