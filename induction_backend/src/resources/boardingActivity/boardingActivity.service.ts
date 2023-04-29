import BoardingActivity from '@/resources/boardingActivity/boardingActivity.interface';
import BoardingActivityModel from '@/resources/boardingActivity/boardingActivity.model';

class BoardingActivityService {
    private activity = BoardingActivityModel;

    /**
     * create activity
     */
    public async createActivity(
        data: BoardingActivity
    ): Promise<BoardingActivity | null | Error> {
        try {
            const activity = await this.activity.create(data);
            return activity;
        } catch (err) {
            throw new Error('Unable to create activity');
        }
    }

    /**
     * get boarding activity of a user
     */
    /**@todo: remove null from return types */
    public async getActivity(
        userId: string
    ): Promise<BoardingActivity | null | Error> {
        try {
            const activity = await this.activity.findOne(
                { userId },
                { createdAt: 0, updatedAt: 0 }
            );
            return activity;
        } catch (err) {
            throw new Error('Unable to retrieve activity');
        }
    }

    /**
     * update task
     */
    public async updateActivity(
        data: BoardingActivity
    ): Promise<BoardingActivity | Error> {
        try {
            const { userId } = data;
            const activity = (await this.activity.findOneAndUpdate(
                { userId },
                data,
                {
                    new: true,
                }
            )) as BoardingActivity;
            return activity;
        } catch (err) {
            throw new Error('Unable to update activity');
        }
    }
}

export default BoardingActivityService;
