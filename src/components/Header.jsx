import PropTypes from 'prop-types';
import BackgroundColorSelector from './BackgroundColorSelector';
import '/src/assets/Header.css';
import {useState} from "react";
import TextToImageGenerator from "./TextToImageGenerator.jsx";

const Header = ({ bgColor, setBgColor, onOpenNewGame, onImageGenerated }) => {
    const [isImageGeneratorOpen, setImageGeneratorOpen] = useState(false);
    return (
        <header className="header">
            <h1>Opacity Puzzle</h1>
            <BackgroundColorSelector bgColor={bgColor} onChange={setBgColor}/>
            <button onClick={onOpenNewGame}>New Game</button>
            <button onClick={() => setImageGeneratorOpen((prev) => !prev)}>
                {isImageGeneratorOpen ? "Close AI Generator" : "Generate AI Image"}
            </button>
            {isImageGeneratorOpen && (
                <TextToImageGenerator onImageGenerated={onImageGenerated} />
            )}
        </header>
    );
};

Header.propTypes = {
    bgColor: PropTypes.string.isRequired,
    setBgColor: PropTypes.func.isRequired, // Update prop to `setBgColor`
    onOpenNewGame: PropTypes.func.isRequired,
    onImageGenerated: PropTypes.func.isRequired,
};

export default Header;
