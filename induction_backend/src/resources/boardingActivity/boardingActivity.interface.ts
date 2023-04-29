import { Document } from 'mongoose';

export interface Task {
    taskId: string;
    status: boolean;
}

export default interface BoardingActivity extends Document {
    userId: string;
    isCompleted: boolean;
    status: string;
    tasks: Task[];
}
