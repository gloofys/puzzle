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
                <h2>Game Instructions</h2>
                <p>1. Select a grid size and an image from the <strong>New Game</strong> menu or use the AI generator to
                    create a custom puzzle image.</p>
                <p>2. Drag and drop puzzle pieces into their correct positions on the board.</p>
                <p>
                    3. <strong>Pay attention to the opacity of the puzzle pieces:</strong> the closer a piece is to its
                    correct position, the clearer it becomes.
                </p>
                <p>4. Pieces will snap into place when they are close to their correct position.</p>
                <p>
                    5. <strong>Try changing the background color:</strong> Use the colored circles in the header to
                    adjust the background color. This can make puzzle pieces easier to see and align correctly.
                </p>
                <p>6. <strong>Control game sounds:</strong> Use the Mute/Unmute button in the header to toggle sounds on
                    or off.</p>
                <p>6. Complete the puzzle to win the game!</p>
            </div>
        </div>
    );
};

InfoDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default InfoDialog;
