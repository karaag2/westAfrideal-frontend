import React from 'react'
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {NavBar} from "@/src/components/ui/HomePage";
import {Bubblegum_Sans} from "next/font/google";
import Image from "next/image";
import waves from "@/public/wave.svg";
import waves2 from "@/public/wave copy.svg";
import Link from "next/link";

const bubblegum = Bubblegum_Sans({
    subsets: ["latin"],
    weight: ["400"],
    variable: "--font-bubble",
});

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "WestAfrideal",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 antialiased relative min-h-screen max-w-screen overflow-x-clip flex flex-col`}
        >
        {/* <Providers> */}
        <header
            className={`sticky fixed max-w-7xl rounded-b-2xl mx-auto top-0 w-full bg-primary flex font-bubble text-accent py-2 px-8 z-20 justify-between border-b-2
				${bubblegum.className}
			`}
        >
            <div>
                <Link href={"/"} className="hover:opacity-80">
                    <h1 className="text-2xl md:text-6xl">WestAfriDeal</h1>
                </Link>
            </div>
            <NavBar/>
        </header>

        <div className="max-w-7xl mx-auto flex-1 flex border">{children}</div>

        {/* </Providers> */}
        <footer className={"self-center fixed bottom-0 mx-auto max-w-7xl max-h-24"}>
            <Image
                src={waves}
                alt="marketplace"
                width={1920}
                height={1080}
                className="@[1025px]:hidden block "
            />{" "}
            <Image
                src={waves2}
                alt="marketplace"
                width={1920}
                height={1080}
                className="hidden @[1025px]:block -z-10   "
            />
        </footer>

        </body>
        </html>
    );
}
