'use client'
import React, { useState } from 'react'
import Header from './Header'
import BoardView from './BoardView'
import { Board } from '@/models/Game2048'

interface GameProps {
    sesion: string | null;
}


const Game: React.FC<GameProps> = ({ sesion }) => {

    const [board, setBoard] = useState<Board | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);

    const resetGame = () => {
        setBoard(null);
        setIsPlaying(false);
        setGameEnded(false);
    };

    const startGame = () => {
        setBoard(new Board());
        setIsPlaying(true);
        setGameEnded(false);
    }

    return (
        <>
            <Header
                board={board}
                isPlaying={isPlaying}
                gameEnded={gameEnded}
                resetGame={resetGame}
                startGame={startGame}
                sesion={sesion}
            />
            {board && (
                <BoardView
                    board={board}
                    setBoard={setBoard}
                    resetGame={resetGame}
                    setGameEnded={setGameEnded}
                />
            )}
        </>
    );
}

export default Game