'use client'
import { ITaskRecieved } from '@/interfaces'
import { formatDate } from '@/utils/formatDate'
import { DotsVerticalIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import ModalTask from './ModalTask'
import DeleteTask from './DeleteTask'
import { getColorClass } from '@/utils/getColorClass'
import { cn } from '@/lib/utils'
import { calculateDaysDifference } from '@/utils'

interface TaskRecivedProps {
    task: ITaskRecieved
}

const Task: React.FC<TaskRecivedProps> = ({ task }) => {

    const [modalManageTask, setModalManageTask] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleModalManageTask = () => {
        setModalManageTask(!modalManageTask);
    }

    const handleEditTask = () => {
        setIsEditing(true);
        handleModalManageTask();
    }

    const isTaskCompleted = task.status === 'DONE';
    const colorClass = getColorClass(new Date(task.finishDate));
    console.log(task.taskId, calculateDaysDifference(new Date(), new Date(task.finishDate)));

    return (
        <>
            <div key={task.taskId} className='bg-white p-4 my-2 relative'>
                <div className='flex items-start justify-between'>
                    <h3 className='text-base font-bold text-gray-700'>{task.title}</h3>
                    <DotsVerticalIcon
                        className='cursor-pointer mt-1'
                        onClick={() => handleModalManageTask()}
                    />
                </div>
                <div>
                    <p className='text-sm mt-2'>{task.description}</p>
                </div>
                <div className='mt-4'>
                    <p className={`text-[#b622c6] text-[12px] font-bold mb-2`}>
                        Creada:
                        <span className='font-light italic ml-2 text-gray-700'>
                            {formatDate(task.creationDate)}
                        </span>
                    </p>
                    <p className='text-[#b622c6] text-[12px] font-bold'>
                        Modificada:
                        <span className='font-light italic ml-2 text-gray-700'>
                            {formatDate(task.modificationDate)}
                        </span>
                    </p>
                    <p className='text-[#b622c6] text-[12px] font-bold mt-3'>
                        Vence:
                        <span className={cn('italic ml-2', colorClass)}>
                            {formatDate(new Date(task.finishDate))}
                        </span>
                    </p>
                </div>
                {
                    modalManageTask && (

                        <div className='absolute z-50 top-8 right-8'>
                            <div className='bg-white w-28 shadow-md p-4 rounded-sm font-semibold flex flex-col gap-3'>
                                {
                                    !isTaskCompleted && (
                                        <p
                                            className='text-sm cursor-pointer'
                                            onClick={() => handleEditTask()}
                                        >
                                            Editar
                                        </p>
                                    )
                                }
                                <DeleteTask
                                    taskId={task.taskId}
                                />
                            </div>
                        </div>
                    )
                }
            </div>
            {
                isEditing && (
                    <ModalTask
                        task={task}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                )
            }
        </>

    )
}

export default Task;