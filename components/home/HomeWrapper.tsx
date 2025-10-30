import Link from "next/link";
import React from "react";

const HomeWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="home-wrapper">
            <nav>
                <h1>Nav</h1>
                <Link href="/">Home</Link>
                <Link href="/trace">Trace</Link>
                <Link href="/saved-traces">Saved Traces</Link>
                <Link href="/business-portal">Business Portal</Link>
            </nav>
            {children}
            <footer>this is the footer</footer>
        </div>
    );
};

export default HomeWrapper;
