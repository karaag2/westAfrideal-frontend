import React, { ReactNode } from "react";
import { SearchProvider } from "@/src/components/providers";

type PropType = {
	children: ReactNode;
	ResultPage: ReactNode;
	Navigation: ReactNode;
};

const Layout = (props: PropType) => {
	return (
		<SearchProvider>
			<div className="flex max-h-[85vh]">
				<div className="flex max-w-75">{props.Navigation}</div>
				<div className="flex flex-col overflow-y-scroll">
					{props.ResultPage}
					{props.children}
				</div>
			</div>
		</SearchProvider>
	);
};

export default Layout;
