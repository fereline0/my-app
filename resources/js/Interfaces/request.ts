import ICategory from "./category";
import IStatus from "./status";
import IUser from "./user";

export default interface IRequest {
    id: number;
    title: string;
    value: string;
    user_id: number;
    user?: IUser;
    status_id: number;
    status?: IStatus;
    category_id: number;
    category?: ICategory;
    created_at: string;
    updated_at: string;
}
