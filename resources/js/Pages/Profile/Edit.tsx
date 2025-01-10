import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";

export default function Edit({
    mustVerifyEmail,
    status,
}: PageProps<{ mustVerifyEmail: boolean; status?: string }>) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Профиль
                </h2>
            }
        >
            <Head title="Profile" />

            <Tabs defaultValue="updateProfileInformationForm">
                <TabsList>
                    <TabsTrigger value="updateProfileInformationForm">
                        Информация профиля
                    </TabsTrigger>
                    <TabsTrigger value="updatePasswordForm">
                        Обновить пароль
                    </TabsTrigger>
                    <TabsTrigger value="deleteUserForm">
                        Удалить учетную запись
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="updateProfileInformationForm">
                    <UpdateProfileInformationForm
                        mustVerifyEmail={mustVerifyEmail}
                        status={status}
                    />
                </TabsContent>
                <TabsContent value="updatePasswordForm">
                    <UpdatePasswordForm />
                </TabsContent>
                <TabsContent value="deleteUserForm">
                    <DeleteUserForm />
                </TabsContent>
            </Tabs>
        </AuthenticatedLayout>
    );
}
