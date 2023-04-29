import { ActivityStatus } from "../utils/enums";
import { OnboardTask } from "./onboardtask.model";

interface Activity {
  _id?: string;
  userId: string;
  status: ActivityStatus;
  isMemberCompleted: boolean;
}
export interface OnboardActivityTaskRequest {
  taskId: string;
  isCompleted: boolean;
}

export type OnboardActivityTask = OnboardTask & { isCompleted: boolean };

export interface OnboardActivity extends Activity {
  tasks: OnboardActivityTask[];
}

export interface OnboardActivityRequest extends Activity {
  tasks: OnboardActivityTaskRequest[];
}
