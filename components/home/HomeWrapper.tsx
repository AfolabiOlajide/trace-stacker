import Link from "next/link";
import React from "react";
import HomeNavigation from "./HomeNavigation";

const HomeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="home-wrapper">
            <HomeNavigation />
            {children}
            <footer>this is the footer</footer>
        </div>
    );
};

export default HomeWrapper;
