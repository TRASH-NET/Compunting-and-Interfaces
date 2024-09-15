export interface ITaskRecieved {
    taskId: number;
    title: string;
    description: string;
    status: string;
    creationDate: Date;
    modificationDate: Date;
    finishDate: string;
}

export interface ITask {
    title: string;
    description: string;
    finishDate: string;
    status?: string;
}