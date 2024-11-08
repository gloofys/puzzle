import './App.css'
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
// eslint-disable-next-line no-unused-vars
import React from "react";
import GameBoard from "./components/GameBoard.jsx";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>

            <div>
                <GameBoard />
            </div>
        </DndProvider>
    );
}

export default App;
