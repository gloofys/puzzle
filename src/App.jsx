import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import NewGameDialog from './components/NewGameDialog';
import { useState } from 'react';

function App() {
    const [bgColor, setBgColor] = useState('#f0f0f0');
    const [rows, setRows] = useState(4);
    const [columns, setColumns] = useState(4);
    const [image, setImage] = useState('/est_forest_vary.png'); // Default image
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [gameId, setGameId] = useState(0); // Unique identifier for each game

    // Start a new game
    const handleNewGame = ({ rows, columns, image = '/est_forest_vary.png' }) => {
        setRows(rows);
        setColumns(columns);
        setImage(image);
        setGameId((prevGameId) => prevGameId + 1); // Ensure unique GameBoard re-render
        setIsDialogOpen(false);
    };

    // Handle AI-generated image
    const handleGeneratedImage = (generatedImage, gridsize) => {
        setImage(generatedImage);
        setRows(gridsize.rows);
        setColumns(gridsize.columns);
        setGameId((prevGameId) => prevGameId + 1); // Restart the game with new image and grid
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <Header
                    bgColor={bgColor} onChange={setBgColor}
                    onOpenNewGame={() => setIsDialogOpen(true)}
                    onImageGenerated={handleGeneratedImage}
                    onGridSelected={(grid) => {
                        setRows(grid.rows);
                        setColumns(grid.columns);
                    }}
                 setBgColor={setBgColor}/>
                <main className="game-wrapper">
                    <GameBoard
                        key={gameId} // Force re-render with unique game ID
                        bgColor={bgColor}
                        rows={rows}
                        columns={columns}
                        image={image}
                    />
                </main>

                {isDialogOpen && (
                    <NewGameDialog
                        onStartGame={handleNewGame} // Directly use handleNewGame
                        onClose={() => setIsDialogOpen(false)} // Close dialog when "X" is clicked
                    />
                )}
            </div>
        </DndProvider>
    );
}

export default App;
