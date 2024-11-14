'use client'
import { IUser } from '@/Interfaces/user.interface';
import { login } from '@/models/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const FormSchema = z.object({
    playerName: z.string().min(3, {
        message: "El usuario debe contener al menos 3 caracteres"
    }).max(15, {
        message: "El usuario debe contener menos de 15 caracteres"
    }),
    password: z.string().min(8, {
        message: "La contraseña debe contener al menos 8 caracteres.",
    }).max(30, {
        message: "La contraseña debe contener al menos 8 caracteres.",
    })
});



const Login = () => {
    const router = useRouter();

    const onSubmit = async (user: IUser) => {
        try {
            await login(user)
            router.push('/game')
        } catch (error) {
            if ((error as Error).message === 'Player do not exist') {
                form.setError("playerName", {
                    type: "manual",
                    message: "Usuario no existe",
                });
            } else if ((error as Error).message === 'Invalid password') {
                form.setError("password", {
                    type: "manual",
                    message: "Contraseña incorrecta",
                });
            }
        }
    };

    const form = useForm<IUser>({
        resolver: zodResolver(FormSchema),
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <h3 className="font-bold text-[#6B0096] text-2xl my-8">Ingresar</h3>
                <FormField
                    control={form.control}
                    name="playerName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#696F79] font-medium">Usuario</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Usuario" {...field}
                                    value={field.value || ''}
                                    className={`placeholder:text-[#1935CA] placeholder:font-extralight shadow-md border-none`}
                                />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#696F79] font-medium">Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Contraseña" {...field}
                                    value={field.value || ''}
                                    className={`placeholder:text-[#1935CA] placeholder:font-extralight shadow-md border-none`}
                                />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full font-bold bg-[#6B0096] p-6 mt-4 hover:bg-[#411752] uppercase">Jugar</Button>
                <p className="text-[#1935CA] text-sm text-center hover:underline">
                    ¿No tienes una cuenta?
                </p>
                <Link href="/auth/register" className="text-[#1935CA] font-semibold text-sm hover:underline">
                    <Button className="w-full font-bold bg-[#6B0096] p-6 hover:bg-[#411752] uppercase">
                        Crea una
                    </Button>
                </Link>
            </form>
        </Form>
    )
}

export default Login