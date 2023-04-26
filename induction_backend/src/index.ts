require('module-alias/register');
import BoardingActivityController from '@/resources/boardingActivity/boardingActivity.controller';
import BoardingTaskController from '@/resources/boardingTask/boardingTask.controller';
import UserController from '@/resources/user/user.controller';
import validateEnv from '@/utils/validateEnv';
import 'dotenv/config';
import 'module-alias/register';
import App from './app';

validateEnv();

const app = new App(
    [
        new UserController(),
        new BoardingTaskController(),
        new BoardingActivityController(),
    ],
    Number(process.env.PORT)
);

app.listen();
