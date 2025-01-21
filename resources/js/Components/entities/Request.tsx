import IRequest from "@/Interfaces/request";
import { Card, CardHeader } from "../ui/card";
import IComment from "@/Interfaces/comment";
import Comment from "./Comment";
import IPagination from "@/Interfaces/pagination";
import Pagination from "./Pagination";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Button } from "../ui/button";
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoMdMore } from "react-icons/io";
import { Textarea } from "../ui/textarea";
import Chip from "../ui/chip";
import InputError from "../ui/input-error";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import IStatus from "@/Interfaces/status";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

interface IRequestProps {
    request: IRequest;
    statuses: IStatus[];
    comments: IPagination<IComment>;
    permissions: string[];
}

export default function Request(props: IRequestProps) {
    const user = usePage().props.auth.user;

    const commentForm = useForm({
        request_id: props.request.id,
        value: "",
    });

    const statusForm = useForm({
        status_id: props.request.status?.id || "",
    });

    const createComment: FormEventHandler = (e) => {
        e.preventDefault();
        commentForm.reset();
        commentForm.post(route("comments.store"));
    };

    const updateStatus: FormEventHandler = (e) => {
        e.preventDefault();
        statusForm.post(route("requests.updateStatus", props.request.id));
    };

    const canEdit =
        props.permissions.includes("edit request") ||
        (props.request.user_id == user.id && props.request.status?.is_closed);

    const canDelete =
        props.permissions.includes("delete request") ||
        (props.request.user_id == user.id && props.request.status?.is_closed);

    const canEditStatus = props.permissions.includes("edit request status");

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <div className="flex gap-2 justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                            {props.request.status && (
                                <Chip size="small">
                                    {props.request.status.name}
                                </Chip>
                            )}
                            {props.request.category && (
                                <Chip size="small">
                                    {props.request.category.name}
                                </Chip>
                            )}
                            <h2 className="text-xl font-semibold leading-tight">
                                {props.request.title}
                            </h2>
                        </div>

                        {(canEditStatus || canDelete || canEdit) && (
                            <Dialog>
                                <AlertDialog>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Button size="icon">
                                                <IoMdMore size={20} />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {canEditStatus && (
                                                <DropdownMenuItem>
                                                    <DialogTrigger>
                                                        Изменить статус
                                                    </DialogTrigger>
                                                </DropdownMenuItem>
                                            )}
                                            {canEdit && (
                                                <DropdownMenuItem>
                                                    <Link
                                                        href={route(
                                                            "requests.edit",
                                                            props.request.id
                                                        )}
                                                    >
                                                        Редактировать
                                                    </Link>
                                                </DropdownMenuItem>
                                            )}
                                            {canDelete && (
                                                <DropdownMenuItem>
                                                    <AlertDialogTrigger>
                                                        Удалить
                                                    </AlertDialogTrigger>
                                                </DropdownMenuItem>
                                            )}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>
                                                Вы уверены, что хотите удалить
                                                обращение?
                                            </AlertDialogTitle>
                                            <AlertDialogDescription>
                                                После удаления обращения вы не
                                                сможете восстановить его. Данное
                                                действие необратимо.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>

                                        <AlertDialogFooter>
                                            <AlertDialogCancel>
                                                Отмена
                                            </AlertDialogCancel>

                                            <AlertDialogAction>
                                                <Link
                                                    href={route(
                                                        "requests.destroy",
                                                        props.request.id
                                                    )}
                                                    method="delete"
                                                >
                                                    Удалить обращение
                                                </Link>
                                            </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Изменение статуса обращения
                                        </DialogTitle>
                                        <DialogDescription>
                                            <div className="space-y-2">
                                                <Select
                                                    defaultValue={props.request.status_id.toString()}
                                                    onValueChange={(value) =>
                                                        statusForm.setData(
                                                            "status_id",
                                                            value
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Выберите статус" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {props.statuses.map(
                                                            (status) => (
                                                                <SelectItem
                                                                    key={
                                                                        status.id
                                                                    }
                                                                    value={status.id.toString()}
                                                                >
                                                                    {
                                                                        status.name
                                                                    }
                                                                </SelectItem>
                                                            )
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <p>
                                                    {statusForm.data
                                                        .status_id &&
                                                    props.statuses.find(
                                                        (status) =>
                                                            status.id.toString() ===
                                                            statusForm.data
                                                                .status_id
                                                    )?.is_closed
                                                        ? "Выбранный статус закрывает обращение"
                                                        : "Выбранный статус открывает обращение"}
                                                </p>
                                            </div>
                                        </DialogDescription>
                                        <DialogFooter>
                                            <Button
                                                disabled={statusForm.processing}
                                                onClick={updateStatus}
                                            >
                                                Обновить
                                            </Button>
                                        </DialogFooter>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        {props.request.user && (
                            <p className="text-lg font-semibold">
                                {props.request.user.name}
                            </p>
                        )}
                        <p>
                            {formatDistance(
                                new Date(props.request.created_at),
                                new Date(),
                                {
                                    locale: ru,
                                    addSuffix: true,
                                }
                            )}
                        </p>
                    </div>
                    <p>{props.request.value}</p>
                </CardHeader>
            </Card>
            {props.permissions.length > 0 || props.request.status?.is_closed ? (
                <Card>
                    <CardHeader>
                        <div className="space-y-4">
                            <div className="w-full space-y-2">
                                <Textarea
                                    id="value"
                                    value={commentForm.data.value}
                                    onChange={(e) =>
                                        commentForm.setData(
                                            "value",
                                            e.target.value
                                        )
                                    }
                                    required
                                    autoFocus
                                    placeholder="Комментарий"
                                />
                                <InputError
                                    message={commentForm.errors.value}
                                />
                            </div>
                            <Button
                                disabled={commentForm.processing}
                                onClick={createComment}
                            >
                                Создать
                            </Button>
                        </div>
                    </CardHeader>
                </Card>
            ) : (
                <Card>
                    <CardHeader>
                        <p>Закрыто для дальнейшего комментирования</p>
                    </CardHeader>
                </Card>
            )}
            {props.comments.data.map((comment: IComment) => (
                <Comment key={comment.id} comment={comment} />
            ))}
            <Pagination {...props.comments} />
        </div>
    );
}
