
import './App.css'
import GameBoard from "./components/GameBoard.jsx";
import {DndProvider} from 'react-dnd';
import{HTML5Backend} from "react-dnd-html5-backend";
// eslint-disable-next-line no-unused-vars
import React from "react";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
        <div>
            <h1>Welcome to my puzzle game</h1>
            <GameBoard />
        </div>
        </DndProvider>
    );
}
export default App;

