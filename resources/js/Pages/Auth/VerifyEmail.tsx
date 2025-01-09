import { Button } from "@/Components/ui/button";
import Link from "@/Components/ui/link";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("verification.send"));
    };

    return (
        <GuestLayout>
            <Head title="Подтверждение электронной почты" />

            <div className="mb-4 text-sm text-gray-600">
                Спасибо за регистрацию! Прежде чем начать, пожалуйста,
                подтвердите свой адрес электронной почты, нажав на ссылку,
                которую мы только что отправили вам по электронной почте. Если
                вы не получили письмо, мы с радостью отправим вам еще одно.
            </div>

            {status === "verification-link-sent" && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    Новая ссылка для подтверждения была отправлена на адрес
                    электронной почты, который вы указали при регистрации.
                </div>
            )}

            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button disabled={processing}>
                        Отправить письмо для подтверждения
                    </Button>

                    <Link href={route("logout")} method="post" as="button">
                        Выйти
                    </Link>
                </div>
            </form>
        </GuestLayout>
    );
}
