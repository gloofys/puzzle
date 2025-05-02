
import { render, screen } from '@testing-library/react';
import { DndProvider } from 'react-dnd';
import { TestBackend } from 'react-dnd-test-backend';
// Mock sound assets to avoid module resolution errors
jest.mock('/src/assets/sounds/success.mp3', () => '');
jest.mock('/src/assets/sounds/completed.mp3', () => '');
import GameBoard from '../components/GameBoard';

jest.mock('../components/PuzzleImage', () => {
    // eslint-disable-next-line no-undef
    const mockReact = require('react');
    return {
        __esModule: true,
        default: ({ setPieces, setInitialPositions, setPuzzleArea }) => {
            mockReact.useEffect(() => {
                setPuzzleArea({ offsetX: 10, offsetY: 20, width: 300, height: 200 });
                setPieces([{ src: 'piece1', correctX: 10, correctY: 20 }]);
                setInitialPositions([{ x: 0, y: 0 }]);
            }, [setPieces, setInitialPositions, setPuzzleArea]);
            return null;
        }
    };
});

describe('GameBoard component', () => {
    test('renders drop area and pieces', () => {
        const { container } = render(
            <DndProvider backend={TestBackend}>
                <GameBoard bgColor="#fff" rows={1} columns={1} image="img.png" isMuted={true} />
            </DndProvider>
        );

        const wrapper = container.querySelector('.game-board-wrapper');
        expect(wrapper).toBeInTheDocument();

        const img = screen.getByAltText('Puzzle piece 0');
        expect(img).toBeInTheDocument();
        expect(img).toHaveStyle({ position: 'absolute' });
    });
});