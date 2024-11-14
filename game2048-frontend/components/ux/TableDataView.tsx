'use client'
import React, { useEffect, useState } from 'react'
import RankingTable from './RankingTable'
import { Input } from '../ui/input'
import { PlayerSaved } from '@/Interfaces/player.interface';

interface TableDataViewProps {
    fetchPlayers: PlayerSaved[];
}

const TableDataView: React.FC<TableDataViewProps> = ({ fetchPlayers }) => {

    const [players, setPlayers] = useState<PlayerSaved[]>(fetchPlayers);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const getFilteredSortedPlayers = () => {
        return Array.isArray(players)
            ? players
                .filter(player => player.playerName.toLowerCase().includes(searchTerm.toLowerCase()))
                .sort((a, b) => a.rank - b.rank)
            : []
    };

    useEffect(() => {
        setPlayers(fetchPlayers);
    }, [fetchPlayers]);

    return (
        <>
            <Input
                placeholder='Buscar jugador'
                className='border border-slate-500 rounded-md p-2'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='w-full bg-[#c7c7c7] my-2 rounded-md overflow-y-auto h-[400px]'>
                <RankingTable
                    players={getFilteredSortedPlayers()}
                />
            </div>

        </>
    )
}

export default TableDataView