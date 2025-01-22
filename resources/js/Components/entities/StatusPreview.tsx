import IStatus from "@/Interfaces/status";
import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { IoMdMore } from "react-icons/io";
import { Link } from "@inertiajs/react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "../ui/alert-dialog";

interface IStatusPreviewProps {
    status: IStatus;
    permissions: string[];
}

export default function StatusPreview(props: IStatusPreviewProps) {
    const canEdit = props.permissions.includes("edit status");
    const canDelete = props.permissions.includes("delete status");

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3>{props.status.name}</h3>
                    {(canEdit || canDelete) && (
                        <AlertDialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Button size="icon">
                                        <IoMdMore size={20} />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {canEdit && (
                                        <DropdownMenuItem>
                                            <Link
                                                href={route(
                                                    "dashboard.statuses.edit",
                                                    props.status.id
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
                                        Вы уверены, что хотите удалить статус?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        После удаления статуса вы не сможете
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
                                                "dashboard.statuses.destroy",
                                                props.status.id
                                            )}
                                            method="delete"
                                        >
                                            Удалить обращение
                                        </Link>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                </div>
            </CardHeader>
        </Card>
    );
}
