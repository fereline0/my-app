import ICategory from "@/Interfaces/category"; // Adjust the import path as necessary
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

interface ICategoryPreviewProps {
    category: ICategory;
    permissions: string[];
}

export default function CategoryPreview(props: ICategoryPreviewProps) {
    const canEdit = props.permissions.includes("edit category");
    const canDelete = props.permissions.includes("delete category");

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <h3>{props.category.name}</h3>
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
                                                    "dashboard.categories.edit",
                                                    props.category.id
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
                                        категорию?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        После удаления категории вы не сможете
                                        восстановить её. Данное действие
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
                                                "dashboard.categories.destroy",
                                                props.category.id
                                            )}
                                            method="delete"
                                        >
                                            Удалить категорию
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
