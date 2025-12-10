import SearchForm from "@/src/components/SearchForm";
import clsx from "clsx";
import React from "react";
import {Sheet, SheetTrigger, SheetContent, SheetTitle} from "@/src/components/ui/sheet";
import {SheetClose, SheetFooter} from "@/components/ui/sheet";
import {Button} from "@/src/components/ui/button";

const SideBar = () => {
    return (
        <>
            {/* Mobile & Tablet: show a floating button that opens a Sheet */}
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            aria-label="Open filters"
                            className="fixed bottom-10 md:bottom-18 right-6 z-50 p-3 rounded-full bg-primary text-background shadow-lg"
                        >
                            Search Options
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className={clsx("bg-primary px-2")}>

                        <SheetTitle className={clsx("text-white", "text-2xl text-center font-bold")}>
                            Search options
                        </SheetTitle>
                        <div className="flex flex-col bg-primary">
                            <h1 className={clsx("my-6 px-6 font-bold text-accent text-xl")}>
                                Find your product at the best price
                            </h1>
                            <div className="">
                                <SearchForm/>
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose>
                                <p
                                    className={"w-full bg-accent rounded-md text-lg font-medium py-2 text-primary "}>close</p>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>

                </Sheet>
            </div>

            {/* Desktop (large and up): keep the sidebar visible */}
            <div
                className="hidden lg:flex left-0 sticky flex-col bg-primary shadow-2xl border-accent border-r-2 w-fit max-w-sm overflow-hidden h-full">
                <h1
                    className={clsx(
                        "my-8 px-6 font-bold text-accent text-xl text-center",
                    )}
                >
                    Find your product at the best price
                </h1>
                <div className="px-6">
                    <SearchForm/>
                </div>
            </div>
        </>
    );
};

export default SideBar;
