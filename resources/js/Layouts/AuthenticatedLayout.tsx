import { Card, CardHeader } from "@/Components/ui/card";
import Header from "@/Components/widgets/Header";
import { usePage } from "@inertiajs/react";
import { PropsWithChildren, ReactNode } from "react";

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const user = usePage().props.auth.user;

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto p-2 space-y-4">
                <Header user={user} />

                {header && (
                    <Card>
                        <CardHeader>
                            <header>{header}</header>
                        </CardHeader>
                    </Card>
                )}

                <main className="break-words">{children}</main>
            </div>
        </div>
    );
}
