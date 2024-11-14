
import PropTypes from 'prop-types';
import { useState } from 'react';
import '/src/assets/NewGameDialog.css';

const NewGameDialog = ({ onStartGame }) => {
    const [rows, setRows] = useState(4);
    const [columns, setColumns] = useState(4);

    const handleStartGame = () => {
        onStartGame({ rows, columns });
    };

    return (
        <div className="new-game-dialog">
            <h3>New Game Settings</h3>
            <label>
                Rows:
                <input
                    type="number"
                    min="2"
                    max="10"
                    value={rows}
                    onChange={(e) => setRows(Number(e.target.value))}
                />
            </label>
            <label>
                Columns:
                <input
                    type="number"
                    min="2"
                    max="10"
                    value={columns}
                    onChange={(e) => setColumns(Number(e.target.value))}
                />
            </label>
            <button onClick={handleStartGame}>Start Game</button>
        </div>
    );
};

NewGameDialog.propTypes = {
    onStartGame: PropTypes.func.isRequired,
};

export default NewGameDialog;
