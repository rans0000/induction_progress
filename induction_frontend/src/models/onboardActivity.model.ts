import { OnboardTask } from "./onboardtask.model";

export type OnboardActivityTask = OnboardTask & {
  status: string;
};
export type OnboardActivity = {
  _id?: string;
  userId: string;
  isCompleted: boolean;
  tasks: OnboardTask[];
};
