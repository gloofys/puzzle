import  { useEffect } from 'react';
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
    PuzzlePiece.propTypes = {
        piece: PropTypes.string.isRequired, // Adjust type as needed
        index: PropTypes.number.isRequired,
        position: PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
        }).isRequired,
    };

    // Log when the component re-renders and position changes
    useEffect(() => {
        console.log(`Re-rendering piece ${index} with position:`, position);
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

export default PuzzlePiece;
