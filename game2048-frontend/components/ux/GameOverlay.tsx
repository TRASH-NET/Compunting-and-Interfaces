'use client'
import TryAgainLogo from '@/public/try-again.gif'
import Image from 'next/image'
import { useEffect } from 'react';

interface GameOverlayProps {
    board: {
        hasWon: () => boolean;
        hasLost: () => boolean;
    };
    resetGame: () => void;
    setGameEnded: (gameEnded: boolean) => void;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ board, resetGame, setGameEnded }) => {

    useEffect(() => {
        if (board.hasWon() || board.hasLost()) {
            setGameEnded(true);
        }
    }, [board, setGameEnded]);

    if (board.hasWon()) {
        return (
            <div className='tile2048'></div>
        )
    } else if (board.hasLost()) {
        return (
            <div className='gameOver'>
                <Image
                    src={TryAgainLogo}
                    alt="Try again logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        cursor: 'pointer'
                    }}
                    onClick={resetGame}
                    unoptimized={true}
                />
            </div>
        )
    }

    return null;
}

export default GameOverlay