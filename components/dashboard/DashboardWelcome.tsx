import { ArrowDown, ArrowUp } from "lucide-react";

const DashboardWelcome = () => {
    return (
        <div>
            {/* page heading */}
            <div className="flex flex-wrap justify-between gap-3 mb-6">
                <div className="flex min-w-72 flex-col gap-2">
                    <p className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                        Welcome back, Innovate Inc.
                    </p>
                    <p className="text-primary-light text-base font-normal leading-normal">
                        Here is an overview of your supply chain activities.
                    </p>
                </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-dark ">
                    <p className="text-white text-base font-medium leading-normal">
                        Total Products
                    </p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">
                        1,204
                    </p>
                    <p className="text-[#0bda57] text-sm font-medium leading-normal flex items-center gap-1">
                        <ArrowUp size={20} /> +2.5%
                    </p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-dark ">
                    <p className="text-white text-base font-medium leading-normal">
                        Pending Orders
                    </p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">
                        86
                    </p>
                    <p className="text-[#0bda57] text-sm font-medium leading-normal flex items-center gap-1">
                        <ArrowUp size={20} /> +10.1%
                    </p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-dark ">
                    <p className="text-white text-base font-medium leading-normal">
                        Items in Transit
                    </p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">
                        32
                    </p>
                    <p className="text-[#fa5f38] text-sm font-medium leading-normal flex items-center gap-1">
                        <ArrowDown size={20} /> -1.2%
                    </p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl p-6 border border-dark ">
                    <p className="text-white text-base font-medium leading-normal">
                        Revenue This Month
                    </p>
                    <p className="text-white tracking-light text-3xl font-bold leading-tight">
                        $45,890.00
                    </p>
                    <p className="text-[#0bda57] text-sm font-medium leading-normal flex items-center gap-1">
                        <ArrowUp size={20} /> +5.8%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DashboardWelcome;
