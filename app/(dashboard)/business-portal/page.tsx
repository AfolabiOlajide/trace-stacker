import DashboardRecentOrders from "@/components/dashboard/DashboardRecentOrders";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";

const BusinessPortalDashboard = () => {
    return (
        <div>
            <DashboardWelcome />
            <DashboardRecentOrders />
        </div>
    );
};

export default BusinessPortalDashboard;
