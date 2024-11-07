import { useEffect, useState } from 'react';
import puzzleImage from '/muhu.webp';
import '/src/assets/PuzzlePieces.css';
import PuzzlePiece from './PuzzlePiece.jsx'; // Import PuzzlePiece

const PuzzleImage = () => {
    const [pieces, setPieces] = useState([]);
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        const image = new Image();
        image.src = puzzleImage;
        image.onload = () => {
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
                    ctx.clearRect(0, 0, pieceWidth, pieceHeight); // Clear canvas before drawing
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
                        correctX: col * pieceWidth, // Save the correct X position
                        correctY: row * pieceHeight, // Save the correct Y position
                    });

                    // Set initial position to (0, 0) or wherever you want
                    initialPositions.push({ x: 0, y: 0 });
                }
            }

            setPieces(newPieces);
            setPositions(initialPositions);
            console.log('Initial positions set:', initialPositions); // Log initial state
        };
    }, []);

    return (
        <div className="puzzle-image">
            {pieces.map((piece, index) => (
                <PuzzlePiece
                    key={index}
                    piece={piece.src}
                    index={index}
                    position={positions[index]}
                />
            ))}
        </div>
    );
};

export default PuzzleImage;
