
import PropTypes from 'prop-types';
import BackgroundColorSelector from './BackgroundColorSelector';
import '/src/assets/Header.css'

const Header = ({ bgColor, onChange }) => {
    return (
        <header className="header">
            <h1>Opacity Puzzle</h1>
            <BackgroundColorSelector bgColor={bgColor} onChange={onChange} />
        </header>
    );
};

Header.propTypes = {
    bgColor: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Header;