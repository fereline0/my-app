import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/Components/ui/input-error";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const updateProfileInformation: FormEventHandler = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                    Информация профиля
                </h2>
                <p className="mt-1 text-sm text-gray-600">
                    Обновите информацию о своем аккаунте и адрес электронной
                    почты.
                </p>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="name"
                            className="block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            autoComplete="name"
                            placeholder="Имя"
                        />
                        <InputError message={errors.name} />
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="email"
                            type="email"
                            className="block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                            placeholder="Email"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="mt-2 text-sm text-gray-800">
                                Ваш адрес электронной почты не подтвержден.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Нажмите здесь, чтобы повторно отправить
                                    письмо для подтверждения.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 text-sm font-medium text-green-600">
                                    Новая ссылка для подтверждения была
                                    отправлена на ваш адрес электронной почты.
                                </div>
                            )}
                        </div>
                    )}

                    <Button
                        disabled={processing}
                        onClick={updateProfileInformation}
                    >
                        Сохранить
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
