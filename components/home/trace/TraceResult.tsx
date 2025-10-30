import {
    Anvil,
    BadgeCheck,
    Calendar,
    CircleCheckBig,
    Link2,
    MapPin,
    TruckElectric,
} from "lucide-react";

const TraceResult = () => {
    return (
        <div className="flex flex-col gap-8 pt-8">
            {/* <!-- SectionHeader --> */}
            <h2 className=" dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4">
                Tracking Results
            </h2>
            {/* <!-- Product Summary Card --> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 rounded-xl border dark:border-dark bg-white dark:bg-dark-2">
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium ">Product Name</p>
                    <p className="font-bold  dark:text-white">
                        Organic Arabica Beans
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">ID</p>
                    <p className="font-mono text-sm font-bold  dark:text-white">
                        PROD-K4B7-9P2L
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Origin</p>
                    <p className="font-bold  dark:text-white">
                        Medellín, Colombia
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Status</p>
                    <div className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-green-400"></span>
                        <p className="font-bold text-green-400">Delivered</p>
                    </div>
                </div>
            </div>
            {/* <!-- Vertical Timeline --> */}
            <div className="relative pl-8 border-l-2 border-dashed border-dark/30 dark:border-dark ml-4">
                {/* <!-- Timeline Item: Delivered --> */}
                <div className="relative mb-10">
                    <div className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                        <CircleCheckBig size={18} />
                    </div>
                    <div className="p-5 rounded-lg border  dark:border-dark bg-white dark:bg-dark-2">
                        <h3 className="font-bold  dark:text-white">
                            Delivered to Customer
                        </h3>
                        <p className="text-sm  mt-1">
                            Final delivery confirmed at consumer's location.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />

                                <span>Oct 26, 2023, 11:45 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />

                                <span>Seattle, WA, USA</span>
                            </div>
                            <a
                                className="flex items-center gap-2 text-primary hover:underline"
                                href="#"
                            >
                                <Link2 size={18} />

                                <span>0x2d...a3c8</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <!-- Timeline Item: In Transit --> */}
                <div className="relative mb-10">
                    <div className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/20 text-orange-400">
                        <TruckElectric size={18} />
                    </div>
                    <div className="p-5 rounded-lg border dark:border-dark bg-white dark:bg-dark-2">
                        <h3 className="font-bold  dark:text-white">
                            Out for Delivery
                        </h3>
                        <p className="text-sm mt-1">
                            Product is on the final leg of its journey.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Oct 26, 2023, 08:12 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>Local Distribution Hub</span>
                            </div>
                            <a
                                className="flex items-center gap-2 text-primary hover:underline"
                                href="#"
                            >
                                <Link2 size={18} />
                                <span>0x5f...e4b1</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <!-- Timeline Item: Customs Cleared --> */}
                <div className="relative mb-10">
                    <div className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-purple-500/20 text-purple-400">
                        <BadgeCheck size={18} />
                    </div>
                    <div className="p-5 rounded-lg border dark:border-dark bg-white dark:bg-dark-2">
                        <h3 className="font-bold  dark:text-white">
                            Customs Cleared
                        </h3>
                        <p className="text-sm mt-1">
                            Package cleared by US Customs and Border Protection.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Oct 22, 2023, 03:20 PM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>Port of Seattle, USA</span>
                            </div>
                            <a
                                className="flex items-center gap-2 text-primary hover:underline"
                                href="#"
                            >
                                <Link2 size={18} />
                                <span>0x8c...b9d7</span>
                            </a>
                        </div>
                    </div>
                </div>
                {/* <!-- Timeline Item: Manufacturing --> */}
                <div className="relative mb-10">
                    <div className="absolute -left-12 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
                        <Anvil size={18} />
                    </div>
                    <div className="p-5 rounded-lg border dark:border-dark bg-white dark:bg-dark-2">
                        <h3 className="font-bold  dark:text-white">
                            Manufacturing Complete
                        </h3>
                        <p className="text-sm mt-1">
                            Product batch harvesting and processing finished.
                        </p>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-xs">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} />
                                <span>Oct 15, 2023, 09:00 AM</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin size={18} />
                                <span>Medellín, Colombia</span>
                            </div>
                            <a
                                className="flex items-center gap-2 text-primary hover:underline"
                                href="#"
                            >
                                <Link2 size={18} />
                                <span>0x1a...f6g2</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TraceResult;
