import { ITask } from "@/interfaces";

export const getAllTasks = async () => {
    const respuesta = await fetch(`${process.env.API_URL}/tasks`, { cache: 'no-store' });
    const resultado = await respuesta.json();

    return resultado;
}

export const createTask = async (task: ITask) => {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    return respuesta;
}

export const updateTask = async (taskId: number, task: ITask) => {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    });

    return respuesta;
}

export const deleteTask = async (taskId: number) => {
    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    });

    return respuesta;
}