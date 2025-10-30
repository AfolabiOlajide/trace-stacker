"use client";
import Link from "next/link";
import { useState } from "react";
import {
    Menu,
    X,
    Bell,
    LayoutDashboard,
    ShoppingCart,
    ChartNoAxesColumn,
    Archive,
    SquareChevronLeft,
    SquareChevronRight,
    Plus,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const pathname = usePathname();

    const menuItems = [
        {
            id: "home",
            label: "Home",
            icon: LayoutDashboard,
            href: "/business-portal",
        },
        {
            id: "products",
            label: "Products",
            icon: Archive,
            href: "/business-portal/products",
        },
        {
            id: "orders",
            label: "Orders",
            icon: ShoppingCart,
            href: "/business-portal/orders",
        },
        {
            id: "analytics",
            label: "Analytics",
            icon: ChartNoAxesColumn,
            href: "/business-portal/analytics",
        },
    ];

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Sidebar */}
            <aside
                className={`${
                    sidebarOpen ? "w-64" : "w-0 md:w-20"
                } border-r border-dark/50 text-white transition-all duration-300 ease-in-out flex-shrink-0 overflow-hidden`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <Link href={"/"}>
                        <div className="h-16 flex items-center justify-center border-b border-dark/50 px-4">
                            {sidebarOpen ? (
                                <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                                    <div className="size-6 text-primary">
                                        <svg
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                                            TraceStacker
                                        </h2>
                                        <p className="text-primary-light">
                                            Business Portal
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                                    <div className="size-6 text-primary">
                                        <svg
                                            fill="none"
                                            viewBox="0 0 48 48"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Link>

                    {/* Menu Items */}
                    <nav className="flex-1 flex flex-col gap-2 overflow-y-auto p-4">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    href={item.href}
                                    key={item.id}
                                    className={`w-full flex items-center px-6 py-3 transition-colors rounded-md ${
                                        pathname === item.href
                                            ? "bg-dark-2 border-l-4 border-dark"
                                            : "hover:bg-dark-2"
                                    }`}
                                >
                                    <Icon className="w-5 h-5 flex-shrink-0" />
                                    {sidebarOpen && (
                                        <span className="ml-3 whitespace-nowrap">
                                            {item.label}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Glassmorphism Header - Sticky */}
                <header className="sticky top-0 z-10 border-b border-dark/20 dark:bg-background-dark/80 backdrop-blur-lg">
                    <div className="flex items-center justify-between px-4 md:px-6 h-16">
                        <Button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="cursor-pointer"
                            variant={"outline"}
                            size="icon"
                        >
                            {sidebarOpen ? (
                                <SquareChevronLeft className="w-6 h-6" />
                            ) : (
                                <SquareChevronRight className="w-6 h-6" />
                            )}
                        </Button>

                        <div className="flex items-center space-x-4">
                            <div className="flex flex-1 justify-end gap-4 items-center">
                                <Button className="flex min-w-[84px] max-w-[480px] cursor-pointer  overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-colors gap-2">
                                    <Plus size={16} />
                                    <span className="truncate">
                                        Create New Product
                                    </span>
                                </Button>
                            </div>
                            {/* <button className="relative p-2 rounded-lg hover:bg-gray-200/50 transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                            </button>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                U
                            </div> */}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-8">{children}</main>
            </div>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-0 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
        </div>
    );
};

export default DashboardWrapper;
