import React from "react";
import HomeNavigation from "./HomeNavigation";
import HomeFooter from "./HomeFooter";

const HomeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="home-wrapper">
            <HomeNavigation />
            <main className="flex flex-1 justify-center py-5">
                <div className="flex flex-col w-full max-w-5xl px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
            <HomeFooter />
        </div>
    );
};

export default HomeWrapper;
