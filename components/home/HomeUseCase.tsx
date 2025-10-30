import { Gem, Pill, Utensils } from "lucide-react";

const HomeUseCase = () => {
    return (
        <section className="px-4 py-16" id="use-cases">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    Industry Use Cases
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                    TraceStacker adapts to the unique needs of various
                    industries, ensuring authenticity and compliance.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-dark bg-white dark:bg-dark-2">
                    <Gem size={35} className="text-primary" />
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                        Luxury Goods
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Combat counterfeiting and verify the provenance of
                        high-value items, from watches to handbags.
                    </p>
                </div>
                <div className="p-6 flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-dark bg-white dark:bg-dark-2">
                    <Pill size={35} className="text-primary" />
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                        Pharmaceuticals
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Ensure drug safety and compliance by tracking medicines
                        from manufacturer to pharmacy, preventing fake drugs.
                    </p>
                </div>
                <div className="p-6 flex flex-col gap-3 rounded-xl border border-gray-200 dark:border-dark bg-white dark:bg-dark-2">
                    <Utensils size={35} className="text-primary" />
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                        Food &amp; Beverage
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Provide farm-to-table transparency, verify organic
                        claims, and manage recalls with precision and speed.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HomeUseCase;
