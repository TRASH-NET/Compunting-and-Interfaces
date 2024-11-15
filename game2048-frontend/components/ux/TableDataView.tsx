'use client'
import React, { useEffect, useState } from 'react'
import RankingTable from './RankingTable'
import { Input } from '../ui/input'
import { IMatchHistory, IRanking } from '@/Interfaces';

interface TableDataViewProps {
    tableData: IMatchHistory[] | IRanking[];
    type: 'ranking' | 'history';
}

const TableDataView: React.FC<TableDataViewProps> = ({ tableData, type }) => {

    const [data, setData] = useState<typeof tableData>(tableData);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const getFilteredSortedData = () => {
        if (!Array.isArray(data)) return [];

        return data
            .filter(item => {
                if (type === 'history') {
                    return true;
                }
                if (type === 'ranking') {
                    const playerName = (item as IRanking).playerName;
                    return playerName && playerName.toLowerCase().includes(searchTerm.toLowerCase());
                }
                return true;
            })
            .sort((a, b) => {
                if (type === 'ranking') {
                    return (b as IRanking).bestScore - (a as IRanking).bestScore;
                }
                if (type === 'history') {
                    return (b as IMatchHistory).score - (a as IMatchHistory).score;
                }

                return 0;
            });
    };

    useEffect(() => {
        setData(tableData);
    }, [tableData]);

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
                    data={getFilteredSortedData()}
                    type={type}
                />
            </div>
        </>
    )
}

export default TableDataView