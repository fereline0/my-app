import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import InputError from "@/Components/ui/input-error";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";

export default function UpdatePasswordForm() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const updatePassword: FormEventHandler = (e) => {
        e.preventDefault();

        put(route("password.update"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset("password", "password_confirmation");
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    reset("current_password");
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                    Обновить пароль
                </h2>
                <p className="text-sm text-gray-600">
                    Убедитесь, что ваш аккаунт использует длинный и случайный
                    пароль для безопасности.
                </p>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="current_password"
                            ref={currentPasswordInput}
                            value={data.current_password}
                            onChange={(e) =>
                                setData("current_password", e.target.value)
                            }
                            type="password"
                            autoComplete="current-password"
                            placeholder="Старый пароль"
                        />
                        <InputError message={errors.current_password} />
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            type="password"
                            autoComplete="new-password"
                            placeholder="Новый пароль"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="space-y-2">
                        <Input
                            id="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
                            }
                            type="password"
                            autoComplete="new-password"
                            placeholder="Подтверждение нового пароля"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button disabled={processing} onClick={updatePassword}>
                        Сохранить
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
