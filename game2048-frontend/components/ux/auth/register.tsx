'use client'
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { IRegister } from "@/Interfaces/user.interface";
import { register } from "@/models/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
    playerName: z.string().min(3, {
        message: "El usuario debe contener al menos 3 caracteres"
    }).max(15, {
        message: "El usuario debe contener menos de 15 caracteres"
    }),
    password: z.string().min(8, {
        message: "La contraseña debe contener al menos 8 caracteres.",
    }).max(30, {
        message: "La contraseña debe contener maximo 30 caracteres.",
    }),
    confirmPassword: z.string().min(8, {
        message: "La confirmación de la contraseña debe contener al menos 8 caracteres.",
    }).max(30, {
        message: "La confirmación de la contraseña debe contener maximo 30 caracteres.",
    }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});

const Register = () => {

    const router = useRouter();

    const onSubmit = async (user: IRegister) => {

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { confirmPassword, ...rest } = user;

        try {
            await register(rest)
            router.push('/auth/login')
        } catch (error) {
            if ((error as Error).message === 'Player name already exists, try with another') {
                form.setError("playerName", {
                    type: "manual",
                    message: "Usuario ya existe, intenta con otro",
                });
            } else if ((error as Error).message[0] === 'password is not strong enough') {
                form.setError("password", {
                    type: "manual",
                    message: "La contraseña no es lo suficientemente fuerte",
                });
            }
        }
    };

    const form = useForm<IRegister>({
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
                                    placeholder="usuario" {...field}
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-[#696F79] font-medium">Confirmar Contraseña</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Confirmar contraseña" {...field}
                                    value={field.value || ''}
                                    className={`placeholder:text-[#1935CA] placeholder:font-extralight shadow-md border-none`}
                                />
                            </FormControl>
                            <FormMessage className="text-red-700" />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full font-bold bg-[#6B0096] p-6 mt-4 hover:bg-[#411752] uppercase">Crear Cuenta</Button>
                <p className="text-[#1935CA] text-sm text-center hover:underline">
                    ¿Ya tienes una cuenta?
                </p>
                <Link href="/auth/login" className="text-[#1935CA] font-semibold text-sm hover:underline">
                    <Button className="w-full font-bold bg-[#6B0096] p-6 hover:bg-[#411752] uppercase">
                        Jugar
                    </Button>
                </Link>
            </form>
        </Form>
    )
}

export default Register