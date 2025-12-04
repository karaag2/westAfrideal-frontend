import React from "react";

const page = async ({ params }: { params: { all: string[] } }) => {
	const { all } = await params;
	const [link, name, mileage, price, location] = all;

	return <div>This is the {name} product page</div>;
};

export default page;
