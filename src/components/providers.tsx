"use client";

import {ThemeProvider} from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={["light", "dark", "forest", "sunset", "ocean"]}
        >
            {children}
        </ThemeProvider>
    );
}

import { toast } from "@/src/components/ui/sonner";
import {createContext, useState, useContext, useEffect, useCallback} from "react";

interface Product {
    Title: string;
    Price: string;
    ImageThumbNail: string;
    Mileage: string;
    url: string;
    City?: string;
}

interface dala {
    Title: string[];
    Price: string[];
    ImageThumbNail: string[];
    Mileage: string[];
    url: string[];
}

interface SearchContextType {
    results: Product[] | null;
    logging: boolean;
    setLogging: (a: boolean) => void;
    performSearch: (params: { q: string, location?: string[], minPrice?: string, maxPrice?: string }, append?: boolean) => Promise<void>;
    clearCache: () => void;
    hasMore: boolean;
    loadMore: (currentParams: any) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

const CACHE_KEY = "westafrideal_results_cache";
const CACHE_EXPIRY = 10 * 60 * 1000; // 10 minutes

export function SearchProvider({children}: { children: React.ReactNode }) {
    const [results, setResultsState] = useState<Product[] | null>(null);
    const [logging, setLogging] = useState(false);
    const [hasMore, setHasMore] = useState(false);
    const [currentParams, setCurrentParams] = useState<any>(null);

    // Cache clean up & Initial load
    useEffect(() => {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            try {
                const { data, timestamp, params } = JSON.parse(cached);
                if (Date.now() - timestamp < CACHE_EXPIRY) {
                    setResultsState(data);
                    setCurrentParams(params);
                } else {
                    localStorage.removeItem(CACHE_KEY);
                }
            } catch (e) {
                localStorage.removeItem(CACHE_KEY);
            }
        }
    }, []);

    const clearCache = useCallback(() => {
        localStorage.removeItem(CACHE_KEY);
        setResultsState(null);
        setCurrentParams(null);
        setHasMore(false);
    }, []);

    const performSearch = useCallback(async (searchParams: { q: string, location?: string[], minPrice?: string, maxPrice?: string }, append: boolean = false) => {
        if (!searchParams.q.trim()) return;
        
        if (!append) {
            setResultsState(null);
            setHasMore(false);
        }
        
        setCurrentParams(searchParams);
        setLogging(true);
        try {
            const queryParams = new URLSearchParams({ q: searchParams.q });
            if (searchParams.location) {
                searchParams.location.forEach((loc) => queryParams.append("location", loc));
            }
            if (searchParams.minPrice) queryParams.append("minPrice", searchParams.minPrice);
            if (searchParams.maxPrice) queryParams.append("maxPrice", searchParams.maxPrice);

            const res = await fetch(`/api/search?${queryParams.toString()}`);
            const json = await res.json();
            
            if (!res.ok) {
                toast.error(json.error || "A connection error occurred.");
                return;
            }

            if (json.results) {
                let normalized: Product[] = [];
                const raw = json.results;

                if (Array.isArray(raw)) {
                    normalized = raw;
                } else if (raw && typeof raw === 'object' && raw.Title) {
                    normalized = raw.Title.map((_: any, i: number) => ({
                        Title: raw.Title[i],
                        Price: raw.Price[i],
                        ImageThumbNail: raw.ImageThumbNail[i],
                        Mileage: raw.Mileage[i],
                        url: raw.url[i],
                    }));
                }

                setResultsState(prev => {
                    const next = append && prev ? [...prev, ...normalized] : normalized;
                    localStorage.setItem(CACHE_KEY, JSON.stringify({
                        data: next,
                        timestamp: Date.now(),
                        params: searchParams
                    }));
                    return next;
                });

                // Infinite Scroll Simulation: The current backend returns everything at once.
                // We'll simulate 'more' by saying hasMore is true, but in reality 
                // subsequent loads might just repeat or be empty if the scraper doesn't paginate.
                setHasMore(normalized.length >= 9 && !append); 
                
                if (!append) {
                    if (normalized.length === 0) toast.info("No matching deals found.");
                    else toast.success(`Intelligence scan complete: Found ${normalized.length} deals.`);
                }
            }
        } catch (err) {
            toast.error("Deep search engine is currently offline.");
        } finally {
            setLogging(false);
        }
    }, []);

    const loadMore = useCallback(() => {
        if (!hasMore || logging || !currentParams) return;
        performSearch(currentParams, true);
    }, [hasMore, logging, currentParams, performSearch]);

    return (
        <SearchContext.Provider
            value={{
                results, 
                logging, 
                setLogging,
                performSearch,
                clearCache, 
                hasMore, 
                loadMore
            }}
        >
            {children}
        </SearchContext.Provider>
    );
}

export function useSearch() {
    const ctx = useContext(SearchContext);
    if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
    return ctx;
}
