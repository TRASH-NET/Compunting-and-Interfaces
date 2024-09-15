import { ITaskRecieved } from '@/interfaces';
import Task from './Task';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"


interface TasksListProps {
    tasks: ITaskRecieved[];
}

const TasksList: React.FC<TasksListProps> = ({ tasks }) => {


    return (
        <ScrollArea className='h-[60%]'>
            {
                tasks.length == 0 ? (
                    <p className='text-center'>No hay Tareas</p>
                ) : (
                    tasks.map(task => (
                        <Task
                            task={task}
                            key={task.taskId}
                        />
                    ))
                )
            }
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    );
}

export default TasksList;