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

    const toggleMute = () => {
        setIsMuted((prev) => !prev);
        console.log('isMuted in App:', isMuted);
    };

    const handleNewGame = ({ rows, columns, image = '/est_forest_vary.png' }) => {
        setRows(rows);
        setColumns(columns);
        setImage(image);
        setGameId((prevGameId) => prevGameId + 1); // Ensure unique GameBoard re-render
        setIsNewGameDialogOpen(false);
    };

    const handleGeneratedImage = (generatedImage, gridSize) => {
        setImage(generatedImage);
        setRows(gridSize.rows);
        setColumns(gridSize.columns);
        setGameId((prevGameId) => prevGameId + 1);
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
                        setIsImageGeneratorOpen(false);
                    }}
                    onOpenImageGenerator={() => {
                        setIsNewGameDialogOpen(false);
                        setIsImageGeneratorOpen(true);
                    }}
                    onImageGenerated={handleGeneratedImage}
                    onToggleMute={toggleMute}
                    isMuted={isMuted}
                />
                <main className="game-wrapper">
                    <GameBoard
                        key={gameId}
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
                        onClose={() => setIsNewGameDialogOpen(false)}
                    />
                )}

                {isImageGeneratorOpen && (
                    <TextToImageGenerator
                        onImageGenerated={handleGeneratedImage}
                        onClose={() => setIsImageGeneratorOpen(false)}
                    />
                )}
            </div>
        </DndProvider>
    );
}

export default App;
