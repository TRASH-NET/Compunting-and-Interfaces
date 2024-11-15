import UserAccount from './UserAccount';
import { cookies } from 'next/headers';
import PlayerStats from './PlayerStats';
import { jwtDecode } from 'jwt-decode';
import { IJwtPayload, IMatchHistory, IRanking } from '@/Interfaces';
import { getBestScore, getMatchHistory } from '@/models/Player';
import { getRanking } from '@/models/game';


const Ranking = async () => {

    const cookieStore = cookies();
    const authCookie = cookieStore.get('authentication');
    const sesion = authCookie ? authCookie.value : null;
    const decodeToken: IJwtPayload | null = sesion ? jwtDecode(sesion) : null;

    const bestScore = await getBestScore(decodeToken?.id as `${string}-${string}-${string}-${string}-${string}` ?? null);

    const matchHistory: IMatchHistory[] = await getMatchHistory(decodeToken?.id as `${string}-${string}-${string}-${string}-${string}` ?? null);
    const rankingData: IRanking[] = await getRanking();

    return (
        <aside className="flex flex-col items-center justify-start w-full px-16">
            <UserAccount
                sesion={sesion}
            />
            <PlayerStats
                matchHistory={matchHistory}
                rankingData={rankingData}
                bestScore={bestScore}
            />
        </aside>
    )
}

export default Ranking;