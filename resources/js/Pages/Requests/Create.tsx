import { Input } from "@/Components/ui/input";
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
import InputError from "@/Components/ui/input-error";

export default function Create({ categories }: { categories: ICategory[] }) {
    const { data, setData, post, errors, processing } = useForm({
        title: "",
        value: "",
        category_id: "",
    });

    const createRequest: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("requests.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Создание обращения" />
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-medium text-gray-900">
                        Создание обращения
                    </h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Пожалуйста, заполните информацию о вашем обращении.
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
                                onValueChange={(value) =>
                                    setData("category_id", value)
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

                        <Button disabled={processing} onClick={createRequest}>
                            Создать
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </AuthenticatedLayout>
    );
}
