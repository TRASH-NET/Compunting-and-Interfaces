import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { PlayerSaved } from "@/Interfaces/player.interface";
import { formatDate } from "@/utils/formatDate";


interface RankingTableProps {
    players: PlayerSaved[];
}

const RankingTable: React.FC<RankingTableProps> = ({ players }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow >
                    <TableHead className="font-bold text-[#b81c64]">#</TableHead>
                    <TableHead className="font-bold text-[#b81c64]">Nick Name</TableHead>
                    <TableHead className="font-bold text-[#b81c64]">Score</TableHead>
                    <TableHead className="font-bold text-[#b81c64]">Ultimo jugado</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {players.map((player) => (
                    <TableRow key={player.playerId}>

                        <TableCell>
                            {player.rank === 1 ? '🥇' : player.rank === 2 ? '🥈' : player.rank === 3 ? '🥉' : player.rank}
                        </TableCell>
                        <TableCell>{player.playerName}</TableCell>
                        <TableCell>{player.score}</TableCell>
                        <TableCell>{formatDate(player.lastPlayed)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RankingTable;