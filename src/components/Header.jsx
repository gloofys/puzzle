import PropTypes from 'prop-types';
import BackgroundColorSelector from './BackgroundColorSelector';
import InfoDialog from './InfoDialog'; // Import the InfoDialog component
import { useState } from 'react';
import '/src/assets/Header.css';

const Header = ({ bgColor, setBgColor, onOpenNewGame, onOpenImageGenerator, onToggleMute, isMuted }) => {
    // Set the initial state to true
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(true);

    return (
        <header className="header">
            <div className="header-section title">
                <h1>Opacity Puzzle</h1>
            </div>

            <div className="header-section color-selector">
                <BackgroundColorSelector bgColor={bgColor} onChange={setBgColor}/>
            </div>

            <div className="header-section buttons">
                <button onClick={onOpenNewGame}>New Game</button>
                <button onClick={onOpenImageGenerator}>Generate AI Image</button>
                <button
                    className="info-icon-button"
                    onClick={() => setIsInfoDialogOpen(true)}
                    aria-label="Game Instructions"
                >
                    <i className="fas fa-info-circle"></i>
                </button>
                <button className="mute" onClick={onToggleMute} aria-label={isMuted ? 'Unmute' : 'Mute'}>
                    <i className={`${isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'} fa-fw`}></i>
                </button>
            </div>

            {isInfoDialogOpen && <InfoDialog onClose={() => setIsInfoDialogOpen(false)}/>}
        </header>
    );
};

Header.propTypes = {
    bgColor: PropTypes.string.isRequired,
    setBgColor: PropTypes.func.isRequired,
    onOpenNewGame: PropTypes.func.isRequired,
    onOpenImageGenerator: PropTypes.func.isRequired,
    onImageGenerated: PropTypes.func.isRequired,
    onToggleMute: PropTypes.func.isRequired,
    isMuted: PropTypes.bool.isRequired,
};

export default Header;
