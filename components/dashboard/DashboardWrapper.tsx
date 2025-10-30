import Link from "next/link";
import React from "react";

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="dashboard-wrapper">
            <nav>
                <h1>Business Portal</h1>
                <Link href="/business-portal/">Dashboard</Link>
                <Link href="/business-portal/products">Products</Link>
                <Link href="/business-portal/orders">Orders</Link>
                <Link href="/business-portal/analytics">Analytics</Link>
            </nav>
            {children}
        </div>
    );
};

export default DashboardWrapper;
