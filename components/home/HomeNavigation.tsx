import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Menu } from "lucide-react";

const navlinks = [
    {
        name: "Features",
        href: "#features",
    },
    {
        name: "How It Works",
        href: "#how-it-works",
    },
    {
        name: "Use Cases",
        href: "#use-cases",
    },
    {
        name: "Trace",
        href: "/trace",
    },
    {
        name: "Saved Traces",
        href: "/saved-traces",
    },
    {
        name: "Business Portal",
        href: "/business-portal",
    },
];

const HomeNavigation = () => {
    return (
        <nav className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200/10 dark:border-[#233c48] bg-background-light/80 dark:bg-background-dark/80 px-4 sm:px-10 py-3 backdrop-blur-sm">
            <Link href="/">
                <div className="flex items-center gap-4 text-gray-900 dark:text-white">
                    <div className="size-6 text-primary">
                        <svg
                            fill="none"
                            viewBox="0 0 48 48"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
                        TraceStacker
                    </h2>
                </div>
            </Link>
            <div className="hidden md:flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    {navlinks.map((link) => (
                        <Link
                            key={link.href}
                            className="text-sm font-medium leading-normal text-gray-700 dark:text-gray-300 hover:text-primary"
                            href={link.href}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                {/* mode toggle */}
                <ModeToggle />
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity">
                    <span className="truncate">Connect Wallet</span>
                </button>
            </div>
            <button className="md:hidden flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                <Menu size={35} className="text-primary" />
            </button>
        </nav>
    );
};

export default HomeNavigation;
