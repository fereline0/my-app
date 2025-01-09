import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import { PropsWithChildren } from "react";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 space-y-6">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <h3 className="text-xl font-bold">
                        {import.meta.env.VITE_APP_NAME}
                    </h3>
                </CardHeader>
                <CardContent>{children}</CardContent>
            </Card>
        </div>
    );
}
