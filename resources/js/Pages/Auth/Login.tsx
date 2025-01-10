import { Input } from "@/Components/ui/input";
import { Checkbox } from "@/Components/ui/checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import InputError from "@/Components/ui/input-error";
import { Button } from "@/Components/ui/button";
import Link from "@/Components/ui/link";

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const login: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <GuestLayout>
            <Head title="Войти" />

            <div className="space-y-4">
                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <div className="space-y-2">
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        placeholder="Почта"
                        autoComplete="username"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="space-y-2">
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        placeholder="Пароль"
                        autoComplete="current-password"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                    <Checkbox
                        id="remember"
                        onChange={(e) =>
                            setData(
                                "remember",
                                (e.target as HTMLInputElement).checked
                            )
                        }
                    />
                    <label htmlFor="remember">Запомнить меня</label>
                </div>

                <div className="flex items-center gap-2 justify-end">
                    {canResetPassword && (
                        <Link href={route("password.request")}>
                            Забыли пароль?
                        </Link>
                    )}
                    <Link href={route("register")}>Есть аккаунт?</Link>
                </div>
                <Button
                    className="w-full"
                    onClick={login}
                    disabled={processing}
                >
                    Войти
                </Button>
            </div>
        </GuestLayout>
    );
}
