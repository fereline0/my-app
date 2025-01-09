import IUser from "./user";

export default interface IComment {
    id: number;
    request_id: number;
    user_id: number;
    value: string;
    user?: IUser;
    created_at: string;
    updated_at: string;
}
