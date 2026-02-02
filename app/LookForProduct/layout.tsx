import React, {ReactNode} from "react";
import {SearchProvider} from "@/src/components/providers";
import type {Metadata} from "next";

type PropType = {
    children: ReactNode;
    Navigation: ReactNode;
    modal: ReactNode;
};
export const metadata: Metadata = {
    title: "WestAfrideal Search",
    description: "Search your product and find the best deals",
};
const Layout = (props: PropType) => {
    return (
        <div className="flex-1 flex flex-col lg:flex-row bg-white dark:bg-zinc-950 min-h-screen">
            <SearchProvider>
                {/* Navigation / Sidebar - Truly Fixed/Sticky on Desktop */}
                <aside className="w-full lg:w-96 lg:sticky lg:top-20 lg:h-[calc(100vh-80px)] border-r border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 overflow-y-auto custom-scrollbar z-30">
                    {props.Navigation}
                </aside>

                {/* Main Results Area - Scrolls Naturally */}
                <main className="flex-1 bg-dot-pattern min-h-full">
                    <div className="p-8 lg:p-12 pb-32">
                        {props.children}
                        {props.modal}
                    </div>
                </main>
            </SearchProvider>
        </div>
    );
};

export default Layout;
