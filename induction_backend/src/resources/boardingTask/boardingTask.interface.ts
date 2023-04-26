import { Document } from 'mongoose';

export default interface BoardingTask extends Document {
    title: string;
    body: string;
    enabled: boolean;
}
