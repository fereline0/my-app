import { Input } from "@/Components/ui/input";
import InputError from "@/Components/ui/input-error";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import ICategory from "@/Interfaces/category";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";

interface IEditProps {
    request: {
        id: number;
        title: string;
        value: string;
        category_id: number;
    };
    categories: ICategory[];
}

export default function Edit({ request, categories }: IEditProps) {
    const { data, setData, put, errors, processing } = useForm({
        title: request.title,
        value: request.value,
        category_id: request.category_id,
    });

    const updateRequest: FormEventHandler = (e) => {
        e.preventDefault();
        put(route("requests.update", request.id));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Редактирование обращения" />
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">
                        Редактирование обращения
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Здесь вы можете обновить инофрмацию о обращении.
                    </p>
                </CardHeader>

                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                required
                                autoFocus
                                placeholder="Заголовок"
                            />
                            <InputError message={errors.title} />
                        </div>

                        <div className="space-y-2">
                            <Input
                                id="value"
                                value={data.value}
                                onChange={(e) =>
                                    setData("value", e.target.value)
                                }
                                required
                                placeholder="Сообщение"
                            />
                            <InputError message={errors.value} />
                        </div>

                        <div className="space-y-2">
                            <Select
                                value={data.category_id.toString()}
                                onValueChange={(value) =>
                                    setData("category_id", parseInt(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <InputError message={errors.category_id} />
                        </div>
                        <Button disabled={processing} onClick={updateRequest}>
                            Обновить
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
