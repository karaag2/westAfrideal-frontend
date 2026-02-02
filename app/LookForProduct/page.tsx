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
		<div className="w-full space-y-12">
            {/* Real-time Results List */}
            <Results />

            {/* Educational Section - Only shows when no results or first load */}
            <div className="pt-20 border-t border-slate-100 dark:border-white/5 opacity-50 hover:opacity-100 transition-opacity">
			    <HowItWorksSection />
            </div>
		</div>
	);
};

export default SearchingProduct;
