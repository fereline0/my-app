import Pagination from "@/Components/entities/Pagination";
import RequestPreview from "@/Components/entities/RequestPreview";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import Link from "@/Components/ui/link";
import IPagination from "@/Interfaces/pagination";
import IRequest from "@/Interfaces/request";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

interface IIndexProps {
    requests: IPagination<IRequest>;
}

export default function Index({ requests }: IIndexProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Мои обращения
                </h2>
            }
        >
            <Head title="Мои обращения" />
            <div className="space-y-4">
                <div className="flex justify-end">
                    <Link href={route("requests.create")}>
                        <Button>Создать</Button>
                    </Link>
                </div>
                {requests.data.length > 0 ? (
                    <>
                        {requests.data.map((request: IRequest) => (
                            <RequestPreview
                                key={request.id}
                                request={request}
                            />
                        ))}
                        <Pagination {...requests} />
                    </>
                ) : (
                    <Card>
                        <CardHeader>
                            <p>У вас нет обращений</p>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
