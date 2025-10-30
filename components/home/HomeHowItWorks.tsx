import { History, QrCode, ScanBarcode, ScanQrCode } from "lucide-react";

const HomeHowItWorks = () => {
    return (
        <section className="px-4 py-16" id="how-it-works">
            <div className="flex flex-col items-center text-center gap-4 mb-12">
                <h2 className="text-gray-900 dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em]">
                    How It Works
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                    Follow a product's journey from creation to consumer through
                    a simple, verifiable process on the blockchain.
                </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary">
                        <QrCode size={35} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        1. Register Product
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        A unique digital identity is created for each product
                        and recorded on the blockchain, linked to a physical tag
                        or QR code.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary">
                        <ScanQrCode size={35} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        2. Scan at Checkpoint
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        As the product moves through the supply chain, each
                        handler scans the tag to update its status and location
                        immutably.
                    </p>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center justify-center size-16 rounded-full bg-primary/20 text-primary">
                        <History size={35} className="text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        3. View Full History
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Consumers and businesses can scan the final product to
                        access its complete, verifiable journey from origin to
                        shelf.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default HomeHowItWorks;
