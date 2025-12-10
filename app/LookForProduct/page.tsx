import HowItWorksSection from "@/src/components/HowItWorksSection";
// import { SearchForm } from "@/src/components/SearchForm";
import { Card } from "@/src/components/ui/card";
import { BarChart3, Search, TrendingUp } from "lucide-react";
import React from "react";
import clsx from "clsx";
import { Bubblegum_Sans } from "next/font/google";
import SearchForm from "@/src/components/SearchForm";
import Results from "@/src/components/Results";
const bubblegum = Bubblegum_Sans({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-bubble",
});
const SearchingProduct = () => {
	return (
		<div className="w-full overflow-hidden">
			<div className="w-full overflow-clip">
				<div className="mx-auto px-12">
					<HowItWorksSection />
				</div>
			</div>
		</div>
	);
};

export default SearchingProduct;
