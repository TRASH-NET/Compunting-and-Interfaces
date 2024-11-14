import UserAccount from './UserAccount';
import { cookies } from 'next/headers';
import PlayerStats from './GameInfo';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload, IMatchHistory } from '@/Interfaces';
import { getMatchHistory } from '@/models/Player';


const Ranking = async () => {

    const cookieStore = cookies();
    const authCookie = cookieStore.get('authentication');
    const sesion = authCookie ? authCookie.value : null;
    const decodeToken: IJwtPayload | null = sesion ? jwtDecode(sesion) : null;

    const matchHistory: IMatchHistory[] = await getMatchHistory(decodeToken?.id as `${string}-${string}-${string}-${string}-${string}` ?? null);

    return (
        <aside className="flex flex-col items-center justify-start w-full px-16">
            <UserAccount
                sesion={sesion}
            />
            <PlayerStats
                matchHistory={matchHistory}
            />
        </aside>
    )
}

export default Ranking;