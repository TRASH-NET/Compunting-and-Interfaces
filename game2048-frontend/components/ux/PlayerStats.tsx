'use client'
import { IMatchHistory, IRanking } from "@/Interfaces";
import { Button } from "../ui/button"
import TableDataView from "./TableDataView";
import { useState } from "react";

interface PlayerStatsProps {
    matchHistory: IMatchHistory[];
    rankingData: IRanking[];
    bestScore: number;
}

const PlayerStats: React.FC<PlayerStatsProps> = ({ matchHistory, rankingData, bestScore }) => {

    const [activeTab, setActiveTab] = useState<'ranking' | 'history'>('ranking');

    return (
        <>
            <div className='flex justify-evenly w-full'>
                <Button
                    variant={activeTab === 'ranking' ? "default" : "outline"}
                    onClick={() => setActiveTab('ranking')}
                >
                    Ranking
                </Button>
                <Button
                    variant={activeTab === 'history' ? "default" : "outline"}
                    onClick={() => setActiveTab('history')}
                >
                    Mis partidas
                </Button>
            </div>
            <h2 className='font-bold text-center my-4 text-xl'>
                {activeTab === 'ranking' ? 'Ranking Global' : 'Historial de partidas'}
            </h2>
            <h3>BEST SCORE: {bestScore}</h3>
            <TableDataView
                tableData={activeTab === 'ranking' ? rankingData : matchHistory}
                type={activeTab}
            />
        </>
    )
}

export default PlayerStats;