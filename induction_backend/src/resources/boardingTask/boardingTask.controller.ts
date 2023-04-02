import { NextFunction, Request, Response, Router } from 'express';
import validationMiddleware from '@/middleware/validation.middleware';
import BoardingTaskService from '@/resources/boardingTask/boardingTask.service';
import validate from '@/resources/boardingTask/boardingTask.validation';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';

class BoardingTaskController implements Controller{
    public path = '/boarding-task';
    public router= Router();
    private boardingTaskService = new BoardingTaskService();

    constructor(){
        this.initializeRoutes();
    }

    private initializeRoutes():void{
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
    }

    private create =async (
        req:Request,
        res: Response,
        next: NextFunction
    ):Promise<Response | void> => {
        try {
            const {title,body} = req.body;
            const task = await this.boardingTaskService.create(title,body);
            res.status(201).json({task});
        } catch (e:any) {
            next(new HttpException(400, e.message));
        }
    }
}

export default  BoardingTaskController;