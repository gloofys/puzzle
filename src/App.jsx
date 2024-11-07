import './App.css'
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from "react-dnd-html5-backend";
// eslint-disable-next-line no-unused-vars
import React from "react";
import DragDropTest from "./components/DndTest.jsx";

function App() {
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <h1>React DnD Test</h1>
                <DragDropTest/>
            </div>
        </DndProvider>
    );
}

export default App;

