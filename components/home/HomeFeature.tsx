import { Boxes, MapPin, ShieldPlus, ThumbsUp } from "lucide-react";

const HomeFeature = () => {
    return (
        <section
            className="flex flex-col gap-10 px-4 py-16 @container"
            id="features"
        >
            <div className="flex flex-col gap-4 text-center items-center">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    Key Features
                </h2>
                <h3 className="text-gray-900 dark:text-white tracking-light text-3xl font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]">
                    Powering Trust with Technology
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base font-normal leading-normal max-w-[720px]">
                    Our platform is built on a secure, decentralized foundation
                    to bring unparalleled transparency and efficiency to your
                    operations.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-[#325567] bg-white dark:bg-[#192b33] p-6 flex-col text-center items-center">
                    <ShieldPlus size={35} className="text-primary" />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                            Decentralized &amp; Secure
                        </h4>
                        <p className="text-gray-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                            Built on a tamper-proof blockchain ledger, ensuring
                            data integrity and security at every step.
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-[#325567] bg-white dark:bg-[#192b33] p-6 flex-col text-center items-center">
                    <MapPin size={35} className="text-primary" />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                            Real-Time Tracking
                        </h4>
                        <p className="text-gray-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                            Monitor your products' journey from origin to
                            consumer with live updates and verifiable
                            checkpoints.
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-[#325567] bg-white dark:bg-[#192b33] p-6 flex-col text-center items-center">
                    <ThumbsUp size={35} className="text-primary" />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                            Enhanced Consumer Trust
                        </h4>
                        <p className="text-gray-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                            Provide consumers with the verifiable proof of
                            authenticity and ethical sourcing they demand.
                        </p>
                    </div>
                </div>
                <div className="flex flex-1 gap-4 rounded-xl border border-gray-200 dark:border-[#325567] bg-white dark:bg-[#192b33] p-6 flex-col text-center items-center">
                    <Boxes size={35} className="text-primary" />
                    <div className="flex flex-col gap-1">
                        <h4 className="text-gray-900 dark:text-white text-base font-bold leading-tight">
                            Immutable Records
                        </h4>
                        <p className="text-gray-500 dark:text-[#92b7c9] text-sm font-normal leading-normal">
                            Every transaction and movement is permanently
                            recorded, creating an unchangeable system of record.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeFeature;
