import SavedTraceComponent from "@/components/home/trace/SavedTraceComponent";

const SavedTraces = () => {
    return (
        <div>
            <div className="flex flex-wrap justify-between gap-4 px-4">
                <div className="flex min-w-72 flex-col gap-3">
                    <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] font-display">
                        My Saved Items
                    </p>
                    <p className="text-gray-500 dark:text-primary-light text-base font-normal leading-normal font-display">
                        View and manage all your saved products and orders for
                        continuous tracking.
                    </p>
                </div>
            </div>
            <SavedTraceComponent />
        </div>
    );
};

export default SavedTraces;
