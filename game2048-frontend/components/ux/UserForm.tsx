"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useCallback } from "react";
import { useRouter } from "next/navigation"
import { Form } from "../ui/form"
import { jwtDecode } from "jwt-decode"
import { IJwtPayload } from "@/Interfaces/jwtPayload.interface"
import { saveMatch } from "@/models/Player"


const formSchema = z.object({});


interface UserFormProps {
    board: {
        score: number;
        hasWon: () => boolean;
        hasLost: () => boolean;
    } | null;
    isPlaying: boolean;
    gameEnded: boolean;
    resetGame: () => void;
    startGame: () => void;
    sesion: string | null;
}

const UserForm: React.FC<UserFormProps> = ({ board, isPlaying, gameEnded, resetGame, startGame, sesion }) => {


    const form = useForm({
        resolver: zodResolver(formSchema),
    });

    const router = useRouter();

    const decodeToken: IJwtPayload | null = sesion ? jwtDecode(sesion) : null;

    const onSubmit = useCallback(async () => {
        if (board && gameEnded) {
            if (decodeToken?.id === null) {
                return;
            }
            const match = {
                playerId: decodeToken?.id as `${string}-${string}-${string}-${string}-${string}`,
                score: board.score,
            };
            await saveMatch(match);
            router.refresh();
        }
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [board, gameEnded]
    );

    useEffect(() => {
        if (gameEnded) {
            form.handleSubmit(onSubmit)();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameEnded]);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex justify-between items-center w-full">
                {
                    !isPlaying ? (
                        <Button
                            className="px-6 py-2 rounded-md bg-[#b81c64] hover:bg-[#b94078]"
                            onClick={() => {
                                form.handleSubmit(() => {
                                    startGame();
                                })();
                            }}
                        >
                            Iniciar Juego
                        </Button>
                    ) : (
                        <Button
                            className="px-6 py-2 rounded-md bg-[#b81c64] hover:bg-[#b94078]"
                            onClick={() => {
                                form.handleSubmit(() => {
                                    resetGame();
                                    form.reset();
                                })();
                            }}
                        >
                            Reiniciar Juego
                        </Button>
                    )
                }

            </form>
        </Form>
    )
}

export default UserForm;