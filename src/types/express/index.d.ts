import { IUser } from "../../models/user.model";

// the purpose is to let Request know that it can have a user object while accessing i.e req.user
declare global {
    namespace Express {
        interface Request {
            user?: Partial<IUser> //Partial to make every field optional in user interface
        }
    }
}


export { };