import Link from "next/link";
import React from "react";

const HomeHero = () => {
    return (
        <section className="@container py-10 md:py-16">
            <div className="@[480px]:p-4">
                <div
                    className="flex min-h-[280px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center text-center px-4 py-10 @[480px]:px-10"
                    data-alt="Abstract background image with connected nodes and lines, representing a blockchain network."
                >
                    <div className="flex flex-col gap-4 max-w-3xl">
                        <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                            The Future of Supply Chain Transparency
                        </h1>
                        <h2 className="text-gray-600 dark:text-gray-200 text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">
                            TraceStacker leverages blockchain technology to
                            provide immutable, end-to-end traceability for every
                            product in your supply chain.
                        </h2>
                    </div>
                    <div className="flex flex-row flex-wrap gap-4 justify-center">
                        <Link href="/business-portal">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:opacity-90 transition-opacity">
                                <span className="truncate">
                                    Business Portal
                                </span>
                            </button>
                        </Link>
                        <Link href="/trace">
                            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-gray-700/50 dark:bg-[#233c48] text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-gray-600/50 dark:hover:bg-[#325567] transition-colors">
                                <span className="truncate">
                                    Trace a Product
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
