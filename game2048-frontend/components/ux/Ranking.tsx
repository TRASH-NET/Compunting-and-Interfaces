import { PlayerSaved } from '@/Interfaces/player.interface';
import { getplayers } from '@/models/Player';
import TableDataView from './TableDataView';


const Ranking = async () => {

    const fetchPlayers: PlayerSaved[] = await getplayers();

    return (
        <aside className="flex flex-col items-center justify-start w-full px-16">
            <h2 className='font-bold text-center my-4 text-xl'>Ranking</h2>
            <TableDataView
                fetchPlayers={fetchPlayers}
            />
        </aside>
    )
}

export default Ranking;