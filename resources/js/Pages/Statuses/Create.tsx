import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
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
        is_closed: false,
    });

    const createStatus: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.statuses.store"));
    };

    return (
        <AuthenticatedLayout>
            <DashboardLayout permissions={props.permissions}>
                <Head title="Создание статуса" />
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-gray-900">
                            Создание статуса
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Пожалуйста, заполните информацию о новом статусе.
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
                                    placeholder="Название статуса"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_closed"
                                    checked={data.is_closed}
                                    onCheckedChange={(checked: boolean) =>
                                        setData("is_closed", checked)
                                    }
                                />
                                <label htmlFor="is_closed">
                                    Закрывает обращение
                                </label>
                                <InputError message={errors.is_closed} />
                            </div>

                            <Button
                                disabled={processing}
                                onClick={createStatus}
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
