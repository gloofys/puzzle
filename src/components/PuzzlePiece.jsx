// eslint-disable-next-line no-unused-vars
import React from 'react';
import '/src/assets/PuzzlePieces.css'

// eslint-disable-next-line react/prop-types
const PuzzlePiece =({color}) => {
    return (
        <div className="puzzle-piece"
        style={{backgroundColor: color }}>
</div>
    );
};

export default PuzzlePiece;