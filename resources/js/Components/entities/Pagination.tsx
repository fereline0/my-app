import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import IPagination from "@/Interfaces/pagination";

export default function <T>({ links }: IPagination<T>) {
    return (
        <Pagination>
            <PaginationContent>
                {links.slice(1, -1).map((link) => (
                    <PaginationItem key={link.label}>
                        <PaginationLink
                            href={link.url || "#"}
                            isActive={link.active}
                        >
                            {link.label}
                        </PaginationLink>
                    </PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}
