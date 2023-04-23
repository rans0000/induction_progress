import authenticated from '@/middleware/authenticated.middleware';
import validationMiddleware from '@/middleware/validation.middleware';
import BoardingTaskService from '@/resources/boardingTask/boardingTask.service';
import validate from '@/resources/boardingTask/boardingTask.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class BoardingTaskController implements Controller {
    public path = '/boarding-tasks';
    public router = Router();
    private boardingTaskService = new BoardingTaskService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );

        this.router.get(`${this.path}`, authenticated, this.getTasks);
        this.router.get(`${this.path}/:taskId`, authenticated, this.getTask);
        this.router.patch(
            `${this.path}/:taskId`,
            authenticated,
            validationMiddleware(validate.update),
            this.updateTask
        );
        this.router.delete(
            `${this.path}/:taskId`,
            authenticated,
            this.deleteTask
        );
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { title, body } = req.body;
            const task = await this.boardingTaskService.create(title, body);
            res.status(201).json({ task });
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };

    private getTasks = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const tasks = await this.boardingTaskService.getTasks();
            res.status(200).json(tasks);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };

    private getTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { taskId } = req.params;
            const task = await this.boardingTaskService.getTask(taskId);
            res.status(200).json(task);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };

    private updateTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { taskId } = req.params;
            const { _id, ...rest } = req.body;
            console.log(taskId, rest);

            const task = await this.boardingTaskService.updateTask(
                taskId,
                rest
            );
            res.status(200).json(task);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };

    private deleteTask = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { taskId } = req.params;
            const task = await this.boardingTaskService.deleteTask(taskId);
            res.status(204).json(task);
        } catch (err: any) {
            next(new HttpException(400, err.message));
        }
    };
}

export default BoardingTaskController;
