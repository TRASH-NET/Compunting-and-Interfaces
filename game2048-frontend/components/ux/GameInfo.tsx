import { IMatchHistory } from "@/Interfaces";
import { Button } from "../ui/button"
import TableDataView from "./TableDataView";

interface PlayerStatsProps {
    matchHistory: IMatchHistory[];
}

const PlayerStats: React.FC<PlayerStatsProps> = async ({ matchHistory }) => {


    return (
        <>
            <div className='flex justify-evenly w-full'>
                <Button>Ranking</Button>
                <Button>Mis partidas</Button>
            </div>
            <h2 className='font-bold text-center my-4 text-xl'>Ranking</h2>
            <TableDataView
                fetchPlayers={fetchPlayers}
            />
            {
                matchHistory.map((match) => {
                    return (
                        <div key={match.id}>
                            <p>Match</p>
                        </div>
                    )
                })
            }
        </>
    )
}

export default PlayerStats