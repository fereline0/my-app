import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/Components/ui/input-error";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import ICategory from "@/Interfaces/category";
import DashboardLayout from "@/Layouts/DashboardLayout";

interface IEditProps {
    category: ICategory;
    permissions: string[];
}

export default function Edit(props: IEditProps) {
    const { data, setData, put, errors, processing } = useForm({
        name: props.category.name,
    });

    const updateCategory: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("dashboard.categories.update", props.category.id));
    };

    return (
        <AuthenticatedLayout>
            <DashboardLayout permissions={props.permissions}>
                <Head title="Редактирование категории" />
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-gray-900">
                            Редактирование категории
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Пожалуйста, обновите информацию о категории.
                        </p>
                    </CardHeader>

                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    id="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    required
                                    autoFocus
                                    placeholder="Название категории"
                                />
                                <InputError message={errors.name} />
                            </div>
                            <Button
                                disabled={processing}
                                onClick={updateCategory}
                            >
                                Обновить
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
}
