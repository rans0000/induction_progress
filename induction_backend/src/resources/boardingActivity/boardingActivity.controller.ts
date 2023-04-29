import authenticated from '@/middleware/authenticated.middleware';
import valiationMiddleware from '@/middleware/validation.middleware';
import BoardingActivityService from '@/resources/boardingActivity/boardingActivity.service';
import validate from '@/resources/boardingActivity/boardingActivity.validation';
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
        this.router.post(
            `${this.path}/user`,
            authenticated,
            valiationMiddleware(validate.create),
            this.createActivity
        );
        this.router.get(
            `${this.path}/user/:userId`,
            authenticated,
            this.getActivity
        );
        this.router.put(
            `${this.path}/user/:userId`,
            authenticated,
            valiationMiddleware(validate.update),
            this.updateActivity
        );
    }

    private createActivity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const activity = await this.boardingActivityService.createActivity(
                req.body
            );
            res.status(201).json(activity);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };

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

    private updateActivity = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const activity = await this.boardingActivityService.updateActivity(
                req.body
            );
            res.status(200).json(activity);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };
}

export default BoardingActivityController;
