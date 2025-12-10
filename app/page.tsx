import React from "react";
import { Roboto } from "next/font/google";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700"] });
import clsx from "clsx";
import Image from "next/image";
import hero from "@/public/marketplace_1.png";
import mobilehero from "@/public/mobile-hero.png";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import { Search, BarChart3, TrendingUp } from "lucide-react";
const HomePage = () => {
	return (
		<main>
			<section>
				<div className="flex lg:flex-row-reverse flex-col my-6 lg:px-12 py-2 h-max">
					<div className="-top-38 sm:-top-52 -z-10 max-lg:relative flex max-lg:justify-center max-lg:bg-primary pt-40 sm:pt-52 md:pt-62 lg:pt-0 rounded-b-[60px] h-full w --10">
						<Image
							src={hero}
							alt="marketplace"
							width={2400}
							height={1200}
							className="hidden lg:block w-full h-full max-h-screen object-cover"
						/>
						<Image
							src={mobilehero}
							alt="mobile-hero"
							className="lg:hidden"
							height={1152}
							width={360}
						/>
					</div>
					<div className="-top-62 sm:-top-72 max-lg:relative flex flex-col justify-ce px-px w-full max-w-screen lg:max-w-1/3 h-fit max-lg:text-center -translate-y max-lg:translate-y-32 justfy-center sm:p">
						<h1
							className={clsx(
								"bg-clip-text bg-gradient-to-r from-[#0070F3] to-[#9557C7] font-bold text-transparent text-5xl 2xl:text-7xl",
								roboto.className,
							)}
						>
							Find the Best Deals
							<span className="block opacity-30 text-black/90">
								{" "}
								Across Cities
							</span>
						</h1>
						<p className="my-4 text-black/70 text-lg md:text-2xl lg:text-3xl">
							<strong>Compare Facebook Marketplace</strong> prices
							<br /> instantly across multiple cities. Never overpay again.
						</p>

						<div className="bg-gradient-hero text-primary">
							<div className="mx-auto px- py-4 sm:py-8 container">
								<div className="mx-auto max-w-4xl text-center">
									<div className="flex flex-wrap max-lg:justify-center gap-4 text-sm">
										<Badge
											variant="secondary"
											className="bg-primary/20 border-primary/30 text-primary"
										>
											<Search className="mr-1 w-4 h-4" />
											Real-time Search
										</Badge>
										<Badge
											variant="secondary"
											className="bg-primary/20 border-primary/30 text-primary"
										>
											<BarChart3 className="mr-1 w-4 h-4" />
											Price Analytics
										</Badge>
										<Badge
											variant="secondary"
											className="bg-primary/20 border-primary/30 text-primary"
										>
											<TrendingUp className="mr-1 w-4 h-4" />
											Best Deals
										</Badge>
									</div>
								</div>
							</div>
						</div>
						<Link href={"/LookForProduct"}>
							<Button
								size="lg"
								className="mx-auto mt-4 sm:px-32 w-fit text-white text-xl cursor-pointer"
							>
								Find your product
							</Button>
						</Link>
					</div>
				</div>
			</section>
		</main>
	);
};

export default HomePage;
