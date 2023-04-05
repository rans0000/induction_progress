import authenticated from '@/middleware/authenticated.middleware';
import valiationMiddleware from '@/middleware/validation.middleware';
import UserService from '@/resources/user/user.service';
import validate from '@/resources/user/user.validate';
import HttpException from '@/utils/exceptions/http.exception';
import Controller from '@/utils/interfaces/controller.interface';
import { NextFunction, Request, Response, Router } from 'express';

class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private userService = new UserService();

    constructor() {
        this.initializeController();
    }

    private initializeController(): void {
        this.router.post(
            `${this.path}/register`,
            valiationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            valiationMiddleware(validate.login),
            this.login
        );
        this.router.get(
            `${this.path}/current-user`,
            authenticated,
            this.getCurrentUser
        );
        this.router.get(`${this.path}`, authenticated, this.getUsers);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.userService.register(
                name,
                email,
                password,
                'user'
            );

            res.status(201).json({ token });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.userService.login(email, password);

            res.status(200).json({ token });
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };

    private getCurrentUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        if (!req.user) {
            return next(new HttpException(404, 'No logged in user'));
        }
        res.status(200).json({ user: req.user });
    };

    private getUsers = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const users = await this.userService.getUsers();
            res.status(200).json(users);
        } catch (e: any) {
            next(new HttpException(400, e.message));
        }
    };
}

export default UserController;
