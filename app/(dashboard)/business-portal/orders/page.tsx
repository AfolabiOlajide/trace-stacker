"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus, Search } from "lucide-react";
import { useState } from "react";

const orderStatuses = [
    {
        name: "All",
        value: "all",
    },
    {
        name: "Pending",
        value: "pending",
    },
    {
        name: "Delivered",
        value: "delivered",
    },
    {
        name: "Processing",
        value: "processing",
    },
    {
        name: "Shipped",
        value: "shipped",
    },
];

const mockOrders = [
    {
        id: "ORD-8A3F4E",
        customer: "Alice Johnson",
        date: "2023-10-27",
        items: 3,
        total: "$249.99",
        status: "shipped",
    },
    {
        id: "ORD-9B1G5H",
        customer: "Bob Williams",
        date: "2023-10-26",
        items: 1,
        total: "$99.50",
        status: "processing",
    },
    {
        id: "ORD-7C2K9J",
        customer: "Charlie Brown",
        date: "2023-10-25",
        items: 3,
        total: "$249.99",
        status: "delivered",
    },
    {
        id: "ORD-8A3F4E",
        customer: "Alice Johnson",
        date: "2023-10-27",
        items: 3,
        total: "$249.99",
        status: "pending",
    },
    {
        id: "ORD-8A3F4E",
        customer: "Alice Johnson",
        date: "2023-10-27",
        items: 3,
        total: "$249.99",
        status: "canceled",
    },
];

const tableHeaders = [
    "Order ID",
    "Customer Name",
    "Creation Date",
    "Product Summary",
    "Total value",
    "Order Status",
    "Actions",
];

const OrdersPage = () => {
    const [filter, setFilter] = useState("all");

    const shipped = (
        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-green-50 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-status-shipped">
            <div className="size-2 bg-green-500 rounded-full"></div>
            Shipped
        </div>
    );

    const pending = (
        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-orange-50 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 text-status-shipped">
            <div className="size-2 bg-orange-500 rounded-full"></div>
            pending
        </div>
    );

    const processing = (
        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-blue-50 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-status-shipped">
            <div className="size-2 bg-blue-500 rounded-full"></div>
            processing
        </div>
    );

    const canceled = (
        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-red-50 text-red-800 dark:bg-red-900/40 dark:text-red-300 text-status-shipped">
            <div className="size-2 bg-red-500 rounded-full"></div>
            canceled
        </div>
    );

    const delivered = (
        <div className="inline-flex items-center gap-2 rounded-full py-1 px-3 text-xs font-medium bg-teal-50 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300 text-status-shipped">
            <div className="size-2 bg-teal-500 rounded-full"></div>
            delivered
        </div>
    );

    return (
        <div>
            {/* page heading */}
            <div className="flex flex-wrap justify-between gap-4 items-center mb-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl lg:text-4xl font-black tracking-tight">
                        Manage Customer Orders
                    </h1>
                    <p className="text-base font-normal text-primary-light d">
                        View, track, and update all incoming and processed
                        orders.
                    </p>
                </div>
                <Button className="flex items-center justify-center gap-2 rounded-lg bg-primary text-white h-10 px-4 text-sm font-medium shadow-sm hover:opacity-90 transition-opacity cursor-pointer">
                    <Plus size={20} />
                    <span>New Order</span>
                </Button>
            </div>

            {/* action bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* <!-- SearchBar --> */}
                <div className="flex-grow">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                        <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div className="text-primary-light flex border-none bg-gray-200 dark:bg-dark-2 items-center justify-center pl-4 rounded-l-lg border-r-0 pr-4 cursor-pointer">
                                <Search size={18} />
                            </div>
                            <Input
                                placeholder="Search by Customer Name or Order ID..."
                                className="overflow-hidden rounded-none px-4 pl-2 dark:text-primary-light h-full flex w-full flex-1 resize-none placeholder:text-primary-light bg-dark-2 ring-0 focus:outline-0 focus:ring-0 border-none focus:border-none rounded-r-lg"
                            />
                        </div>
                    </label>
                </div>
                {/* Filters */}
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger className="bg-dark-2 p-3 rounded-md cursor-pointer flex items-center gap-2">
                            Filter By{" "}
                            <span className="text-primary-light">
                                ( {filter} )
                            </span>{" "}
                            <ChevronDown />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-dark-2 p-2 border border-dark rounded-md">
                            {orderStatuses.map((status) => (
                                <DropdownMenuItem
                                    onClick={() => setFilter(status.value)}
                                    className="p-2 cursor-pointer hover:bg-primary-light rounded-md hover:text-dark-2"
                                    key={status.value}
                                >
                                    {status.name}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* product data table */}
            <div className="bg-white dark:bg-[#111c22] rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 dark:text-gray-400 uppercase bg-gray-50 dark:bg-dark-2 border-b dark:border-gray-800">
                            <tr>
                                {tableHeaders.map((header) => {
                                    return (
                                        <th
                                            className="px-4 py-3 text-left text-sm font-medium whitespace-nowrap uppercase"
                                            key={header}
                                        >
                                            {header}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            {mockOrders.map((order) => {
                                return (
                                    <tr className="border-t border-border-light dark:border-border-dark dark:hover:bg-dark-2">
                                        <td className="h-[72px] px-4 py-2 text-sm font-normal text-primary-light">
                                            {order.id}
                                        </td>
                                        <td className="h-[72px] px-4 py-2 text-sm font-medium">
                                            {order.customer}
                                        </td>
                                        <td className="h-[72px] px-4 py-2 text-sm font-normal text-primary-light">
                                            {order.date}
                                        </td>
                                        <td className="h-[72px] px-4 py-2 text-sm font-normal text-primary-light">
                                            {order.items} items
                                        </td>
                                        <td className="h-[72px] px-4 py-2 text-sm font-medium">
                                            {order.total}
                                        </td>
                                        <td className="h-[72px] px-4 py-2">
                                            {order.status === "pending"
                                                ? pending
                                                : order.status === "processing"
                                                ? processing
                                                : order.status === "shipped"
                                                ? shipped
                                                : order.status === "delivered"
                                                ? delivered
                                                : canceled}
                                        </td>
                                        <td className="h-[72px] px-4 py-2 text-sm font-bold tracking-wide">
                                            <a
                                                className="text-primary hover:underline"
                                                href="#"
                                            >
                                                View Details
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default OrdersPage;
