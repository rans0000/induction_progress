import { Schema, model } from 'mongoose';
import BoardingActivity from './boardingActivity.interface';

const taskSchema = new Schema({
    taskId: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
});

const BoardingActivitySchema = new Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        status: { type: String, required: true },
        tasks: [taskSchema],
    },
    { timestamps: true }
);

export default model<BoardingActivity>(
    'BoardingActivity',
    BoardingActivitySchema
);
