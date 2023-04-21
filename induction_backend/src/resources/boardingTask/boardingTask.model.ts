import BoardingTask from '@/resources/boardingTask/boardingTask.interface';
import { Schema, model } from 'mongoose';

const BoardingTaskSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        body: {
            type: String,
            required: true,
        },
        enabled: {
            type: Boolean,
            required: true,
            default: true,
        },
    },
    { timestamps: true }
);

export default model<BoardingTask>('BoardingTask', BoardingTaskSchema);
