import PropTypes from 'prop-types';
import '/src/assets/InfoDialog.css';

const InfoDialog = ({ onClose }) => {
    return (
        <div className="info-dialog">
            <div className="dialog-overlay" onClick={onClose}></div>
            <div className="dialog-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>
                <h2>How to Play the Puzzle Game</h2>
                <p>1. Select a grid size and an image from the New Game menu or use the AI generator to create a custom puzzle image.</p>
                <p>2. Drag and drop puzzle pieces into their correct positions on the board.</p>
                <p>3. Pieces will snap into place when they are close to their correct position.</p>
                <p>4. Complete the puzzle to win the game!</p>
            </div>
        </div>
    );
};

InfoDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default InfoDialog;
