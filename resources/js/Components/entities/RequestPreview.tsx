import IRequest from "@/Interfaces/request";
import { Card, CardHeader } from "../ui/card";
import Link from "../ui/link";
import Chip from "../ui/chip";
import { formatDistance } from "date-fns";
import { ru } from "date-fns/locale";

interface IRequestPreviewProps {
    request: IRequest;
}

export default function RequestPreview(props: IRequestPreviewProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2 flex-wrap">
                    {props.request.status && (
                        <Chip size="small">{props.request.status.name}</Chip>
                    )}
                    {props.request.category && (
                        <Chip size="small">{props.request.category.name}</Chip>
                    )}
                    <h2 className="text-xl font-semibold leading-tight whitespace-nowrap text-ellipsis overflow-hidden">
                        <Link href={route("requests.show", props.request.id)}>
                            {props.request.title}
                        </Link>
                    </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    {props.request.user && (
                        <p className="text-lg font-semibold">
                            {props.request.user.name}
                        </p>
                    )}
                    <p>
                        {formatDistance(
                            new Date(props.request.created_at),
                            new Date(),
                            {
                                locale: ru,
                                addSuffix: true,
                            }
                        )}
                    </p>
                </div>
                <p className="whitespace-nowrap text-ellipsis overflow-hidden">
                    {props.request.value}
                </p>
            </CardHeader>
        </Card>
    );
}
