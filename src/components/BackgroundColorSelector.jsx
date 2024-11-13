
import PropTypes from 'prop-types';
import '/src/assets/BackgroundColorSelector.css';

const colors = [
    { colorCode: '#f0f0f0' },
    { colorCode: '#e3d48c' },
    { colorCode: '#acd4e8' },
    { colorCode: '#89c889' },
    { colorCode: '#ecb6bf' },
    { colorCode: '#FFFFFF' },
    { colorCode: '#000000' },
];

const BackgroundColorSelector = ({ bgColor, onChange }) => {
    return (
        <div className="color-selector">
            <label></label>
            <div className="color-options">
                {colors.map((color) => (
                    <div
                        key={color.colorCode}
                        onClick={() => onChange(color.colorCode)}
                        className={`color-swatch ${bgColor === color.colorCode ? 'selected' : ''}`}
                        style={{ backgroundColor: color.colorCode }}
                    />
                ))}
            </div>
        </div>
    );
};

BackgroundColorSelector.propTypes = {
    bgColor: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default BackgroundColorSelector;
