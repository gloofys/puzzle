import { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';
import successSound from '/src/assets/sounds/success.mp3';
import completedSound from '/src/assets/sounds/completed.mp3';

const SNAP_TOLERANCE = 70;

// eslint-disable-next-line react/prop-types
const GameBoard = ({ bgColor, rows, columns, image }) => {
    const [positions, setPositions] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [lockedPositions, setLockedPositions] = useState([]);
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
    const piecesRef = useRef(pieces);
    const [zIndexes, setZIndexes] = useState({});
    const [zIndexCounter, setZIndexCounter] = useState(100);

    // Initialize audio objects with useRef (persist across renders)
    const successAudioRef = useRef(null);
    const completionAudioRef = useRef(null);

    // Set up audio objects once when the component mounts
    useEffect(() => {
        successAudioRef.current = new Audio(successSound);
        completionAudioRef.current = new Audio(completedSound);

        return () => {
            // Clean up audio resources when the component unmounts
            successAudioRef.current = null;
            completionAudioRef.current = null;
        };
    }, []);

    const playSuccessSound = () => {
        const audio = successAudioRef.current;
        if (audio) {
            audio.currentTime = 0; // Reset to the start
            audio.play();
        }
    };

    const playCompletionSound = () => {
        const audio = completionAudioRef.current;
        if (audio) {
            audio.currentTime = 0; // Reset to the start
            audio.play();
        }
    };

    useEffect(() => {
        setPositions([]);
        setLockedPositions([]);
        setZIndexes({});
        setZIndexCounter(100);
        // Do not reset pieces here, as PuzzleImage will set them
    }, [rows, columns]);


    useEffect(() => {
        piecesRef.current = pieces;
    }, [pieces]);

    useEffect(() => {
        if (lockedPositions.length > 0 && lockedPositions.length === pieces.length) {
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
                        // Snap to correct position
                        updatedPositions[item.index] = {
                            x: correctPosition.correctX,
                            y: correctPosition.correctY,
                        };
                        setLockedPositions((prevLocked) => {
                            const newLocked = [...prevLocked, item.index];

                            // Check if this is the last piece
                            console.log('Locked positions:', newLocked.length, 'Total pieces:', piecesRef.current.length);
                            if (newLocked.length === piecesRef.current.length) {
                                playCompletionSound(); // Play completion sound for the last piece
                            } else {
                                playSuccessSound(); // Play success sound for other pieces
                            }

                            return newLocked;
                        });
                    } else {
                        // Update to the dropped position
                        updatedPositions[item.index] = { x: offset.x, y: offset.y };
                    }

                    return updatedPositions;
                });

                // Update z-index for all pieces, ensuring no piece remains stuck below
                setZIndexes((prevZIndexes) => {
                    const newZIndexes = { ...prevZIndexes };

                    // Ensure all pieces have a baseline z-index
                    piecesRef.current.forEach((_, idx) => {
                        if (!newZIndexes[idx]) {
                            newZIndexes[idx] = zIndexCounter + idx;
                        }
                    });

                    // Set the moved piece to the highest z-index
                    newZIndexes[item.index] = zIndexCounter;

                    // Increment zIndexCounter for the next interaction
                    setZIndexCounter((prevCounter) => prevCounter + 1);

                    return newZIndexes;
                });
            }
        },
    }));

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
