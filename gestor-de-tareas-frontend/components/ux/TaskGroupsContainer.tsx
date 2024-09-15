import { ITaskRecieved } from "@/interfaces"
import TaskGroup from "./TaskGroup";

interface TaskGroupsContainerProps {
    tasks: ITaskRecieved[]
}

const TaskGroupsContainer: React.FC<TaskGroupsContainerProps> = ({ tasks }) => {

    const pendingTasks = tasks.filter(task => task.status === 'TODO');
    const inProgressTasks = tasks.filter(task => task.status === 'IN_PROGRESS');
    const inReviewTasks = tasks.filter(task => task.status === 'UNDER_REVIEW');
    const backwardTasks = tasks.filter(task => task.status === 'BACKWARD');
    const doneTasks = tasks.filter(task => task.status === 'DONE');

    return (
        <div className='my-6 flex items-start flex-row gap-4 justify-around h-full'>
            <TaskGroup title="Pendiente" tasks={pendingTasks} color="border-gray-500" />
            <TaskGroup title="En Progreso" tasks={inProgressTasks} color="border-blue-500" />
            <TaskGroup title="En Revisión" tasks={inReviewTasks} color="border-amber-500" />
            <TaskGroup title="Atrasadas" tasks={backwardTasks} color="border-red-500" />
            <TaskGroup title="Completadas" tasks={doneTasks} color="border-green-500" />
        </div>
    );
}

export default TaskGroupsContainer