'use client'
import { useEffect } from "react"
import Cell from "./Cell";
import Tile from "./Tile";
import '@/styles/main.scss'
import '@/styles/styles.scss'
import useEvent from "@/hooks/UseEvent";
import GameOverlay from "./GameOverlay";
import { Board } from "@/models/Game2048";

interface KeyDownEvent extends KeyboardEvent {
    keyCode: number;
}

interface TileType {
    value: number;
    mergedInto: boolean;
    row: number;
    column: number;
    isNew: () => boolean;
    hasMoved: () => boolean;
    fromRow: () => number;
    toRow: () => number;
    fromColumn: () => number;
    toColumn: () => number;
}

interface IBoard {
    cells: unknown[][];
    tiles: TileType[];
    hasWon: () => boolean;
    hasLost: () => boolean;
    move: (direction: number) => Board;
}

interface BoardViewProps {
    board: IBoard | null;
    setBoard: (board: Board) => void;
    resetGame: () => void;
    setGameEnded: (gameEnded: boolean) => void;
}

const BoardView = ({ board, setBoard, resetGame, setGameEnded }: BoardViewProps) => {



    const handleKeyDown = (event: KeyDownEvent) => {
        if (board?.hasWon()) {
            return;
        }
        if (event.keyCode >= 37 && event.keyCode <= 40) {
            const direction = event.keyCode - 37;
            const boardClone = Object.assign(Object.create(Object.getPrototypeOf(board)), board);
            const newBoard = boardClone.move(direction);
            setBoard(newBoard);
        }
    }

    useEvent('keydown', handleKeyDown);

    useEffect(() => {
        setBoard(new Board());
    }, [setBoard]);

    if (!board) {
        return <div>Loading...</div>;
    }

    const cells = board.cells.map((row, rowIndex) => {
        return (
            <div
                key={rowIndex}
            >
                {
                    row.map((col, colIndex) => {
                        return (
                            <Cell key={colIndex} />
                        )
                    })
                }
            </div>
        )
    });

    const tiles = board.tiles.filter((tile) => tile.value !== 0).map((tile, index) => {
        return (
            <Tile
                key={index}
                tile={tile}
            />
        )
    });


    return (
        <div className="ml-4">
            <div className="board">
                {cells}
                {tiles}
                <GameOverlay
                    board={board}
                    resetGame={resetGame}
                    setGameEnded={setGameEnded}
                />
            </div>
        </div>
    );
}

export default BoardView