// eslint-disable-next-line no-unused-vars
import React from 'react';
import '/src/assets/GameBoard.css';
import PuzzlePiece from "./PuzzlePiece.jsx";
const GameBoard =()=> {
    const pieces = [
        'red', 'green', 'yellow', 'blue',
    ];
    return (
        <div className="game-board">
            {pieces.map((piece, index) => (
                <PuzzlePiece key={index} color={piece} />
            ))}
        </div>
    );
};
export default GameBoard;