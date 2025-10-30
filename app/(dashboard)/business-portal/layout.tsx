import DashboardWrapper from "@/components/dashboard/DashboardWrapper";

export default function BusinessPortalLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className={``}>
            <DashboardWrapper>{children}</DashboardWrapper>
        </main>
    );
}
