import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';

const GameBoard = () => {
    const [pieces, setPieces] = useState([]);
    const [positions, setPositions] = useState([]);

    const [, drop] = useDrop(() => ({
        accept: 'puzzle-piece',
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset(); // Get offset relative to the viewport
            if (offset) {
                // Update position based on viewport coordinates
                setPositions((prevPositions) => {
                    const updatedPositions = [...prevPositions];
                    updatedPositions[item.index] = { x: offset.x, y: offset.y };
                    return updatedPositions;
                });
            }
        },
    }));

    useEffect(() => {
        console.log('Positions state in GameBoard:', positions);
    }, [positions]);

    return (
        <div className="game-board" ref={drop}>
            <PuzzleImage setPieces={setPieces} setInitialPositions={setPositions} />
            {pieces.map((piece, index) => (
                <PuzzlePiece
                    key={index}
                    piece={piece.src}
                    index={index}
                    position={positions[index] || { x: 0, y: 0 }} // Fallback for initial render
                />
            ))}
        </div>
    );
};

export default GameBoard;
