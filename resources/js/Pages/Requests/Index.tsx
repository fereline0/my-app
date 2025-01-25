import Pagination from "@/Components/entities/Pagination";
import RequestPreview from "@/Components/entities/RequestPreview";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/Components/ui/accordion";
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
import DashboardLayout from "@/Layouts/DashboardLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

interface IIndexProps {
    requests: IPagination<IRequest>;
    statuses: { id: number; name: string }[];
    categories: { id: number; name: string }[];
    monthlyRequests: IMonthlyRequests[];
    permissions: string[];
}

export default function Index(props: IIndexProps) {
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
        get(route("dashboard.requests.index"), { preserveState: true });
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
            <DashboardLayout permissions={props.permissions}>
                <Head title="Обращения" />
                <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <Accordion type="single" collapsible>
                                <AccordionItem value="item-1">
                                    <AccordionTrigger>
                                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                            Статистика обращений за последнии 6
                                            месяцев
                                        </h2>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <ChartContainer
                                            config={chartConfig}
                                            className="max-h-64 w-full"
                                        >
                                            <BarChart
                                                accessibilityLayer
                                                data={props.monthlyRequests}
                                            >
                                                <CartesianGrid
                                                    vertical={false}
                                                />
                                                <XAxis
                                                    dataKey="month"
                                                    tickLine={false}
                                                    tickMargin={10}
                                                    axisLine={false}
                                                    tickFormatter={(value) =>
                                                        value.slice(0, 3)
                                                    }
                                                />
                                                <ChartTooltip
                                                    content={
                                                        <ChartTooltipContent />
                                                    }
                                                />
                                                <Bar
                                                    dataKey="requestsCount"
                                                    fill="var(--color-requestsCount)"
                                                    radius={4}
                                                />
                                            </BarChart>
                                        </ChartContainer>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
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
                                        {props.statuses.map((status) => (
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
                                        {props.categories.map((category) => (
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
                    {props.requests.data.length > 0 ? (
                        <>
                            {props.requests.data.map((request: IRequest) => (
                                <RequestPreview
                                    key={request.id}
                                    request={request}
                                />
                            ))}
                            <Pagination {...props.requests} />
                        </>
                    ) : (
                        <Card>
                            <CardHeader>
                                <p>Список обращений пуст</p>
                            </CardHeader>
                        </Card>
                    )}
                </div>
            </DashboardLayout>
        </AuthenticatedLayout>
    );
}
