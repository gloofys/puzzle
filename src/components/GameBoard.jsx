import { useState, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzleImage from './PuzzleImage.jsx';
import PuzzlePiece from './PuzzlePiece.jsx';

const GameBoard = () => {
    const [pieces, setPieces] = useState([]);
    const [positions, setPositions] = useState(
        Array(16).fill({ x: 0, y: 0 }) // Initialize positions for 16 pieces
    );

    // Set up the drop target using `useDrop`
    const [, drop] = useDrop(() => ({
        accept: 'puzzle-piece',
        drop: (item, monitor) => {
            const offset = monitor.getClientOffset();
            if (offset) {
                const gameBoardRect = document
                    .querySelector('.game-board')
                    .getBoundingClientRect();

                const x = offset.x - gameBoardRect.left;
                const y = offset.y - gameBoardRect.top;

                console.log('Updated Position:', { x, y });
                console.log('Item Index:', item.index);

                // Update the positions state immutably
                setPositions((prevPositions) => {
                    const updatedPositions = prevPositions.map((pos, idx) =>
                        idx === item.index ? { x, y } : pos
                    );
                    console.log('Updated Positions Array:', updatedPositions);
                    return updatedPositions;
                });
            }
        },
    }));

    useEffect(() => {
        console.log('Positions State after update:', positions);
    }, [positions]);

    return (
        <div className="game-board" ref={drop}>
            <PuzzleImage setPieces={setPieces} />
            {pieces.map((piece, index) => (
                <PuzzlePiece
                    key={index}
                    piece={piece.src}
                    index={index}
                    position={positions[index]} // Pass the position to each piece
                />
            ))}
        </div>
    );
};

export default GameBoard;
