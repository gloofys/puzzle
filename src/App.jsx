import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard';
import Header from './components/Header';
import NewGameDialog from './components/NewGameDialog';
import TextToImageGenerator from './components/TextToImageGenerator';
import { useState } from 'react';

function App() {
    const [bgColor, setBgColor] = useState('#f0f0f0');
    const [rows, setRows] = useState(4);
    const [columns, setColumns] = useState(4);
    const [image, setImage] = useState('/est_forest_vary.png'); // Default image
    const [isNewGameDialogOpen, setIsNewGameDialogOpen] = useState(false);
    const [isImageGeneratorOpen, setIsImageGeneratorOpen] = useState(false);
    const [gameId, setGameId] = useState(0); // Unique identifier for each game
    const [isMuted, setIsMuted] = useState(false);

    // Toggle mute/unmute state
    const toggleMute = () => {
        setIsMuted((prev) => !prev);
        console.log('isMuted in App:', isMuted);
    };

    // Start a new game
    const handleNewGame = ({ rows, columns, image = '/est_forest_vary.png' }) => {
        setRows(rows);
        setColumns(columns);
        setImage(image);
        setGameId((prevGameId) => prevGameId + 1); // Ensure unique GameBoard re-render
        setIsNewGameDialogOpen(false);
    };

    // Handle AI-generated image
    const handleGeneratedImage = (generatedImage, gridSize) => {
        setImage(generatedImage);
        setRows(gridSize.rows);
        setColumns(gridSize.columns);
        setGameId((prevGameId) => prevGameId + 1); // Restart the game with new image and grid
        setIsImageGeneratorOpen(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <Header
                    bgColor={bgColor}
                    setBgColor={setBgColor}
                    onOpenNewGame={() => {
                        setIsNewGameDialogOpen(true);
                        setIsImageGeneratorOpen(false); // Ensure the AI generator is closed
                    }}
                    onOpenImageGenerator={() => {
                        setIsNewGameDialogOpen(false); // Ensure the New Game dialog is closed
                        setIsImageGeneratorOpen(true);
                    }}
                    onImageGenerated={handleGeneratedImage}
                    onToggleMute={toggleMute}
                    isMuted={isMuted}
                />
                <main className="game-wrapper">
                    <GameBoard
                        key={gameId} // Force re-render with unique game ID
                        bgColor={bgColor}
                        rows={rows}
                        columns={columns}
                        image={image}
                        isMuted={isMuted}
                    />
                </main>

                {isNewGameDialogOpen && (
                    <NewGameDialog
                        onStartGame={handleNewGame}
                        onClose={() => setIsNewGameDialogOpen(false)} // Close dialog when "X" is clicked
                    />
                )}

                {isImageGeneratorOpen && (
                    <TextToImageGenerator
                        onImageGenerated={handleGeneratedImage}
                        onClose={() => setIsImageGeneratorOpen(false)} // Close Image Generator
                    />
                )}
            </div>
        </DndProvider>
    );
}

export default App;
