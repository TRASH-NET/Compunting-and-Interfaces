import { Board } from "@/models/Game2048";
import UserForm from "./UserForm";

interface HeaderProps {
    board: Board | null;
    isPlaying: boolean;
    gameEnded: boolean;
    resetGame: () => void;
    startGame: () => void;
}

const Header: React.FC<HeaderProps> = ({ board, isPlaying, gameEnded, resetGame, startGame }) => {

    return (
        <div className="flex flex-col px-4 mb-4">
            <div className="flex items-center justify-between gap-9 w-[450px]">
                <h1 className="text-[80px] font-bold">2048</h1>
                <div className="px-8 py-3 rounded-md bg-[#b81c64]">
                    <p className="text-center text-white font-bold">SCORE <span className="block">{board?.score ? board.score : 0}</span></p>
                </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <UserForm
                    board={board}
                    isPlaying={isPlaying}
                    gameEnded={gameEnded}
                    resetGame={resetGame}
                    startGame={startGame}
                />

            </div>
        </div >
    )
}

export default Header;