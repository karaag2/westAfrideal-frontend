import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);

    const q = searchParams.get("q");
    const locations = searchParams.getAll("location");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    // Use environment variables for flexibility
    const backendUrl = process.env.BACKEND_API_URL || "http://127.0.0.1:8000/api/scrape/";
    const apiKey = process.env.BACKEND_API_KEY;

    const url = new URL(backendUrl);
    if (q) url.searchParams.set("q", q);
    
    // Add all locations
    locations.forEach((loc) => url.searchParams.append("location", loc));
    
    // Optional filters supported by backend
    if (minPrice) url.searchParams.set("minPrice", minPrice);
    if (maxPrice) url.searchParams.set("maxPrice", maxPrice);

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };

    // Add API Key if configured
    if (apiKey) {
        headers["X-API-KEY"] = apiKey;
    }

    try {
        console.log(`[API Proxy] Fetching from: ${url.toString()}`);
        const res = await fetch(url.toString(), { 
            headers,
            // Add a timeout or other fetch options if needed
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`[API Proxy] Backend error (${res.status}):`, errorText);
            return NextResponse.json(
                { error: `Backend responded with ${res.status}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (err) {
        console.error("[API Proxy] Connection failed:", err);
        return NextResponse.json(
            { error: "Failed to connect to the scraping backend. Ensure the Django server is running." },
            { status: 500 }
        );
    }
}
