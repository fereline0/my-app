import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/Components/ui/input-error";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import IStatus from "@/Interfaces/status";
import DashboardLayout from "@/Layouts/DashboardLayout";

interface IEditProps {
    status: IStatus;
    permissions: string[];
}

export default function Edit(props: IEditProps) {
    const { data, setData, post, errors, processing } = useForm({
        name: props.status.name,
        is_closed: props.status.is_closed,
    });

    const updateStatus: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("dashboard.statuses.update", props.status.id));
    };

    return (
        <AuthenticatedLayout>
            <DashboardLayout permissions={props.permissions}>
                <Head title="Редактирование статуса" />
                <Card>
                    <CardHeader>
                        <h2 className="text-lg font-medium text-gray-900">
                            Редактирование статуса
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
                            Пожалуйста, обновите информацию о статусе.
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
                                    Закрытый статус
                                </label>
                                <InputError message={errors.is_closed} />
                            </div>
                            <Button
                                disabled={processing}
                                onClick={updateStatus}
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
