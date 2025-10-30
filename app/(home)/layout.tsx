import HomeWrapper from "@/components/home/HomeWrapper";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <HomeWrapper>{children}</HomeWrapper>
        </>
    );
};

export default HomeLayout;
