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

    return (
        <img
            ref={drag}
            src={piece}
            alt={`Puzzle piece ${index}`}
            className="puzzle-piece"
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'grab',
                position: 'absolute',
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        />
    );
};

PuzzlePiece.propTypes = {
    piece: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
    }).isRequired,
};

export default PuzzlePiece;
