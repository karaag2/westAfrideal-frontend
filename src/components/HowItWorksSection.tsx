"use client";
import { Card } from "@/src/components/ui/card";
import { BarChart3, Search, TrendingUp } from "lucide-react";
import React, { useState } from "react";

const HowItWorksSection = () => {
	const [listings, setListings] = useState<Listing[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	return (
		<div className="">
			{/* How it Works Section */}
			{listings.length === 0 && !isLoading && (
				<div className="mx-auto mt-16 max-w-4xl">
					<h2 className="mb-12 font-bold text-primary text-3xl text-center">
						How It Works
					</h2>
					<div className="gap-8 grid grid-cols-1 md:grid-cols-3">
						<Card className="bg-gradient-card shadow-card p-6 text-center">
							<div className="flex justify-center items-center bg-primary mx-auto mb-4 rounded-full w-12 h-12">
								<Search className="w-6 h-6 text-primary-foreground" />
							</div>
							<h3 className="mb-2 font-semibold text-xl">1. Search</h3>
							<p className="text-muted-foreground">
								Enter what you're looking for and select cities to compare
								prices across.
							</p>
						</Card>

						<Card className="bg-gradient-card shadow-card p-6 text-center">
							<div className="flex justify-center items-center bg-accent mx-auto mb-4 rounded-full w-12 h-12">
								<BarChart3 className="w-6 h-6 text-accent-foreground" />
							</div>
							<h3 className="mb-2 font-semibold text-xl">2. Compare</h3>
							<p className="text-muted-foreground">
								View detailed price comparisons and analytics across all
								selected cities.
							</p>
						</Card>

						<Card className="bg-gradient-card shadow-card p-6 text-center">
							<div className="flex justify-center items-center bg-success mx-auto mb-4 rounded-full w-12 h-12">
								<TrendingUp className="w-6 h-6 text-success-foreground" />
							</div>
							<h3 className="mb-2 font-semibold text-xl">3. Save</h3>
							<p className="text-muted-foreground">
								Find the best deals and connect directly with sellers on
								Facebook Marketplace.
							</p>
						</Card>
					</div>
				</div>
			)}
		</div>
	);
};

export default HowItWorksSection;
