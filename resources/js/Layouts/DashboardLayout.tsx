import { Card, CardHeader } from "@/Components/ui/card";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/Components/ui/navigation-menu";
import ILink from "@/Interfaces/link";
import { Link, usePage } from "@inertiajs/react";
import { PropsWithChildren } from "react";

interface IDashboardProps extends PropsWithChildren {
    permissions: string[];
}

export default function Dashboard(props: IDashboardProps) {
    const { url: currentUrl } = usePage();

    const links: ILink[] = [
        {
            name: "Обращения",
            url: "dashboard.requests.index",
            permissions: ["edit request", "delete request", "create request"],
        },
        {
            name: "Категории",
            url: "dashboard.categories.index",
            permissions: [
                "create category",
                "edit category",
                "delete category",
            ],
        },
        {
            name: "Статусы",
            url: "dashboard.statuses.index",
            permissions: ["create status", "edit status", "delete status"],
        },
    ];

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader>
                    <NavigationMenu>
                        <NavigationMenuList>
                            {links.map((link) => {
                                const routeUrl = route(link.url);
                                const routePath = new URL(routeUrl).pathname;
                                const isActive = currentUrl === routePath;

                                const hasPermission = link.permissions.some(
                                    (permission) =>
                                        props.permissions.includes(permission)
                                );

                                return hasPermission ? (
                                    <NavigationMenuItem key={link.name}>
                                        <Link href={routeUrl}>
                                            <NavigationMenuLink
                                                active={isActive}
                                                className={navigationMenuTriggerStyle()}
                                            >
                                                {link.name}
                                            </NavigationMenuLink>
                                        </Link>
                                    </NavigationMenuItem>
                                ) : null;
                            })}
                        </NavigationMenuList>
                    </NavigationMenu>
                </CardHeader>
            </Card>

            {props.children}
        </div>
    );
}
