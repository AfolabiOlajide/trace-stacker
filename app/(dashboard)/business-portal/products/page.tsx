"use client";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDown, EllipsisVertical, Search } from "lucide-react";
import { useState } from "react";

const productStatuses = [
    {
        name: "All",
        value: "all",
    },
    {
        name: "Delivered",
        value: "delivered",
    },
];

const ProductsPage = () => {
    const [filter, setFilter] = useState("all");
    return (
        <div>
            {/* page heading */}
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    Products
                </h1>
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
                                placeholder="Search by Product Name or ID..."
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
                            {productStatuses.map((status) => (
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
                                <th className="px-6 py-3" scope="col">
                                    Product ID
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Product Name
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Description
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Status
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Date Added
                                </th>
                                <th className="px-6 py-3" scope="col">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        {/* Body */}
                        <tbody>
                            <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-2">
                                {/* Product ID */}
                                <td className="px-6 py-4 font-mono text-xs text-primary dark:text-primary/90 hover:underline cursor-pointer truncate">
                                    PROD-0x...a1b2
                                </td>
                                {/* Product Name */}
                                <th
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                    scope="row"
                                >
                                    Organic Arabica Coffee Beans
                                </th>
                                {/* Description */}
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 truncate">
                                    Single-origin, fair trade certified...
                                </td>
                                {/* Status */}
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                        <span className="truncate">
                                            In Stock
                                        </span>
                                    </span>
                                </td>
                                {/* Date */}
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400 truncate">
                                    2024-10-26
                                </td>
                                {/* Actions */}
                                <td className="px-6 py-4">
                                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                        <EllipsisVertical />
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-2">
                                <td className="px-6 py-4 font-mono text-xs text-primary dark:text-primary/90 hover:underline cursor-pointer">
                                    PROD-0x...c3d4
                                </td>
                                <th
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                    scope="row"
                                >
                                    Premium Grade-A Lithium Batteries
                                </th>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    High-capacity cells for EVs...
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                                        <span className="w-2 h-2 me-1 bg-yellow-500 rounded-full"></span>
                                        <span className="truncate">
                                            In Transit
                                        </span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    2024-10-22
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                        <EllipsisVertical />
                                    </button>
                                </td>
                            </tr>
                            <tr className="border-b dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-dark-2">
                                <td className="px-6 py-4 font-mono text-xs text-primary dark:text-primary/90 hover:underline cursor-pointer">
                                    PROD-0x...e5f6
                                </td>
                                <th
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                    scope="row"
                                >
                                    Artisanal Swiss Chocolate
                                </th>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    {" "}
                                    ethically sourced cacao beans...
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                                        <span className="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                                        <span className="truncate">Sold</span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    2024-10-18
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                        <EllipsisVertical />
                                    </button>
                                </td>
                            </tr>
                            <tr className="hover:bg-gray-50 dark:hover:bg-dark-2">
                                <td className="px-6 py-4 font-mono text-xs text-primary dark:text-primary/90 hover:underline cursor-pointer">
                                    PROD-0x...g7h8
                                </td>
                                <th
                                    className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                                    scope="row"
                                >
                                    Industrial Grade Sensors
                                </th>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    IoT-enabled for real-time tracking...
                                </td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                                        <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                        <span className="truncate">
                                            In Stock
                                        </span>
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                                    2024-10-15
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700/50">
                                        <EllipsisVertical />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <!-- Pagination --> */}
                {/* <nav
                    aria-label="Table navigation"
                    className="flex items-center justify-between p-4"
                >
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        Showing{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            1-4
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-gray-900 dark:text-white">
                            100
                        </span>
                    </span>
                    <ul className="inline-flex -space-x-px text-sm h-8">
                        <li>
                            <a
                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-[#111c22] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-white"
                                href="#"
                            >
                                Previous
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center justify-center px-3 h-8 text-primary border border-gray-300 bg-primary/10 hover:bg-primary/20 dark:border-gray-700 dark:bg-[#233c48] dark:text-white"
                                href="#"
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-[#111c22] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-white"
                                href="#"
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-[#111c22] dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700/50 dark:hover:text-white"
                                href="#"
                            >
                                Next
                            </a>
                        </li>
                    </ul>
                </nav> */}
            </div>
        </div>
    );
};

export default ProductsPage;
