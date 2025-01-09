import IUser from "@/Interfaces/user";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Card, CardHeader } from "../ui/card";
import { Link } from "@inertiajs/react";
import CustomLink from "@/Components/ui/link";

interface IHeaderProps {
    user: IUser;
}

export default function Header(props: IHeaderProps) {
    return (
        <Card>
            <CardHeader>
                <nav className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">
                        <CustomLink href="/">
                            {import.meta.env.VITE_APP_NAME}
                        </CustomLink>
                    </h3>

                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarFallback>
                                        {props.user.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link href={route("profile.edit")}>
                                        Профиль
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <AlertDialogTrigger>
                                        Выйти из аккаунта
                                    </AlertDialogTrigger>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Вы уверены, что хотите выйти из аккаунта?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    После выхода из аккаунта вы не сможете
                                    получить доступ к своим данным до повторного
                                    входа. Убедитесь, что вы сохранили все
                                    необходимые изменения перед выходом.
                                </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Отмена</AlertDialogCancel>

                                <AlertDialogAction>
                                    <Link href={route("logout")} method="post">
                                        Выйти из аккаунта
                                    </Link>
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </nav>
            </CardHeader>
        </Card>
    );
}
