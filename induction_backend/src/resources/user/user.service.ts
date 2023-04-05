import UserModel from '@/resources/user/user.model';
import token from '@/utils/token';
import User from '@/resources/user/user.interface';

class UserService {
    private user = UserModel;

    /**
     * Register a new user
     */
    public async register(
        name: string,
        email: string,
        password: string,
        role: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.create({
                name,
                email,
                password,
                role,
            });

            const accessToken = token.createToken(user);

            return accessToken;
        } catch (e) {
            throw new Error('Unable to create user');
        }
    }

    /**
     * Attempt to login a user
     */
    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({ email });

            if (!user) {
                throw new Error('Unable to find user with that Email Address');
            }

            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (e) {
            throw new Error('Unable to login user');
        }
    }

    /**
     * get all users
     */
    public async getUsers(): Promise<User[] | Error> {
        try {
            const users = await this.user.find().select('-password').exec();
            return users;
        } catch (e) {
            throw new Error('Unable to retrieve users');
        }
    }
}

export default UserService;
