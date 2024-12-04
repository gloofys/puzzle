import PropTypes from 'prop-types';
import BackgroundColorSelector from './BackgroundColorSelector';
import InfoDialog from './InfoDialog'; // Import the InfoDialog component
import { useState } from 'react';
import '/src/assets/Header.css';

const Header = ({ bgColor, setBgColor, onOpenNewGame, onOpenImageGenerator }) => {
    const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false); // State for managing the Info dialog

    return (
        <header className="header">
            <h1>Opacity Puzzle</h1>
            <BackgroundColorSelector bgColor={bgColor} onChange={setBgColor} />
            <button onClick={onOpenNewGame}>New Game</button>
            <button onClick={onOpenImageGenerator}>Generate AI Image</button>
            <button onClick={() => setIsInfoDialogOpen(true)}>Info</button>

            {/* Show the InfoDialog when isInfoDialogOpen is true */}
            {isInfoDialogOpen && <InfoDialog onClose={() => setIsInfoDialogOpen(false)} />}
        </header>
    );
};

Header.propTypes = {
    bgColor: PropTypes.string.isRequired,
    setBgColor: PropTypes.func.isRequired,
    onOpenNewGame: PropTypes.func.isRequired,
    onOpenImageGenerator: PropTypes.func.isRequired,
    onImageGenerated: PropTypes.func.isRequired,
};

export default Header;
