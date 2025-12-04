"use client";
import { useSearch } from "./providers";
import Image from "next/image";

export default function Results() {
	const { results, logging } = useSearch();
	console.log(logging);
	if (logging) {
		return (
			<p className="mx-auto font-bold text-primary text-2xl text-center">
				Loading...
			</p>
		);
	}

	if (!results.length)
		return (
			<p className="mx-auto font-bold text-primary text-2xl text-center">
				No results yet...
			</p>
		);

	return (
		<ul className="-z-20 gap-4 space-y-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 p-4 max-h-96 overflow-y-scroll">
			{results.map((item, i) => (
				<li key={i} className="relative flex flex-col mx-auto p-2 rounded">
					<Image
						height={200}
						width={300}
						src={item.ImageThumbNail}
						alt={item.Title}
						className="rounded-sm"
					/>
					<p>{item.Price}</p>
					<a
						href={`https://www.facebook.com${item.url}`}
						target="_blank"
						className="mb-4 font-semibold hover:underline"
					>
						{item.Title}
					</a>
					<p className="bottom-0 absolute text-black/40 text-sm">
						{item.Mileage}
					</p>
				</li>
			))}
		</ul>
	);
}
