import { useEffect } from 'react';
import PropTypes from 'prop-types';
import puzzleImage from '/est_forest_vary.png';
import '/src/assets/PuzzlePieces.css';

const PuzzleImage = ({ setPieces, setInitialPositions, rows, columns }) => {
    useEffect(() => {
        const image = new Image();
        image.src = puzzleImage;
        image.onload = () => {
            const gameBoardWidth = window.innerWidth;
            const gameBoardHeight = window.innerHeight;

            // Define puzzle area as 80% of the GameBoard size
            const puzzleAreaWidth = gameBoardWidth * 0.7;
            const puzzleAreaHeight = gameBoardHeight * 0.7;

            // Calculate offset to center the puzzle area within GameBoard
            const offsetX = (gameBoardWidth - puzzleAreaWidth) / 2;
            const offsetY = (gameBoardHeight - puzzleAreaHeight) / 2;

            // Calculate scaling based on the puzzle area instead of the full GameBoard
            const scaleX = puzzleAreaWidth / image.width;
            const scaleY = puzzleAreaHeight / image.height;

            const pieceWidth = Math.ceil((image.width / columns) * scaleX);
            const pieceHeight = Math.ceil((image.height / rows) * scaleY);


            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;

            const newPieces = [];
            const initialPositions = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < columns; col++) {
                    ctx.clearRect(0, 0, pieceWidth, pieceHeight);
                    ctx.drawImage(
                        image,
                        col * (image.width / columns),
                        row * (image.height / rows),
                        image.width / columns,
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
    }, [setPieces, setInitialPositions, rows, columns]); // Add rows and columns as dependencies

    return null;
};

PuzzleImage.propTypes = {
    setPieces: PropTypes.func.isRequired,
    setInitialPositions: PropTypes.func.isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
};

export default PuzzleImage;
