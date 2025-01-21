import Request from "@/Components/entities/Request";
import IComment from "@/Interfaces/comment";
import IPagination from "@/Interfaces/pagination";
import IRequest from "@/Interfaces/request";
import IStatus from "@/Interfaces/status";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Show({
    request,
    comments,
    statuses,
    permissions,
}: {
    request: IRequest;
    comments: IPagination<IComment>;
    statuses: IStatus[];
    permissions: string[];
}) {
    return (
        <AuthenticatedLayout>
            <Head title={request.title} />
            <Request
                request={request}
                statuses={statuses}
                comments={comments}
                permissions={permissions}
            />
        </AuthenticatedLayout>
    );
}
