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

    const handleNewGame = ({ rows, columns, image }) => {
        setRows(rows);
        setColumns(columns);
        setGameId((prevGameId) => prevGameId + 1); // Increment the gameId
        setImage(image);
        setIsDialogOpen(false);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <Header bgColor={bgColor} onChange={setBgColor} onOpenNewGame={() => setIsDialogOpen(true)}/>
                <main className="game-wrapper">
                    <GameBoard key={gameId} bgColor={bgColor} rows={rows} columns={columns} image={image}/>
                </main>

                {isDialogOpen && (
                    <NewGameDialog onStartGame={handleNewGame}/>
                )}
            </div>
        </DndProvider>
    );
}

export default App;
