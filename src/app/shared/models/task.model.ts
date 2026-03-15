export interface TaskInfoResponse {
    todos: Task[],
    total: number;
    skip: number;
    limit: number;
}

export interface Task {
    id: number,
    todo: string;
    completed: boolean;
    userId: number;
}