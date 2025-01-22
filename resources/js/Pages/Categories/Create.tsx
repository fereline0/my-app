import { Input } from "@/Components/ui/input";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/Components/ui/input-error";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import DashboardLayout from "@/Layouts/DashboardLayout";

interface ICreateProps {
    permissions: string[];
}

export default function Create(props: ICreateProps) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
    });

    const createCategory: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.categories.store"));
    };

    return (
        <AuthenticatedLayout>
            <DashboardLayout permissions={props.permissions}>
                <Head title="Создание категории" />
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-gray-900">
                            Создание категории
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Пожалуйста, заполните информацию о новой категории.
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
                                onClick={createCategory}
                            >
                                Создать
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
}
