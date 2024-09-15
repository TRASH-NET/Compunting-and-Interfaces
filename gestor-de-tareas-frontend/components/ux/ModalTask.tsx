'use client'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import TaskForm from "./TaskForm"
import { ITask, ITaskRecieved } from "@/interfaces";
import { createTask, updateTask } from "@/models";
import { useRouter } from "next/navigation";
import { useState } from 'react';

interface ModalTaskProps {
    task?: ITaskRecieved;
    isEditing?: boolean;
    setIsEditing?: (value: boolean) => void;
}

const ModalTask: React.FC<ModalTaskProps> = ({ task, isEditing, setIsEditing }) => {

    const [isCreating, setIsCreating] = useState(false);

    const handleClose = () => {
        if (setIsEditing) {
            setIsEditing(false);
        }
        if (isCreating === true) {
            setIsCreating(false);
        }
    };

    const router = useRouter();

    const handleSubmit = async (data: ITask) => {
        if (task) {
            if (task.status === 'BACKWARD') {
                const { status, ...rest } = data;
                await updateTask(+task.taskId, rest);
                router.refresh();
            } else {
                await updateTask(+task.taskId, data);
                router.refresh();
            }
        } else {
            await createTask(data);
            router.refresh();
        }
        handleClose();
    };

    return (
        <>
            <Dialog open={isEditing || isCreating} onOpenChange={handleClose}>
                {!isEditing && (
                    <DialogTrigger
                        className="bg-[#b622c6] text-white shadow hover:bg-[#9c1cb2] h-10 px-4 py-2 rounded-md text-base font-bold"
                        onClick={() => setIsCreating(true)}
                    >
                        Agregar tarea
                    </DialogTrigger>
                )}
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEditing ? "Editando tarea" : "Nueva Tarea"}
                        </DialogTitle>
                        <TaskForm
                            task={task}
                            onSubmit={handleSubmit}
                        />
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ModalTask;