import SearchForm from "@/src/components/SearchForm";
import clsx from "clsx";
import React from "react";

const SideBar = () => {
	return (
		// <SearchProvider>
		<div className="hidden left-0 sticky sm:flex flex-col bg-primary shadow-2xl border-accent border-r-2 w-fit max-w-sm h-screen overflow-">
			<h1
				className={clsx("my-8 px-6 font-bold text-accent text-xl text-center")}
			>
				Find your product at the best price
			</h1>
			<div className="">
				{/* <SearchForm /> */}
				<SearchForm />
			</div>
		</div>
		// </SearchProvider>
	);
};

export default SideBar;
