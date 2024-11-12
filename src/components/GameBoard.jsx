import { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';

const SNAP_TOLERANCE = 100;

const GameBoard = () => {
    const [positions, setPositions] = useState([]);
    const [pieces, setPieces] = useState([]);
    const piecesRef = useRef(pieces);
    const [lockedPositions, setLockedPositions] = useState([]);

    useEffect(() => {
        piecesRef.current = pieces;
    }, [pieces]);

    const [, drop] = useDrop(() => ({
        accept: 'puzzle-piece',
        drop: (item, monitor) => {
            const offset = monitor.getSourceClientOffset();
            if (offset && piecesRef.current[item.index]) {
                setPositions((prevPositions) => {
                    const updatedPositions = [...prevPositions];
                    const correctPosition = piecesRef.current[item.index];

                    const distanceX = Math.abs(offset.x - correctPosition.correctX);
                    const distanceY = Math.abs(offset.y - correctPosition.correctY);

                    if (distanceX <= SNAP_TOLERANCE && distanceY <= SNAP_TOLERANCE) {
                        updatedPositions[item.index] = {
                            x: correctPosition.correctX,
                            y: correctPosition.correctY,
                        };
                        setLockedPositions((prevLocked) =>
                            prevLocked.includes(item.index) ? prevLocked : [...prevLocked, item.index]
                        );
                    } else {
                        updatedPositions[item.index] = { x: offset.x, y: offset.y };
                    }
                    return updatedPositions;
                });
            }
        },
    }));

    useEffect(() => {
        console.log('Positions state in GameBoard:', positions);
        console.log('Locked Positions:', lockedPositions);
    }, [positions, lockedPositions]);

    return (
        <div className="game-board-wrapper" ref={drop}>
            <PuzzleImage setPieces={setPieces} setInitialPositions={setPositions} />
            {pieces.map((piece, index) => (
                <PuzzlePiece
                    key={index}
                    piece={piece}
                    index={index}
                    position={positions[index] || { x: 0, y: 0 }}
                    isLocked={lockedPositions.includes(index)}
                />
            ))}
        </div>
    );
};

export default GameBoard;
