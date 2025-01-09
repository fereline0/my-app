import Pagination from "@/Components/entities/Pagination";
import RequestPreview from "@/Components/entities/RequestPreview";
import { Button } from "@/Components/ui/button";
import { Card, CardHeader } from "@/Components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/Components/ui/chart";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import IMonthlyRequests from "@/Interfaces/monthly-requests";
import IPagination from "@/Interfaces/pagination";
import IRequest from "@/Interfaces/request";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface IIndexProps {
    requests: IPagination<IRequest>;
    statuses: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    monthlyRequests: IMonthlyRequests[];
}

export default function Index({
    requests,
    statuses,
    categories,
    monthlyRequests,
}: IIndexProps) {
    const { data, setData, get } = useForm({
        search: "",
        status: "",
        category: "",
    });

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get("search");
        const statusParam = urlParams.get("status");
        const categoryParam = urlParams.get("category");

        searchParam && setData("search", searchParam);
        statusParam && setData("status", statusParam);
        categoryParam && setData("category", categoryParam);
    }, []);

    const search = () => {
        get(route("requests.index"), { preserveState: true });
    };

    const chartConfig = {
        requestsCount: {
            label: "Колличесво",
            color: "hsl(var(--primary))",
        },
    } satisfies ChartConfig;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Обращения
                </h2>
            }
        >
            <Head title="Мои обращения" />
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <ChartContainer
                            config={chartConfig}
                            className="max-h-64 w-full"
                        >
                            <BarChart accessibilityLayer data={monthlyRequests}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    tickMargin={10}
                                    axisLine={false}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip
                                    content={<ChartTooltipContent />}
                                />
                                <Bar
                                    dataKey="requestsCount"
                                    fill="var(--color-requestsCount)"
                                    radius={4}
                                />
                            </BarChart>
                        </ChartContainer>
                    </CardHeader>
                </Card>
                <Card>
                    <CardHeader>
                        <div className="space-y-4">
                            <Input
                                placeholder="Поиск"
                                value={data.search}
                                onChange={(e) =>
                                    setData("search", e.target.value)
                                }
                            />
                            <Select
                                value={data.status}
                                onValueChange={(value) =>
                                    setData("status", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите статус" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все</SelectItem>
                                    {statuses.map((status) => (
                                        <SelectItem
                                            key={status.id}
                                            value={status.id.toString()}
                                        >
                                            {status.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select
                                value={data.category}
                                onValueChange={(value) =>
                                    setData("category", value)
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Выберите категорию" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все</SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            value={category.id.toString()}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button onClick={search}>Поиск</Button>
                        </div>
                    </CardHeader>
                </Card>
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
                            <p>Список обращений пуст</p>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </AuthenticatedLayout>
    );
}