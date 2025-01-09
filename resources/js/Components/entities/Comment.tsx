import IComment from "@/Interfaces/comment";
import { Card, CardHeader } from "../ui/card";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { IoMdMore } from "react-icons/io";
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
import { Link, usePage } from "@inertiajs/react";
import User from "../ui/user";

interface ICommentProps {
    comment: IComment;
}

export default function Comment(props: ICommentProps) {
    const { user } = usePage().props.auth;

    const commentCreator = user.id === props.comment.user_id;

    return (
        <Card>
            <CardHeader>
                <div className="flex gap-2 justify-between">
                    {props.comment.user && (
                        <User
                            name={props.comment.user.name}
                            description={formatDistance(
                                new Date(props.comment.created_at),
                                new Date(),
                                {
                                    locale: ru,
                                    addSuffix: true,
                                }
                            )}
                        />
                    )}
                    {commentCreator && (
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button size="icon">
                                        <IoMdMore size={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuItem>
                                        <Link
                                            href={route(
                                                "comments.edit",
                                                props.comment.id
                                            )}
                                        >
                                            Редактировать
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <AlertDialogTrigger>
                                            Удалить
                                        </AlertDialogTrigger>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Вы уверены, что хотите удалить
                                        комментарий?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        После удаления комментария вы не сможете
                                        восстановить его. Данное действие
                                        необратимо.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Отмена
                                    </AlertDialogCancel>

                                    <AlertDialogAction>
                                        <Link
                                            href={route(
                                                "comments.destroy",
                                                props.comment.id
                                            )}
                                            method="delete"
                                        >
                                            Удалить комментарий
                                        </Link>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
                <p>{props.comment.value}</p>
            </CardHeader>
        </Card>
    );
}
