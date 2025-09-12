"use client";
import React from "react";
import { Bubblegum_Sans } from "next/font/google";
import { CgMore } from "react-icons/cg";
import { MdMore } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { BiMenu } from "react-icons/bi";
import { ArrowBigDownIcon, ArrowDownLeftFromCircle } from "lucide-react";
// import clsx from "clsx";

import { useState } from "react";
import clsx from "clsx";
import Link from "next/link";
const bubblegum = Bubblegum_Sans({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-bubble",
});
const sections = [
	{ name: "Home", href: "/LookForProduct" },
	{ name: "Contact", href: "#" },
	{ name: "About", href: "#" },
];

export const NavBar = () => {
	const [menu, setMenu] = useState(false);
	return (
		<nav
			className={`bg-primary  font-bubble flex items-center text-accent relative"
				${bubblegum.className}
			`}
		>
			{!menu && (
				<button
					type="button"
					className="lg:hidden flex items-center text-[24px] md:text-6xl"
					onClick={() => setMenu(!menu)}
				>
					<BiMenu />
				</button>
			)}
			<ul className="hidden lg:flex gap-8 text-2xl">
				{sections.map((section) => (
					<li key={section.name} className="hover:underline">
						<Link href={section.href}>{section.name}</Link>
					</li>
				))}
			</ul>
			{
				<ul
					className={clsx(
						"top-0 -right-12 absolute flex-col gap-8 bg-black/40 pt-2 rounded-tl-4xl sm:min-w-64 max-w-1/2 h-screen text-white text-2xl",
						"transition-all duration-500 ease-in-out transform ",
						menu ? "flex visible" : "translate-x-full  hidden",
					)}
				>
					<button
						type="button"
						className="left relative flex justify-end items-center pr-22 pl-4 text-4xl sm:text-6xl"
						onClick={() => setMenu(!menu)}
					>
						{"<"}
					</button>
					{sections.map((section) => (
						<li
							key={section.name}
							className="sm:pr-12 text-center hover:underline"
						>
							<Link href={section.href}>{section.name}</Link>
						</li>
					))}
				</ul>
			}
		</nav>
	);
};
