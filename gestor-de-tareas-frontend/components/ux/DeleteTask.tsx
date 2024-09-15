import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteTask } from "@/models";
import { useRouter } from "next/navigation";

interface DeleteTaskProps {
    taskId: number;
}


const DeleteTask: React.FC<DeleteTaskProps> = ({ taskId }) => {

    const router = useRouter();

    const handleDeleteTask = async (taskId: number) => {
        await deleteTask(+taskId);
        router.refresh();
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger className="p-0 m-0 text-red-500 text-left text-sm">Eliminar</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estas seguro que deseas eliminar la tarea?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esto borrará permanentemente la tarea de nuestros servidores.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => handleDeleteTask(taskId)}
                        className="bg-red-500 text-white"
                    >
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteTask