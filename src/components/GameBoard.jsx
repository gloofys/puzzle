import { useState, useEffect, useRef } from 'react';
import { useDrop } from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';
import successSound from '/src/assets/sounds/success.mp3';
import completedSound from '/src/assets/sounds/completed.mp3';

const SNAP_TOLERANCE = 120;

// eslint-disable-next-line react/prop-types
const GameBoard = ({ bgColor, rows, columns, image, isMuted }) => {
    const [positions, setPositions] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [lockedPositions, setLockedPositions] = useState([]);
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
    const [puzzleArea, setPuzzleArea] = useState(null);

    const piecesRef = useRef(pieces);
    const currentPlayingAudio = useRef(null);
    const isMutedRef = useRef(isMuted);

    const [zIndexes, setZIndexes] = useState({});
    const [zIndexCounter, setZIndexCounter] = useState(100);

    const stopAudio = () => {
        if (currentPlayingAudio.current) {
            currentPlayingAudio.current.pause();
            currentPlayingAudio.current.currentTime = 0;
            currentPlayingAudio.current = null;
        }
    };

    const playSound = (sound) => {
        if (isMutedRef.current) return;
        stopAudio();
        const audio = new Audio(sound);
        currentPlayingAudio.current = audio;
        audio.currentTime = 0;
        audio.play().catch((err) => console.error('Audio playback error:', err));
    };

    useEffect(() => {
        isMutedRef.current = isMuted;
        if (isMuted) {
            stopAudio();
        }
    }, [isMuted]);

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


                            if (newLocked.length === piecesRef.current.length) {
                                playSound(completedSound);
                            } else {
                                playSound(successSound);
                            }

                            return newLocked;
                        });

                        // Update z-index for all pieces, ensuring no piece remains stuck below
                        setZIndexes((prevZIndexes) => {
                            const newZIndexes = { ...prevZIndexes };

                            piecesRef.current.forEach((_, idx) => {
                                if (!newZIndexes[idx]) {
                                    newZIndexes[idx] = zIndexCounter + idx;
                                }
                            });

                            newZIndexes[item.index] = zIndexCounter;


                            setZIndexCounter((prevCounter) => prevCounter + 1);

                            return newZIndexes;
                        });
                    } else {
                        updatedPositions[item.index] = { x: offset.x, y: offset.y };
                    }

                    return updatedPositions;
                });
            }
        },
    }));

    return (
        <div className="game-board-wrapper" ref={drop} style={{ backgroundColor: bgColor}}>
            <PuzzleImage
                setPieces={setPieces}
                setInitialPositions={setPositions}
                setPuzzleArea={setPuzzleArea}
                rows={rows}
                columns={columns}
                image={image}
            />
            {puzzleArea && !isPuzzleComplete && (
                <div
                    className="puzzle-container-border"
                    style={{
                        "--offsetX": `${puzzleArea.offsetX}px`,
                        "--offsetY": `${puzzleArea.offsetY}px`,
                        "--puzzleWidth": `${puzzleArea.width}px`,
                        "--puzzleHeight": `${puzzleArea.height}px`,
                    }}
                />
            )}
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
