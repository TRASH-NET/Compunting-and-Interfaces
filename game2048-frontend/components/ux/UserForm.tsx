"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect } from "react"
import { useCallback } from "react";
import { createPlayer } from "@/models/Player"
import { useRouter } from "next/navigation"

const generateUniqueUsername = () => {
    const timestamp = Date.now();
    return `user_${timestamp}`;
};

const formSchema = z.object({
    playerName: z.string().refine((name) => {
        if (name.trim() === "") {
            return true;
        }
        return name.length >= 2;
    }, {
        message: "Player name must be at least 2 characters long",
    }).transform((name) => {
        if (name.trim() === "") {
            return generateUniqueUsername();
        }
        return name;
    }),
});


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
}

const UserForm: React.FC<UserFormProps> = ({ board, isPlaying, gameEnded, resetGame, startGame }) => {


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            playerName: "",
        }
    });

    const router = useRouter();

    const onSubmit = useCallback(async (data: { playerName: string }) => {
        if (board && gameEnded) {
            const player = {
                playerName: data.playerName,
                score: board.score,
            };
            await createPlayer(player);
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
                <FormField
                    control={form.control}
                    name="playerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="border border-slate-500 rounded-md p-2 w-full"
                                    placeholder="Player Name" {...field}
                                    value={field.value || ''}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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