import { Input } from "@/components/ui/input";
import TraceResult from "./TraceResult";

const TraceComponent = () => {
    return (
        <section>
            <div className="flex flex-col sm:flex-row items-center gap-3 p-4 justify-center">
                <div className="flex w-full max-w-lg">
                    <label className="flex flex-col min-w-40 flex-1">
                        <Input
                            placeholder="Enter Product or Order ID"
                            className="focus:ring-2 focus:ring-teal-500/50 p-[15px] font-bold text-lg md:text-1xl h-14 leading-normal tracking-wider md:tracking-[.5rem]"
                        />
                    </label>
                </div>
                <div className="flex justify-start w-full sm:w-auto">
                    <button className="flex w-full sm:w-auto min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-colors">
                        <span className="truncate">Track</span>
                    </button>
                </div>
            </div>
            {/* Tracking Results Section */}
            <TraceResult />
        </section>
    );
};

export default TraceComponent;
