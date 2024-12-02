import PropTypes from 'prop-types';
import BackgroundColorSelector from './BackgroundColorSelector';
import '/src/assets/Header.css';

const Header = ({ bgColor, setBgColor, onOpenNewGame, onOpenImageGenerator}) => {
    return (
        <header className="header">
            <h1>Opacity Puzzle</h1>
            <BackgroundColorSelector bgColor={bgColor} onChange={setBgColor} />
            <button onClick={onOpenNewGame}>New Game</button>
            <button onClick={onOpenImageGenerator}>Generate AI Image</button>
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
