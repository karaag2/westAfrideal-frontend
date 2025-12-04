import { NextResponse } from "next/server";

export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);

	const q = searchParams.get("q");
	const locations = searchParams.getAll("location"); // ✅ récupère toutes les valeurs
	// Appel vers Django avec un tableau en GET
	const url = new URL("http://127.0.0.1:8000/api/scrape/");
	url.searchParams.set("q", q || "");
	locations.forEach((loc) => url.searchParams.append("location", loc));

	const res = await fetch(url.toString());
	const data = await res.json();
	return NextResponse.json(data);
}
