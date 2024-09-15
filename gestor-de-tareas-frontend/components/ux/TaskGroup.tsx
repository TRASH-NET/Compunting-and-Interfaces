import React from 'react';
import { ITaskRecieved } from '@/interfaces';
import TasksList from './TasksList';

interface TaskGroupProps {
    title: string;
    tasks: ITaskRecieved[];
    color: string;
}

const TaskGroup: React.FC<TaskGroupProps> = ({ title, tasks, color }) => {
    return (
        <div className='w-[250px] h-full'>
            <div className={`p-2 bg-white border-t-8 ${color} rounded-t-sm my-2`}>
                <h2 className='font-semibold'>{title}</h2>
            </div>
            <TasksList tasks={tasks} />
        </div>
    );
};

export default TaskGroup;