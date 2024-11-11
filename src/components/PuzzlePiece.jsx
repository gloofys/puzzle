import { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

const PuzzlePiece = ({ piece, index, position = { x: 0, y: 0 } }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'puzzle-piece',
        item: { index },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    useEffect(() => {
        console.log(`PuzzlePiece ${index} received updated position:`, position);
    }, [index, position]);

    // Calculate the distance between current position and correct position
    const distance = Math.sqrt(
        Math.pow(position.x - piece.correctX, 2) + Math.pow(position.y - piece.correctY, 2)
    );
    const opacity = Math.max(0.1, 1 - distance / 500); // Adjust '300' to control sensitivity

    return (
        <img
            ref={drag}
            src={piece.src}
            alt={`Puzzle piece ${index}`}
            className="puzzle-piece"
            style={{
                opacity: isDragging ? 0.5 : opacity,
                cursor: 'grab',
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
};

export default PuzzlePiece;
