import React, {useEffect} from 'react';
import puzzleImage from '/muhu.webp';
import '/src/assets/PuzzlePieces.css';

const PuzzleImage = () => {
    const [pieces, setPieces] = React.useState([]);

useEffect(() => {
    const image= new Image();
    image.src = puzzleImage;
    image.onload = () => {
        const rows = 4;
        const cols = 4;
        const pieceWidth =image.width/cols;
        const pieceHeight = image.height/rows;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const newPieces = [];

        for(let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                canvas.width = pieceWidth;
                canvas.height = pieceHeight;
                ctx.drawImage(
                    image,
                    col*pieceWidth,
                    row*pieceHeight,
                    pieceWidth,
                    pieceHeight,
                    0,
                    0,
                    pieceWidth,
                    pieceHeight,
                );
                newPieces.push(canvas.toDataURL());
            }
        }
        setPieces(newPieces);
    };
}, []);

return (
    <div className="puzzle-image">
        {pieces.map((piece, index) => (
            <img key={index} src={piece} alt={'Puzzle piece${index}'} className="puzzle-piece"/>
        ))}
    </div>
);
};

export default PuzzleImage;