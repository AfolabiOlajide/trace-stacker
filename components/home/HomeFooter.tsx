import Link from "next/link";

const footerLinks = [
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

const HomeFooter = () => {
    return (
        <footer className="w-full  border-t border-gray-200/50 dark:border-[#233c48]">
            <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="size-5 text-primary">
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
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                            ©{new Date().getFullYear()} TraceStacker. All rights
                            reserved.
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.href}
                                className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                                href={link.href}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default HomeFooter;
