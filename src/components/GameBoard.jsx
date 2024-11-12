import { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';

const SNAP_TOLERANCE = 100; // Distance in pixels within which pieces snap into place

const GameBoard = () => {
    const [positions, setPositions] = useState([]);
    const [pieces, setPieces] = useState([]);
    const piecesRef = useRef(pieces);

    useEffect(() => {
        piecesRef.current = pieces;
    }, [pieces]);

    const [, drop] = useDrop(() => ({
        accept: 'puzzle-piece',
        drop: (item, monitor) => {
            console.log('Drop function called for item:', item);
            const offset = monitor.getSourceClientOffset();
            if (offset && piecesRef.current[item.index]) {
                setPositions((prevPositions) => {
                    const updatedPositions = [...prevPositions];
                    const correctPosition = piecesRef.current[item.index];

                    const distanceX = Math.abs(offset.x - correctPosition.correctX);
                    const distanceY = Math.abs(offset.y - correctPosition.correctY);

                    // Snap to the correct position if within the tolerance
                    if (distanceX <= SNAP_TOLERANCE && distanceY <= SNAP_TOLERANCE) {
                        updatedPositions[item.index] = {
                            x: correctPosition.correctX,
                            y: correctPosition.correctY,
                        };
                    } else {
                        updatedPositions[item.index] = { x: offset.x, y: offset.y };
                    }
                    return updatedPositions;
                });
            } else if (offset) {
                // Fallback if piecesRef.current[item.index] is undefined
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
        <div className="game-board-wrapper" ref={drop}>
            <PuzzleImage setPieces={setPieces} setInitialPositions={setPositions} />
            {pieces.map((piece, index) => (
                <PuzzlePiece
                    key={index}
                    piece={piece} // Pass the whole object, not just piece.src
                    index={index}
                    position={positions[index] || { x: 0, y: 0 }} // Fallback for initial render
                />
            ))}
        </div>
    );
};

export default GameBoard;
