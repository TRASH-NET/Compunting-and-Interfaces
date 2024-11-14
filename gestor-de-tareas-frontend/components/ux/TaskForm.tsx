"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { format, isValid, parseISO, parse } from "date-fns"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CalendarIcon, CircleIcon } from "@radix-ui/react-icons"
import { ITask, ITaskRecieved } from "@/interfaces"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"

const formSchema = z.object({
    title: z.string().min(1, {
        message: "El titulo no debe estar vacio",
    }),
    description: z.string().min(1, {
        message: "La descripcion no debe estar vacia",
    }),
    finishDate: z.string().refine(val => {
        const parsedDate = parse(val, "yyyy-MM-dd'T'HH:mm:ss", new Date());
        return isValid(parsedDate) && format(parsedDate, "yyyy-MM-dd'T'HH:mm:ss") === val;
    }, {
        message: `La fecha debe estar en el formato "yyyy-MM-dd'T'HH:mm:ss"`,
    }),
    status: z.string().optional()
});

interface TaskFormProps {
    task?: ITaskRecieved;
    onSubmit: (data: ITask) => void;
}



const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {

    const form = useForm<ITask>({
        resolver: zodResolver(formSchema),
        defaultValues: task ? task : { title: '', description: '', finishDate: '', status: 'TODO' },
    });

    const today = new Date();

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titulo</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage className="text-red-800" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripcion</FormLabel>
                            <FormControl>
                                <Input {...field} value={field.value || ''} />
                            </FormControl>
                            <FormMessage className="text-red-800" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="finishDate"
                    render={({ field }) => (
                        <FormItem className="flex flex-col mt-2">
                            <FormLabel>Fecha de vencimiento</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value ? (
                                                format(field.value, "PPP")
                                            ) : (
                                                <span>Fecha de vencimiento</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={field.value ? parseISO(field.value) : undefined}
                                        onSelect={(date) => {
                                            const formattedDate = date ? format(date, "yyyy-MM-dd'T'HH:mm:ss") : '';
                                            field.onChange(formattedDate);
                                        }}
                                        disabled={date => date <= today}
                                    // initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => {
                        const isBackward = field.value === 'BACKWARD';
                        return (
                            <FormItem>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isBackward}
                                    >
                                        <SelectTrigger>
                                            <SelectValue {...field} />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {
                                                isBackward && (
                                                    <SelectItem value="BACKWARD">
                                                        <div className="flex flex-row items-center justify-center gap-2">
                                                            <p>Atrasada</p>
                                                            <CircleIcon className="h-3 w-3 text-red-500 bg-red-500 rounded-full" />
                                                        </div>
                                                    </SelectItem>
                                                )
                                            }
                                            <SelectItem value="TODO">
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <p>Pendiente</p>
                                                    <CircleIcon className="h-3 w-3 text-gray-500 bg-gray-500 rounded-full" />
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="IN_PROGRESS">
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <p>En progreso</p>
                                                    <CircleIcon className="h-3 w-3 text-blue-500 bg-blue-500 rounded-full" />
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="UNDER_REVIEW">
                                                <div className="flex flex-row items-center justify-center gap-2">
                                                    <p>En revision</p>
                                                    <CircleIcon className="h-3 w-3 text-amber-500 bg-amber-500 rounded-full" />
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="DONE">
                                                <div className="flex flex-row items-center justify-center gap-2 ">
                                                    <p>Completada</p>
                                                    <CircleIcon className="h-3 w-3 text-green-400 bg-green-400 rounded-full" />
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )
                    }}
                />
                <Button
                    variant="addTask"
                    className="w-full my-3"
                    type="submit"
                >
                    {task ? 'EDITAR TAREA' : 'CREAR TAREA'}
                </Button>
            </form>
        </Form>
    )
}

export default TaskForm