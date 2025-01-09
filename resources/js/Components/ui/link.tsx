import { InertiaLinkProps, Link } from "@inertiajs/react";

export default (props: InertiaLinkProps) => {
    return (
        <Link
            className="text-gray-600 hover:text-black duration-200"
            {...props}
        />
    );
};
