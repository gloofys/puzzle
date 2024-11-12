import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

const PuzzlePiece = ({ piece, index, position = { x: 0, y: 0 }, isLocked }) => {
    const [, drag] = useDrag(() => ({
        type: 'puzzle-piece',
        item: { index },
        canDrag: !isLocked, // Disable dragging if the piece is locked
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        console.log(`PuzzlePiece ${index} received updated position:`, position);
        console.log(`PuzzlePiece ${index} isLocked:`, isLocked);
    }, [index, position, isLocked]);

    const distance = Math.sqrt(
        Math.pow(position.x - piece.correctX, 2) + Math.pow(position.y - piece.correctY, 2)
    );
    const opacity = isLocked ? 1 : Math.max(0.2, 1 - distance / 500);

    return (
        <img
            ref={isLocked ? null : drag}
            src={piece.src}
            alt={`Puzzle piece ${index}`}
            className="puzzle-piece"
            style={{
                opacity,
                cursor: isLocked ? 'default' : 'grab',
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
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
    isLocked: PropTypes.bool,
};

export default PuzzlePiece;
