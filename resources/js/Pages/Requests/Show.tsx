import Request from "@/Components/entities/Request";
import IComment from "@/Interfaces/comment";
import IPagination from "@/Interfaces/pagination";
import IRequest from "@/Interfaces/request";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({
    request,
    comments,
    permissions,
}: {
    request: IRequest;
    comments: IPagination<IComment>;
    permissions: string[];
}) {
    return (
        <AuthenticatedLayout>
            <Head title={request.title} />
            <Request
                request={request}
                comments={comments}
                permissions={permissions}
            />
        </AuthenticatedLayout>
    );
}
