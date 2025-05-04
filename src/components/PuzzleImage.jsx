import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '/src/assets/PuzzlePieces.css';

const PuzzleImage = ({
                         setPieces,
                         setInitialPositions,
                         setPuzzleArea,
                         rows,
                         columns,
                         image,
                     }) => {
    useEffect(() => {

        const gameBoardWidth = window.innerWidth;
        const headerHeight =
            document.querySelector('.header')?.getBoundingClientRect().height || 0;
        const gameAreaHeight = window.innerHeight - headerHeight;

        const puzzleAreaWidth = gameBoardWidth * 0.6;
        const puzzleAreaHeight = (window.innerHeight) * 0.6;

        const offsetX = (gameBoardWidth - puzzleAreaWidth) / 2;
        const offsetY = headerHeight + (gameAreaHeight - puzzleAreaHeight) / 2;

        setPuzzleArea({
            offsetX,
            offsetY,
            width: puzzleAreaWidth,
            height: puzzleAreaHeight,
        });

        const img = new Image();
        img.src = image;
        img.onload = () => {
            const scaleX = puzzleAreaWidth / img.width;
            const scaleY = puzzleAreaHeight / img.height;
            const pieceWidth = Math.ceil((img.width / columns) * scaleX);
            const pieceHeight = Math.ceil((img.height / rows) * scaleY);

            document.documentElement.style.setProperty(
                '--pieceWidth',
                `${pieceWidth}px`
            );
            document.documentElement.style.setProperty(
                '--pieceHeight',
                `${pieceHeight}px`
            );

            const canvas = document.createElement('canvas');
            canvas.width = pieceWidth;
            canvas.height = pieceHeight;
            const ctx = canvas.getContext('2d');

            const newPieces = [];
            const initialPositions = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < columns; col++) {
                    ctx.clearRect(0, 0, pieceWidth, pieceHeight);
                    ctx.drawImage(
                        img,
                        col * (img.width / columns),
                        row * (img.height / rows),
                        img.width / columns,
                        img.height / rows,
                        0,
                        0,
                        pieceWidth,
                        pieceHeight
                    );
                    newPieces.push({
                        src: canvas.toDataURL(),
                        correctX: offsetX + col * pieceWidth,
                        correctY: offsetY + row * pieceHeight,
                    });

                    // random start
                    initialPositions.push({
                        x: Math.random() * (gameBoardWidth - pieceWidth),
                        y:
                            headerHeight +
                            Math.random() * (gameAreaHeight - pieceHeight),
                    });
                }
            }

            setPieces(newPieces);
            setInitialPositions(initialPositions);
        };

        img.onerror = () => {};
    }, [setPieces, setInitialPositions, setPuzzleArea, rows, columns, image]);

    return null;
};

PuzzleImage.propTypes = {
    setPieces: PropTypes.func.isRequired,
    setInitialPositions: PropTypes.func.isRequired,
    setPuzzleArea: PropTypes.func.isRequired,
    rows: PropTypes.number.isRequired,
    columns: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};

export default PuzzleImage;
