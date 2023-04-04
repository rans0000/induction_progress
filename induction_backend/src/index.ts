require('module-alias/register');
import BoardingTaskController from '@/resources/boardingTask/boardingTask.controller';
import UserController from '@/resources/user/user.controller';
import validateEnv from '@/utils/validateEnv';
import 'dotenv/config';
import 'module-alias/register';
import App from './app';

validateEnv();

const app = new App(
    [
        new BoardingTaskController(),
        new UserController()
    ],
    Number(process.env.PORT));

app.listen();