"use client";
import React from "react";
import {Roboto} from "next/font/google";
import {BiMenu} from "react-icons/bi";
import {useState} from "react";
import clsx from "clsx";
import Link from "next/link";
import {Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle} from "@/components/ui/sheet";
import {SheetOverlay} from "@/src/components/ui/sheet";

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["900"],
});
const sections = [
    {name: "Home", href: "/LookForProduct"},
    {name: "Contact", href: "#"},
    {name: "About", href: "#"},
];

export const NavBar = () => {
    const [menu, setMenu] = useState(false);
    return (
        <nav
            className={`bg-primary  font-bubble flex items-center text-accent relative"
				// ${roboto.className}
			`}
        >
            <ul className="hidden lg:flex gap-8 text-2xl">
                {sections.map((section) => (
                    <li key={section.name} className="hover:underline">
                        <Link href={section.href}>{section.name}</Link>
                    </li>
                ))}
            </ul>
            {<div>
                <Sheet>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            className="lg:hidden flex items-center text-[24px] md:text-6xl"
                            onClick={() => setMenu(!menu)}
                        >
                            <BiMenu/>
                        </button>
                    </SheetTrigger>
                    <SheetOverlay className={"bg-red-700/0"}>

                    </SheetOverlay>
                    <SheetContent className={"bg-primary"}>
                        <SheetHeader>
                            <SheetTitle>
                                <p className={'text-center text-xl font-bold text-accent'}>Menu</p>
                            </SheetTitle>
                        </SheetHeader>

                        <ul
                            className={clsx(
                                " flex-col gap-8  pt-2 rounded-tl-4xl  text-white text-2xl",
                                "transition-all duration-500 ease-in-out transform ",
                            )}
                        >
                            {sections.map((section) => (
                                <li
                                    key={section.name}
                                    className="sm:pr-12 text-center hover:underline border-b "
                                >
                                    <Link href={section.href}>{section.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </SheetContent>

                </Sheet>

            </div>

            }
        </nav>
    );
};
