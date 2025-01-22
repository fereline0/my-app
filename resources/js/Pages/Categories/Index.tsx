import Pagination from "@/Components/entities/Pagination";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Head, Link, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect } from "react";
import ICategory from "@/Interfaces/category";
import IPagination from "@/Interfaces/pagination";
import CategoryPreview from "@/Components/entities/CategoryPreview";
import DashboardLayout from "@/Layouts/DashboardLayout";

interface IIndexProps {
    categories: IPagination<ICategory>;
    permissions: string[];
}

export default function Index(props: IIndexProps) {
    const { data, setData, get } = useForm({
        search: "",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");

        searchParam && setData("search", searchParam);
    }, []);

    const search = () => {
        get(route("dashboard.categories.index"), { preserveState: true });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Категории
                </h2>
            }
        >
            <DashboardLayout permissions={props.permissions}>
                <Head title="Категории" />
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
                                <Button onClick={search}>Поиск</Button>
                            </div>
                        </CardHeader>
                    </Card>
                    <div className="flex justify-end">
                        <Link href={route("dashboard.categories.create")}>
                            <Button>Создать</Button>
                        </Link>
                    </div>
                    {props.categories.data.length > 0 ? (
                        props.categories.data.map((category) => (
                            <CategoryPreview
                                key={category.id}
                                category={category}
                                permissions={props.permissions}
                            />
                        ))
                    ) : (
                        <Card>
                            <CardHeader>
                                <p>Список категорий пуст</p>
                            </CardHeader>
                        </Card>
                    )}
                    <Pagination {...props.categories} />
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
}
