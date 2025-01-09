import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import InputError from "@/Components/ui/input-error";

interface IEditProps {
    comment: {
        id: number;
        value: string;
    };
}

export default function Edit({ comment }: IEditProps) {
    const { data, setData, put, errors, processing } = useForm({
        value: comment.value,
    });

    const updateComment: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("comments.update", comment.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Редактирование комментария" />
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">
                        Редактирование комментария
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Здесь вы можете обновить инофрмацию о комментарие.
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Textarea
                                id="value"
                                value={data.value}
                                onChange={(e) =>
                                    setData("value", e.target.value)
                                }
                                required
                                autoFocus
                                placeholder="Комментарий"
                            />
                            <InputError message={errors.value} />
                        </div>

                        <Button disabled={processing} onClick={updateComment}>
                            Обновить
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
