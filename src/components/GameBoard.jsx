import  {useEffect, useState} from 'react';
import {useDrop} from 'react-dnd';
import '/src/assets/GameBoard.css';
import PuzzleImage from './PuzzleImage.jsx';
import PuzzlePiece from './PuzzlePiece.jsx';

const GameBoard = () => {
    const [pieces, setPieces] = useState([]);
    const [positions, setPositions] = useState(
        Array.from({ length: 16 }, () => ({ x: 0, y: 0 }))
    );

    // Set up the drop target using `useDrop`
    const [, drop] = useDrop(() => ({
        accept: 'puzzle-piece',
        drop: (item, monitor) => {
            console.log('Drop function called for item:', item);
            const offset = monitor.getClientOffset();
            if (offset) {
                const gameBoardRect = document.querySelector('.game-board').getBoundingClientRect();
                const x = offset.x - gameBoardRect.left;
                const y = offset.y - gameBoardRect.top;

                console.log('Updated Position:', { x, y });
                console.log('Item Index:', item.index);

                setPositions((prevPositions) => {
                    const updatedPositions = [...prevPositions]; // Create a new array
                    updatedPositions[item.index] = { x, y }; // Update position
                    return updatedPositions;
                });

            }
        },
    }));


    useEffect(() => {
        console.log('Updated positions state in GameBoard:', positions);
    }, [positions]);

    return (
        <div className="game-board" ref={drop}>
            <PuzzleImage setPieces={setPieces} positions={positions} />
            {pieces.map((piece, index) => {
                console.log(`Passing position to PuzzlePiece ${index}:`, positions[index]);
                return (
                    <PuzzlePiece
                        key={index}
                        piece={piece.src}
                        index={index}
                        position={positions[index]}
                    />
                );
            })}
        </div>
    );
};

export default GameBoard;
