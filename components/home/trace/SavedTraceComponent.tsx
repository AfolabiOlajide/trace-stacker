import { Input } from "@/components/ui/input";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MapPin,
    RotateCcw,
    Search,
    Trash,
} from "lucide-react";

const SavedTraceComponent = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* search component */}
            <div className="px-4 py-3">
                <label className="flex flex-col min-w-40 h-12 w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                        <div className="text-primary-light flex border-none bg-gray-200 dark:bg-dark-2 items-center justify-center pl-4 rounded-l-lg border-r-0 pr-4 cursor-pointer">
                            <Search size={18} />
                        </div>
                        <Input
                            placeholder="Search by Product Name, Order ID..."
                            className="overflow-hidden rounded-none px-4 pl-2 dark:text-primary-light h-full flex w-full flex-1 resize-none placeholder:text-primary-light bg-dark-2 ring-0 focus:outline-0 focus:ring-0 border-none focus:border-none rounded-r-lg"
                        />
                        {/* <input
                            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-r-lg text-white focus:outline-0 focus:ring-0 border-none bg-dark-2 focus:border-none h-full placeholder:text-[#92b7c9] px-4 pl-2 text-base font-normal leading-normal font-display"
                            placeholder="Search by Product Name, Order ID..."
                            value=""
                        /> */}
                    </div>
                </label>
            </div>

            {/* filter component */}
            <div className="flex gap-3 px-4 overflow-x-auto pb-2">
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary pl-4 pr-2">
                    <p className="text-white text-sm font-medium leading-normal font-display">
                        All Items
                    </p>
                </button>
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-dark-2 hover:bg-dark pl-3 pr-2">
                    <p className="text-white text-sm font-medium leading-normal font-display">
                        Type
                    </p>
                    <ChevronDown size={15} />
                </button>
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-dark-2 hover:bg-dark pl-3 pr-2">
                    <p className="text-white text-sm font-medium leading-normal font-display">
                        Status
                    </p>
                    <ChevronDown size={15} />
                </button>
                <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-dark-2 hover:bg-dark pl-3 pr-2">
                    <p className="text-white text-sm font-medium leading-normal font-display">
                        Date Range
                    </p>
                    <ChevronDown size={15} />
                </button>
            </div>

            <div className="flex items-center justify-between px-4 pb-2 pt-4">
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] font-display">
                    Showing 3 Saved Items
                </h3>
                <button className="flex items-center justify-center gap-x-2 rounded-lg pl-3 pr-2 text-sm text-primary-light hover:text-dark">
                    <p className="font-medium leading-normal">
                        Sort by: Last Updated
                    </p>
                    <ChevronDown size={15} />
                </button>
            </div>

            {/* card items */}
            <div className="flex flex-col gap-4 px-4">
                {/* <!-- Item Card 1 --> */}
                <div className="bg-[#1a2931] rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start border border-[#233c48]">
                    <img
                        className="w-full sm:w-28 h-auto sm:h-28 rounded-lg object-cover"
                        data-alt="A vintage camera on a white background."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmUKFisJn8ULoSbB07ra51aWssllZnYw0suLWPJMkU7ea9ysqD1JOSaldcefJT05hLm5TcRIYAZQNtZUZSnbKx8sAg4KF1KGKXe3w0s8Kb5Du2TXENnFhpzma8Tz4X1W6NTE59sCdsHQFGFGQbanPGG3HFUZM8VggvRz8Gb3BWIb5RlkX_xJtuHNdqUhBPyXBdFG1k3Kdpjmxc2_dLLE4Qotai6bm_tVJuNmi6DDR10zbsV53tT_RNBLxJe8EL0ZJHA_S8YhihMu0"
                    />
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-[#92b7c9]">
                                    Product
                                </p>
                                <h4 className="text-white text-lg font-bold">
                                    Vintage Camera Model X
                                </h4>
                                <p className="text-xs text-[#6a8a9c] font-mono mt-1">
                                    Batch ID: #VCX-84B2-19Z7
                                </p>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-full bg-yellow-500/10 text-yellow-400">
                                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                                <p className="text-xs font-semibold">
                                    In Transit
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-[#233c48] pt-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-[#92b7c9]">
                                <MapPin size={20} />
                                <span>Current Location: Shanghai Port</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#92b7c9]">
                                <RotateCcw size={20} />
                                <span>Last Update: 2 hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button className="flex-grow w-full items-center justify-center h-10 px-4 text-sm font-bold rounded-lg bg-primary hover:bg-primary/90 text-white">
                            View Details
                        </button>
                        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#233c48] hover:bg-[#2e4a5a] text-white">
                            <Trash size={20} />
                        </button>
                    </div>
                </div>
                {/* <!-- Item Card 2 --> */}
                <div className="bg-[#1a2931] rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start border border-[#233c48]">
                    <img
                        className="w-full sm:w-28 h-auto sm:h-28 rounded-lg object-cover"
                        data-alt="A pair of red and white running shoes."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnmK2Ot34BaplSsMz43BZsP8i0mXQsgV2iINmVtky1uw_4NXaKitaWpJdrVdOEj-EcPt_qFSL2ErbcMfKkUmKt2paD8G99XC2SE7GjU3Y6mTQJv7Jz1mcfl5oNAs9e8tSdGN086qPlZnUgtHqVIkVELoKJcYwGcoftz62dmCy237G3-rFXC9goxQly-givSk1fdi1h0d1a2oBEpKVQXBeGxIt_ArtknFeFnEB_CNqUWPTTSwOqtv4fsiR7y-lyBj8qtAJX5DSaKww"
                    />
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-[#92b7c9]">
                                    Order
                                </p>
                                <h4 className="text-white text-lg font-bold">
                                    Athletic Sneakers Shipment
                                </h4>
                                <p className="text-xs text-[#6a8a9c] font-mono mt-1">
                                    Order #: 2024-ORD-3810
                                </p>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-full bg-green-500/10 text-green-400">
                                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                                <p className="text-xs font-semibold">
                                    Delivered
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-[#233c48] pt-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-[#92b7c9]">
                                <MapPin size={20} />
                                <span>Final Destination: NYC Warehouse</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#92b7c9]">
                                <RotateCcw size={20} />
                                <span>Last Update: 1 day ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button className="flex-grow w-full items-center justify-center h-10 px-4 text-sm font-bold rounded-lg bg-primary hover:bg-primary/90 text-white">
                            View Details
                        </button>
                        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#233c48] hover:bg-[#2e4a5a] text-white">
                            <Trash size={20} />
                        </button>
                    </div>
                </div>
                {/* <!-- Item Card 3 --> */}
                <div className="bg-[#1a2931] rounded-xl p-4 flex flex-col sm:flex-row gap-4 items-start border border-[#233c48]">
                    <img
                        className="w-full sm:w-28 h-auto sm:h-28 rounded-lg object-cover"
                        data-alt="A pair of black headphones on a yellow background."
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOk6LPNU7wlzqaholRQCABTI2GzwHW66wHunVhXM7e2GunWv4mPXnbG5Ea4UYQz3JaBdiZniD71gvlYE3NPi5IV_RwPe75o46a1WGg4cQD1RZB3m-B12QkSkcJww_vENLVb8H1sMiIKnY3KWWNu8nPirUc0PCTj6A7WGRAZqEkTcfuC-cfbp8MSAYWTc8c6WIGph4ijKtG87MKqVIERZwvZYgELyabk-zxLcFQ9PfenIEP94B_VjG382i67CP6cKRComL0pORhzzU"
                    />
                    <div className="flex-grow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-[#92b7c9]">
                                    Product
                                </p>
                                <h4 className="text-white text-lg font-bold">
                                    Studio Headphones Pro
                                </h4>
                                <p className="text-xs text-[#6a8a9c] font-mono mt-1">
                                    Batch ID: #SHP-45C3-78A1
                                </p>
                            </div>
                            <div className="flex items-center gap-2 p-1.5 rounded-full bg-red-500/10 text-red-400">
                                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                                <p className="text-xs font-semibold">
                                    Alert: Delayed
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 border-t border-[#233c48] pt-3 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div className="flex items-center gap-2 text-sm text-[#92b7c9]">
                                <MapPin size={20} />
                                <span>Current Location: Customs Hold</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-[#92b7c9]">
                                <RotateCcw size={20} />
                                <span>Last Update: 5 hours ago</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button className="flex-grow w-full items-center justify-center h-10 px-4 text-sm font-bold rounded-lg bg-primary hover:bg-primary/90 text-white">
                            View Details
                        </button>
                        <button className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-lg bg-[#233c48] hover:bg-[#2e4a5a] text-white">
                            <Trash size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* pagination controls */}
            <div className="flex justify-center items-center gap-2 p-4 mt-4">
                <button className="size-9 flex items-center justify-center rounded-lg bg-dark-2 text-primary-light hover:bg-primary hover:text-white">
                    <ChevronLeft size={20} />
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white font-bold text-sm">
                    1
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-dark-2 text-primary-light hover:bg-primary hover:text-white font-bold text-sm">
                    2
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-dark-2 text-primary-light hover:bg-primary hover:text-white font-bold text-sm">
                    3
                </button>
                <span className="text-[#6a8a9c]">...</span>
                <button className="size-9 flex items-center justify-center rounded-lg bg-dark-2 text-primary-light hover:bg-primary hover:text-white font-bold text-sm">
                    8
                </button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-dark-2 text-primary-light hover:bg-primary hover:text-white">
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default SavedTraceComponent;
