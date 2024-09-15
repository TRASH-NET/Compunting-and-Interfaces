'use client'
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import ModalTask from '@/components/ux/ModalTask'
import TaskGroupsContainer from '@/components/ux/TaskGroupsContainer'
import { ITaskRecieved } from '@/interfaces'
import { CircleIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'


interface TasksSectionProps {
    allTasks: ITaskRecieved[]
}

const TasksSection: React.FC<TasksSectionProps> = ({ allTasks }) => {

    const [tasks, setTasks] = useState<ITaskRecieved[]>(allTasks);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const filteredTasks = allTasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            task.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setTasks(filteredTasks);
    }, [searchQuery, allTasks]);

    return (
        <section className="p-8 h-full">
            <div className="flex flex-row items-center justify-start gap-2">
                <ModalTask />
                <div className="relative max-w-[300px]">
                    <Input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
                        placeholder="Buscar tarea"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-500" />
                </div>
                <div className="flex flex-row items-center justify-center gap-3 ml-4">
                    <CircleIcon className="h-3 w-3 text-green-500 bg-green-500 rounded-full" />
                    <p>Prioridad Baja</p>
                    <CircleIcon className="h-3 w-3 text-amber-500 bg-amber-500 rounded-full" />
                    <p>Prioridad Media</p>
                    <CircleIcon className="h-3 w-3 text-red-500 bg-red-500 rounded-full" />
                    <p>Prioridad Urgente</p>
                </div>
            </div>
            <h2 className="text-3xl font-bold mt-3">Tareas</h2>
            <TaskGroupsContainer
                tasks={tasks}
            />
        </section>
    )
}

export default TasksSection;