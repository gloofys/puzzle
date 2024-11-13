import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameBoard from './components/GameBoard.jsx';
import Header from './components/Header.jsx';
import {useState} from "react";

function App() {
    const [bgColor, setBgColor] = useState('#f0f0f0'); // Default background color

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app-container">
                <Header bgColor={bgColor} onChange={setBgColor} />
                <main className="game-wrapper">
                    <GameBoard bgColor={bgColor} />
                </main>
            </div>
        </DndProvider>
    );
}

export default App;
