import { Avatar, AvatarFallback } from "../ui/avatar";

interface IUserProps {
    name: string;
    description: string;
}

const User = (props: IUserProps) => {
    return (
        <div className="flex items-center">
            <Avatar className="mr-4">
                <AvatarFallback>{props.name[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-lg font-semibold">{props.name}</p>
                <p className="text-sm text-gray-600">{props.description}</p>
            </div>
        </div>
    );
};

export default User;
