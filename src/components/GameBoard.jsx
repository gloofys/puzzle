import { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';

const SNAP_TOLERANCE = 50;

// eslint-disable-next-line react/prop-types
const GameBoard = ({ bgColor, rows, columns,  image }) => {
    const [positions, setPositions] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [lockedPositions, setLockedPositions] = useState([]);
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
    const piecesRef = useRef(pieces);
    const [zIndexes, setZIndexes] = useState({});
    const [zIndexCounter, setZIndexCounter] = useState(100);

    // Reset the puzzle state when rows and columns change (new game)
    useEffect(() => {
        setPositions([]);
        setLockedPositions([]);
        setIsPuzzleComplete(false);
        setZIndexes({});
        setZIndexCounter(100);
    }, [rows, columns]);

    useEffect(() => {
        piecesRef.current = pieces;
    }, [pieces]);

    useEffect(() => {
        if (lockedPositions.length === pieces.length) {
            setIsPuzzleComplete(true);
        }
    }, [lockedPositions, pieces]);

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
                        setLockedPositions((prevLocked) => [...prevLocked, item.index]);
                    } else {
                        updatedPositions[item.index] = { x: offset.x, y: offset.y };
                    }

                    // Update zIndex for the moved piece
                    setZIndexes((prevZIndexes) => ({
                        ...prevZIndexes,
                        [item.index]: zIndexCounter,
                    }));
                    setZIndexCounter((prevCounter) => prevCounter + 1);

                    return updatedPositions;
                });
            }
        },
    }));

    useEffect(() => {
        console.log('Positions state in GameBoard:', positions);
    }, [positions]);

    return (
        <div className="game-board-wrapper" ref={drop} style={{ backgroundColor: bgColor }}>
            <PuzzleImage setPieces={setPieces} setInitialPositions={setPositions} rows={rows} columns={columns} image={image} />
            {pieces.map((piece, index) => (
                <PuzzlePiece
                    key={index}
                    piece={piece}
                    index={index}
                    position={positions[index] || { x: 0, y: 0 }}
                    isLocked={lockedPositions.includes(index)}
                    zIndex={zIndexes[index] || 1}
                    isPuzzleComplete={isPuzzleComplete}
                />
            ))}
        </div>
    );
};

export default GameBoard;
