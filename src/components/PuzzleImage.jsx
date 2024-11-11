import { useEffect } from 'react';
import PropTypes from 'prop-types';
import puzzleImage from '/muhu.webp';
import '/src/assets/PuzzlePieces.css';

const PuzzleImage = ({ setPieces, setInitialPositions }) => {
    useEffect(() => {
        const image = new Image();
        image.src = puzzleImage;
        image.onload = () => {
            const rows = 4;
            const cols = 4;

            const gameBoardWidth = window.innerWidth; // Adjust based on actual GameBoard width if known
            const gameBoardHeight = window.innerHeight;

            // Scaling factor to resize coordinates from the image to GameBoard
            const scaleX = gameBoardWidth / image.width;
            const scaleY = gameBoardHeight / image.height;

            const pieceWidth = (image.width / cols) * scaleX;
            const pieceHeight = (image.height / rows) * scaleY;

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;

            const newPieces = [];
            const initialPositions = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    ctx.clearRect(0, 0, pieceWidth, pieceHeight);
                    ctx.drawImage(
                        image,
                        col * (image.width / cols),
                        row * (image.height / rows),
                        image.width / cols,
                        image.height / rows,
                        0,
                        0,
                        pieceWidth,
                        pieceHeight
                    );

                    const pieceSrc = canvas.toDataURL();
                    const correctX = col * pieceWidth;
                    const correctY = row * pieceHeight;

                    newPieces.push({
                        src: pieceSrc,
                        correctX,
                        correctY,
                    });

                    const initialX = Math.random() * (gameBoardWidth - pieceWidth);
                    const initialY = Math.random() * (gameBoardHeight - pieceHeight);
                    initialPositions.push({ x: initialX, y: initialY });

                    console.log(`Piece [${row}, ${col}] - Correct Position (scaled): X=${correctX}, Y=${correctY}`);
                }
            }

            setPieces(newPieces);
            setInitialPositions(initialPositions);
        };

        image.onerror = () => {
            console.error('Failed to load image. Please check the image path.');
        };
    }, [setPieces, setInitialPositions]);

    return null;
};

PuzzleImage.propTypes = {
    setPieces: PropTypes.func.isRequired,
    setInitialPositions: PropTypes.func.isRequired,
};

export default PuzzleImage;
