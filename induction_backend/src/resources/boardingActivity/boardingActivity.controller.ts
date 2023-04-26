import authenticated from '@/middleware/authenticated.middleware';
import BoardingActivityService from '@/resources/boardingActivity/boardingActivity.service';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class BoardingActivityController implements Controller {
    public path = '/boarding-activities';
    public router = Router();
    private boardingActivityService = new BoardingActivityService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get(
            `${this.path}/:userId`,
            authenticated,
            this.getActivity
        );
    }

    private getActivity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { userId } = req.params;
            const activity = await this.boardingActivityService.getActivity(
                userId
            );
            res.status(200).json(activity);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };
}

export default BoardingActivityController;
