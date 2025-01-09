import React from "react";

interface IChipProps {
    children: React.ReactNode;
    size?: "small" | "medium" | "large";
}

const sizeStyles = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-4 py-2",
    large: "text-lg px-6 py-3",
};

export default function Chip({ children, size = "medium" }: IChipProps) {
    return (
        <span
            className={`bg-primary text-primary-foreground rounded-full w-fit overflow-hidden whitespace-nowrap text-ellipsis ${sizeStyles[size]}`}
        >
            {children}
        </span>
    );
}
