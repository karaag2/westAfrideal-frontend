"use client";

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
		</ThemeProvider>
	);
}
import { createContext, useState, useContext } from "react";

interface Product {
	Title: string;
	Price: string;
	ImageThumbNail: string;
	Mileage: string;
	url: string;
}

interface SearchContextType {
	results: Product[];
	logging: boolean;
	setResults: (data: Product[]) => void;
	setLogging: (a: boolean) => void;
}

const SearchContext = createContext<SearchContextType | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
	const [results, setResults] = useState<Product[]>([]);
	const [logging, setLogging] = useState(false);
	return (
		<SearchContext.Provider
			value={{ results, setResults, logging, setLogging }}
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
