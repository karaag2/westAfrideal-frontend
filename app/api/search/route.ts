import { NextResponse } from "next/server";

export async function GET(req: Request) {
	// Récupérer les query params
	const { searchParams } = new URL(req.url);

	const q = searchParams.get("q");
	const location = searchParams.get("location");

	console.log("q =", q, "location =", location);

	// Exemple d’appel vers ton microservice Django
	const res = await fetch(
		`http://127.0.0.1:8000/api/scrape/?q=${encodeURIComponent(
			q || "",
		)}&location=${encodeURIComponent(location || "")}`,
	);
	const data = await res.json();

	return NextResponse.json(data);
}

// setLoading(true);
// try {
// 	const res = await fetch(
// 		`http://127.0.0.1:8000/api/scrape/?q=${encodeURIComponent(
// 			query,
// 		)}&location=${encodeURIComponent(location)}`,
// 	);
// 	const json = await res.json();
// 	if (json.results) setAllData(json.results);
// } catch (err) {
// 	console.error("Erreur fetch:", err);
// } finally {
// 	setLoading(false);
// }
