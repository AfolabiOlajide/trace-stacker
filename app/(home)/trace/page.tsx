import TraceComponent from "@/components/home/trace/TraceComponent";

const TracePage = () => {
    return (
        <div>
            <div className="flex flex-col items-center text-center gap-4">
                <p className="text-text-light-primary dark:text-white text-4xl sm:text-5xl font-bold leading-tight tracking-[-0.033em]">
                    Trace Your Asset on the Blockchain
                </p>
                <p className="text-text-light-secondary dark:text-text-dark-secondary text-base font-normal leading-normal max-w-xl">
                    Enter your unique Product ID to see its complete, immutable
                    journey.
                </p>
            </div>
            <TraceComponent />
        </div>
    );
};

export default TracePage;
