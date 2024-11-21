import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { IMatchHistory, IRanking } from "@/Interfaces";
import { formatDate } from "@/utils/formatDate";


interface RankingTableProps {
    data: (IMatchHistory | IRanking)[];
    type: 'ranking' | 'history';
}

const RankingTable: React.FC<RankingTableProps> = ({ data, type }) => {

    {
        console.log(data)
    }
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="font-bold text-[#b81c64]">#</TableHead>
                    {
                        type === 'ranking' && (
                            <TableHead className="font-bold text-[#b81c64]">Usuario</TableHead>
                        )
                    }
                    <TableHead className="font-bold text-[#b81c64]">Score</TableHead>
                    <TableHead className="font-bold text-[#b81c64]">
                        {type === 'ranking' ? 'Último jugado' : 'Fecha'}
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, index) => (
                    <TableRow key={type === 'ranking'
                        ? (item as IRanking).playerName
                        : `${(item as IMatchHistory).playerId}-${index}`}>
                        {type === 'ranking' ? (
                            <TableCell>
                                {(item as IRanking).rank === 1 ? '🥇' : (item as IRanking).rank === 2 ? '🥈' : (item as IRanking).rank === 3 ? '🥉' : (item as IRanking).rank}
                            </TableCell>
                        ) : (
                            <TableCell>{index + 1}</TableCell>
                        )
                        }
                        {
                            type === 'ranking' && (
                                <TableCell>{(item as IRanking).playerName}</TableCell>
                            )
                        }
                        {
                            type === 'ranking' ? (
                                <TableCell>{(item as IRanking).bestScore}</TableCell>
                            ) : (
                                <TableCell>{(item as IMatchHistory).score}</TableCell>
                            )
                        }
                        <TableCell>{formatDate(
                            type === 'ranking'
                                ? (item as IRanking).lastPlayed
                                : (item as IMatchHistory).matchDate
                        )}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default RankingTable;