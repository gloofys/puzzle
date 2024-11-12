import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard.jsx';

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <header className="header">
                    <h1>Puzzle Game</h1>
                </header>
                <main className="game-wrapper">
                    <div className="game-board-wrapper">
                        <GameBoard />
                    </div>
                </main>
            </div>
        </DndProvider>
    );
}

export default App;
