// eslint-disable-next-line no-unused-vars
import React from 'react';
import '/src/assets/GameBoard.css';
import PuzzleImage from "./PuzzleImage.jsx";
const GameBoard =()=> {
    return (
        <div className="game-board">
          <PuzzleImage/>
        </div>
    );
};
export default GameBoard;