import HowItWorksSection from "@/src/components/HowItWorksSection";
// import { SearchForm } from "@/src/components/SearchForm";
import { Card } from "@/src/components/ui/card";
import { BarChart3, Search, TrendingUp } from "lucide-react";
import React from "react";
import clsx from "clsx";
import { Bubblegum_Sans } from "next/font/google";
import SearchForm from "@/src/components/SearchForm";
const bubblegum = Bubblegum_Sans({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-bubble",
});
const SearchingProduct = () => {
	const handleSearch = () => {};
	return (
		<div className="my-12 px-12 min-h-screen">
			<h1 className={clsx("mb-8 font-bold text-primary text-6xl text-center")}>
				Find your product at the best price
			</h1>
			<div className="mx-auto mb-8 max-w-2xl">
				{/* <SearchForm /> */}
				<SearchForm />
			</div>
			<HowItWorksSection />
		</div>
	);
};

export default SearchingProduct;
