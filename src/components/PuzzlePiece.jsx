import {useDrag} from 'react-dnd';
import PropTypes from 'prop-types';
import React from "react";

const PuzzlePiece = ({piece, index, position = {x: 0, y: 0}, isLocked, zIndex, isPuzzleComplete}) => {
    const [{isDragging}, drag] = useDrag(() => ({
        type: 'puzzle-piece',
        item: {index},
        canDrag: !isLocked,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));


    const distance = Math.sqrt(
        Math.pow(position.x - piece.correctX, 2) + Math.pow(position.y - piece.correctY, 2)
    );
    const calculatedOpacity = Math.max(0.25, 1 - distance / 900);

    return (
        <img
            ref={isLocked ? null : drag}
            src={piece.src}
            alt={`Puzzle piece ${index}`}
            className="puzzle-piece"
            style={{
                opacity: isLocked ? 1 : isDragging ? 0.5 : calculatedOpacity,
                cursor: isLocked ? 'default' : 'grab',
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
                zIndex: isLocked ? 1 : zIndex, // Locked pieces remain at baseline, unlocked adjust dynamically
                border: isLocked && isPuzzleComplete ? 'none' : '1px solid #ccc',
            }}
        />
    );
};

PuzzlePiece.propTypes = {
    piece: PropTypes.shape({
        src: PropTypes.string.isRequired,
        correctX: PropTypes.number.isRequired,
        correctY: PropTypes.number.isRequired,
    }).isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
    isLocked: PropTypes.bool.isRequired,
    zIndex: PropTypes.number.isRequired,
    isPuzzleComplete: PropTypes.bool.isRequired,
};

export default React.memo(
    PuzzlePiece,
    (prev, next) =>
        prev.position.x === next.position.x &&
        prev.position.y === next.position.y &&
        prev.isLocked === next.isLocked &&
        prev.zIndex === next.zIndex &&
        prev.isPuzzleComplete === next.isPuzzleComplete
);
