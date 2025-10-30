import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

const DashboardRecentOrders = () => {
    return (
        <div className="">
            <div className="">
                {/* <!-- SectionHeader for Recent Orders --> */}
                <div className="flex justify-between items-center px-4 pb-3 pt-5">
                    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                        Recent Orders
                    </h2>
                    <Link
                        className="text-sm font-medium text-primary"
                        href="/business-portal/orders"
                    >
                        View All
                    </Link>
                </div>
                {/* <!-- Orders Table --> */}
                <div className="bg-[#111c22] rounded-xl border border-[#325567]">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-[#325567]">
                                <tr>
                                    <th className="p-4 text-sm font-semibold text-white">
                                        Order ID
                                    </th>
                                    <th className="p-4 text-sm font-semibold text-white">
                                        Customer
                                    </th>
                                    <th className="p-4 text-sm font-semibold text-white">
                                        Date
                                    </th>
                                    <th className="p-4 text-sm font-semibold text-white">
                                        Amount
                                    </th>
                                    <th className="p-4 text-sm font-semibold text-white">
                                        Status
                                    </th>
                                    <th className="p-4 text-sm font-semibold text-white"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#233c48]">
                                <tr>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        #ORD-0128
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        Liam Johnson
                                    </td>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        Mar 15, 2024
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        $250.00
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                            Delivered
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        <button className="text-[#92b7c9] hover:text-white">
                                            <EllipsisVertical />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        #ORD-0127
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        Olivia Smith
                                    </td>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        Mar 14, 2024
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        $150.75
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                                            In Transit
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        <button className="text-[#92b7c9] hover:text-white">
                                            <EllipsisVertical />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        #ORD-0126
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        Noah Williams
                                    </td>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        Mar 14, 2024
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        $35.00
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/20 text-orange-400">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        <button className="text-[#92b7c9] hover:text-white">
                                            <EllipsisVertical />
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        #ORD-0125
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        Emma Brown
                                    </td>
                                    <td className="p-4 text-sm text-[#92b7c9]">
                                        Mar 13, 2024
                                    </td>
                                    <td className="p-4 text-sm text-white font-medium">
                                        $89.99
                                    </td>
                                    <td className="p-4 text-sm">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                                            Delivered
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-right">
                                        <button className="text-[#92b7c9] hover:text-white">
                                            <EllipsisVertical />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardRecentOrders;
