import BoardingActivity from '@/resources/boardingActivity/boardingActivity.interface';
import BoardingActivityModel from '@/resources/boardingActivity/boardingActivity.model';

class BoardingActivityService {
    private activity = BoardingActivityModel;

    /**
     * get boarding activity of a user
     */
    /**@todo: remove null from return types */
    public async getActivity(
        userId: string
    ): Promise<BoardingActivity | null | Error> {
        try {
            const activity = await this.activity.findOne({ userId });
            return activity;
        } catch (err) {
            throw new Error('Unable to retrieve activity');
        }
    }
}

export default BoardingActivityService;
