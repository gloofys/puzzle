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

            const gameBoardWidth = window.innerWidth; // Or get actual GameBoard width if possible
            const gameBoardHeight = window.innerHeight;

            // Define puzzle area as 80% of the GameBoard size
            const puzzleAreaWidth = gameBoardWidth * 0.8;
            const puzzleAreaHeight = gameBoardHeight * 0.8;

            // Calculate offset to center the puzzle area within GameBoard
            const offsetX = (gameBoardWidth - puzzleAreaWidth) / 2;
            const offsetY = (gameBoardHeight - puzzleAreaHeight) / 2;

            // Calculate scaling based on the puzzle area instead of the full GameBoard
            const scaleX = puzzleAreaWidth / image.width;
            const scaleY = puzzleAreaHeight / image.height;

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

                    // Calculate the correct position within the centered puzzle area
                    const correctX = offsetX + col * pieceWidth;
                    const correctY = offsetY + row * pieceHeight;

                    newPieces.push({
                        src: pieceSrc,
                        correctX,
                        correctY,
                    });

                    // Generate random initial positions for each piece
                    const initialX = Math.random() * (gameBoardWidth - pieceWidth);
                    const initialY = Math.random() * (gameBoardHeight - pieceHeight);
                    initialPositions.push({ x: initialX, y: initialY });

                    console.log(`Piece [${row}, ${col}] - Correct Position (centered): X=${correctX}, Y=${correctY}`);
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
