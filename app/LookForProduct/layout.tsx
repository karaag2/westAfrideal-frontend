import React, {ReactNode} from "react";
import {SearchProvider} from "@/src/components/providers";
import type {Metadata} from "next";

type PropType = {
    children: ReactNode;
    ResultPage: ReactNode;
    Navigation: ReactNode;
};
export const metadata: Metadata = {
    title: "WestAfrideal Search",
    description: "Search your product and find the best deals",
};
const Layout = (props: PropType) => {
    return (
        <div className="flex-1 flex">
            <SearchProvider>

                <div className="flex w-fit">{props.Navigation}</div>
                <div className="flex flex-col overflow-y-clip">
                    {props.ResultPage}
                    {props.children}
                </div>
            </SearchProvider>

        </div>
    );
};

export default Layout;
