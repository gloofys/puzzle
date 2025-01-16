
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {useState} from "react";

const DragAndDropTest = () => {
    const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 });

    const DraggableBox = () => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'box',
            item: { id: 'box1' },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div
                ref={drag}
                style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: isDragging ? 'lightgreen' : 'lightblue',
                    border: '1px solid black',
                    cursor: 'move',
                    position: 'absolute',
                    left: `${boxPosition.x}px`,
                    top: `${boxPosition.y}px`,
                }}
            >
                Drag Me!
            </div>
        );
    };

    // Drop zone logic
    const DropZone = () => {
        const [, drop] = useDrop(() => ({
            accept: 'box',
            drop: (item, monitor) => {
                const offset = monitor.getClientOffset();
                if (offset) {
                    setBoxPosition({ x: offset.x, y: offset.y });
                    console.log('Box dropped at:', offset);
                }
            },
        }));

        return (
            <div
                ref={drop}
                style={{
                    width: '300px',
                    height: '300px',
                    border: '2px dashed black',
                    marginTop: '20px',
                    position: 'relative',
                }}
            >
                Drop Here
            </div>
        );
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <h1>React DnD Test</h1>
            <DropZone />
            <DraggableBox />
        </DndProvider>
    );
};

export default DragAndDropTest;
