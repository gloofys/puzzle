
import './App.css'
import MyComponent from "./components/myComponent.jsx";
import GameBoard from "./components/GameBoard.jsx";

function App() {
    return (
        <div>
            <h1>Welcome to my puzzle game</h1>
            <GameBoard />
            <MyComponent />
        </div>
    );
}
export default App;

