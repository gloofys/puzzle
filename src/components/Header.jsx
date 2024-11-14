
import PropTypes from 'prop-types';
import BackgroundColorSelector from './BackgroundColorSelector';
import '/src/assets/Header.css';

const Header = ({ bgColor, onChange, onOpenNewGame }) => {
    return (
        <header className="header">
            <h1>Opacity Puzzle</h1>
            <BackgroundColorSelector bgColor={bgColor} onChange={onChange} />
            <button onClick={onOpenNewGame}>New Game</button>
        </header>
    );
};

Header.propTypes = {
    bgColor: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onOpenNewGame: PropTypes.func.isRequired, // Prop for opening the new game dialog
};

export default Header;
