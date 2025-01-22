import Pagination from "@/Components/entities/Pagination";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import IStatus from "@/Interfaces/status";
import IPagination from "@/Interfaces/pagination";
import StatusPreview from "@/Components/entities/StatusPreview";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DashboardLayout from "@/Layouts/DashboardLayout";

interface IIndexProps {
    statuses: IPagination<IStatus>;
    permissions: string[];
}

export default function Index(props: IIndexProps) {
    const { data, setData, get } = useForm({
        search: "",
        is_closed: "",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");
        const isClosed = urlParams.get("is_closed");

        searchParam && setData("search", searchParam);
        isClosed && setData("is_closed", isClosed);
    }, []);

    const search = () => {
        get(route("dashboard.statuses.index"), { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Статусы
                </h2>
            }
        >
            <DashboardLayout permissions={props.permissions}>
                <Head title="Статусы" />
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="space-y-4">
                                <Input
                                    placeholder="Поиск"
                                    value={data.search}
                                    onChange={(e) =>
                                        setData("search", e.target.value)
                                    }
                                />
                                <Select
                                    value={data.is_closed}
                                    onValueChange={(value) =>
                                        setData("is_closed", value)
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Закрывает ли обращение" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">
                                            Не имеет значения
                                        </SelectItem>
                                        <SelectItem value="1">Да</SelectItem>
                                        <SelectItem value="0">Нет</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={search}>Поиск</Button>
                            </div>
                        </CardHeader>
                    </Card>
                    <div className="flex justify-end">
                        <Link href={route("dashboard.statuses.create")}>
                            <Button>Создать</Button>
                        </Link>
                    </div>
                    {props.statuses.data.length > 0 ? (
                        props.statuses.data.map((status) => (
                            <StatusPreview
                                key={status.id}
                                status={status}
                                permissions={props.permissions}
                            />
                        ))
                    ) : (
                        <Card>
                            <CardHeader>
                                <p>Список статусов пуст</p>
                            </CardHeader>
                        </Card>
                    )}
                    <Pagination {...props.statuses} />
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
}
