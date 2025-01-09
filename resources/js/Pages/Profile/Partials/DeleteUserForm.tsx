import { Input } from "@/Components/ui/input";
import InputError from "@/Components/ui/input-error";
import { Button } from "@/Components/ui/button";
import { useForm } from "@inertiajs/react";
import { FormEventHandler, useRef } from "react";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";

export default function DeleteUserForm() {
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: "",
    });

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                clearErrors();
            },
            onError: () => passwordInput.current?.focus(),
        });
    };

    return (
        <Card>
            <CardHeader>
                <h2 className="text-lg font-medium text-gray-900">
                    Удалить учетную запись
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    После удаления учетной записи данные не будут подлежать
                    восстановлению!
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            placeholder="Пароль"
                        />

                        <InputError message={errors.password} />
                    </div>

                    <Button
                        variant="destructive"
                        onClick={deleteUser}
                        disabled={processing}
                    >
                        Удалить аккаунт
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
