// src/components/GameBoard.jsx
import {useState, useEffect, useRef, useMemo} from 'react';
import {useDrop} from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzlePiece from './PuzzlePiece.jsx';
import PuzzleImage from './PuzzleImage.jsx';
import successSound from '/src/assets/sounds/success.mp3';
import completedSound from '/src/assets/sounds/completed.mp3';

const SNAP_TOLERANCE = 120;

// eslint-disable-next-line react/prop-types
const GameBoard = ({bgColor, rows, columns, image, isMuted}) => {
    const [positions, setPositions] = useState([]);
    const [pieces, setPieces] = useState([]);
    const [lockedPositions, setLockedPositions] = useState([]);
    const [isPuzzleComplete, setIsPuzzleComplete] = useState(false);
    const [puzzleArea, setPuzzleArea] = useState(null);

    const piecesRef = useRef(pieces);
    const currentPlayingAudio = useRef(null);
    const isMutedRef = useRef(isMuted);

    const [zIndexes, setZIndexes] = useState({});

    const zIndexCounterRef = useRef(100);


    const successAudio = useMemo(() => {
        const a = new Audio(successSound);
        a.preload = 'auto';
        return a;
    }, []);
    const completedAudio = useMemo(() => {
        const a = new Audio(completedSound);
        a.preload = 'auto';
        return a;
    }, []);

    const stopAudio = () => {
        if (currentPlayingAudio.current) {
            currentPlayingAudio.current.pause();
            currentPlayingAudio.current.currentTime = 0;
            currentPlayingAudio.current = null;
        }
    };

    const playSound = (type) => {
        if (isMutedRef.current) return;
        if (currentPlayingAudio.current) {
            currentPlayingAudio.current.pause();
            currentPlayingAudio.current.currentTime = 0;
        }
        const audio = type === 'complete' ? completedAudio : successAudio;
        currentPlayingAudio.current = audio;
        audio.currentTime = 0;
        audio.play().catch(() => {
        });
    };

    useEffect(() => {
        isMutedRef.current = isMuted;
        if (isMuted) stopAudio();
    }, [isMuted]);

    useEffect(() => {
        setPositions([]);
        setLockedPositions([]);
        setIsPuzzleComplete(false);
        setZIndexes({});
        zIndexCounterRef.current = 100;
    }, [rows, columns]);

    useEffect(() => {
        piecesRef.current = pieces;
    }, [pieces]);

    useEffect(() => {
        if (
            lockedPositions.length > 0 &&
            lockedPositions.length === pieces.length
        ) {
            setIsPuzzleComplete(true);
        }
    }, [lockedPositions, pieces]);

    const [, drop] = useDrop(
        () => ({
            accept: 'puzzle-piece',
            drop: (item, monitor) => {
                const offset = monitor.getSourceClientOffset();
                if (offset && piecesRef.current[item.index]) {
                    setPositions((prev) => {
                        const updated = [...prev];
                        const correct = piecesRef.current[item.index];
                        const dx = Math.abs(offset.x - correct.correctX);
                        const dy = Math.abs(offset.y - correct.correctY);

                        if (dx <= SNAP_TOLERANCE && dy <= SNAP_TOLERANCE) {
                            updated[item.index] = {
                                x: correct.correctX,
                                y: correct.correctY,
                            };

                            setLockedPositions((prevLocked) => {
                                const newLocked = [...prevLocked, item.index];
                                playSound(
                                    newLocked.length === piecesRef.current.length
                                        ? 'complete'
                                        : 'success'
                                );
                                return newLocked;
                            });


                            setZIndexes((prevZ) => {
                                const nextZ = {...prevZ};
                                piecesRef.current.forEach((_, idx) => {
                                    if (nextZ[idx] == null) {
                                        nextZ[idx] = zIndexCounterRef.current + idx;
                                    }
                                });
                                nextZ[item.index] = zIndexCounterRef.current;
                                zIndexCounterRef.current += 1;
                                return nextZ;
                            });
                        } else {
                            updated[item.index] = {x: offset.x, y: offset.y};
                        }
                        return updated;
                    });
                }
            },
        }),
        [zIndexCounterRef]
    );

    return (
        <div
            className="game-board-wrapper"
            ref={drop}
            style={{backgroundColor: bgColor}}
        >
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
                        '--offsetX': `${puzzleArea.offsetX}px`,
                        '--offsetY': `${puzzleArea.offsetY}px`,
                        '--puzzleWidth': `${puzzleArea.width}px`,
                        '--puzzleHeight': `${puzzleArea.height}px`,
                    }}
                />
            )}
            {pieces.map((piece, idx) => (
                <PuzzlePiece
                    key={idx}
                    piece={piece}
                    index={idx}
                    position={positions[idx] || {x: 0, y: 0}}
                    isLocked={lockedPositions.includes(idx)}
                    zIndex={zIndexes[idx] || 1}
                    isPuzzleComplete={isPuzzleComplete}
                />
            ))}
        </div>
    );
};

export default GameBoard;
