"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Image from "next/image";
import { ExternalLink, MapPin, Tag, TrendingDown, Clock, Sparkles, Trash2, ArrowRight, Zap, Search, ArrowUpDown } from "lucide-react";
import { useSearch } from "./providers";
import PsychologicalLoader from "./PsychologicalLoader";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import ProductDetailView from "./ProductDetailView";

type SortOption = "price-asc" | "price-desc" | "city";

export default function Results() {
	const { results, logging, clearCache } = useSearch();
	const [sortBy, setSortBy] = useState<SortOption>("price-asc");
    const [displayLimit, setDisplayLimit] = useState(9); // Initial batch
    const observerTarget = useRef(null);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Calculate if we have more results to show from the fetched list
    const hasMoreToDisplay = useMemo(() => {
        return results ? displayLimit < results.length : false;
    }, [results, displayLimit]);

    // Infinite Scroll Implementation (Client-side pagination)
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMoreToDisplay && !logging) {
                    setDisplayLimit(prev => prev + 9);
                }
            },
            { threshold: 0.1, rootMargin: "200px" } // Load early for better UX
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => observer.disconnect();
    }, [hasMoreToDisplay, logging]);

    // Reset limit on new search
    useEffect(() => {
        setDisplayLimit(9);
    }, [results?.length]);

	const allSortedResults = useMemo(() => {
		if (!results) return [];
		
		return [...results].sort((a, b) => {
			const priceA = parseInt(a.Price.replace(/[^0-9]/g, "")) || 0;
			const priceB = parseInt(b.Price.replace(/[^0-9]/g, "")) || 0;
			
			if (sortBy === "price-asc") return priceA - priceB;
			if (sortBy === "price-desc") return priceB - priceA;
			if (sortBy === "city") return (a.City || "").localeCompare(b.City || "");
			return 0;
		});
	}, [results, sortBy]);

    const visibleResults = useMemo(() => {
        return allSortedResults.slice(0, displayLimit);
    }, [allSortedResults, displayLimit]);

	if (logging && (!results || results.length === 0)) {
		return <PsychologicalLoader />;
	}

	if (!results || results.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-40 space-y-8 animate-reveal">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                    <div className="relative w-28 h-28 bg-white dark:bg-white/5 rounded-[40px] flex items-center justify-center border border-slate-100 dark:border-white/10 shadow-2xl">
                        <Clock className="w-12 h-12 text-slate-300 dark:text-slate-700 animate-pulse" />
                    </div>
                </div>
				<div className="text-center space-y-3">
                    <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
                        No Intel <span className="text-primary tracking-normal">Detected</span>
                    </h3>
				    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Your marketplace findings will aggregate here</p>
                </div>
			</div>
		);
	}

	return (
		<div className="space-y-12 animate-reveal">
            {/* Results Header with Controls */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-slate-100 dark:border-white/5">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            Market <span className="text-primary uppercase italic">Intelligence</span>
                        </h2>
                    </div>
                    <p className="text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.4em]">
                        Found {allSortedResults.length} relevant listings in real-time
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                    <button 
                        onClick={clearCache}
                        className="h-14 px-6 rounded-2xl flex items-center gap-3 text-xs font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 transition-all border border-rose-500/20 group"
                    >
                        <Trash2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                        Reset Memory
                    </button>
                    
                    <div className="h-14 px-6 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center gap-4 group focus-within:border-primary/30 transition-all">
                        <ArrowUpDown className="w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <select 
                            value={sortBy} 
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="bg-transparent font-black text-xs uppercase tracking-widest text-slate-600 dark:text-slate-400 outline-none cursor-pointer"
                        >
                            <option value="price-asc">Cheapest First</option>
                            <option value="price-desc">Highest Price</option>
                            <option value="city">By Location</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Grid */}
			<ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
				{visibleResults.map((item: any, i: number) => {
                    const fbMatch = (item.url || "").match(/item\/(\d+)/);
                    const productId = fbMatch ? fbMatch[1] : i.toString();
                    
                    const linkData = encodeURIComponent(JSON.stringify({
                        Title: item.Title,
                        Price: item.Price,
                        ImageThumbNail: item.ImageThumbNail,
                        url: item.url,
                        City: item.City
                    }));

                    return (
                        <li key={i} className="group relative bg-white dark:bg-white/5 rounded-[48px] p-2 border border-slate-100 dark:border-white/10 shadow-soft hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] dark:hover:bg-white/10 hover:translate-y-[-8px] transition-all duration-700 overflow-hidden">
                             <div className="p-4 flex flex-col h-full space-y-6">
                                {/* Image Container */}
                                <div className="relative aspect-[16/11] overflow-hidden rounded-[40px] bg-slate-50 dark:bg-black/40 shadow-inner">
                                    <Image
                                        fill
                                        src={item.ImageThumbNail}
                                        alt={item.Title}
                                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                        sizes="(max-width: 768px) 100vw, 33vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                                    
                                    {/* Location Badge */}
                                    <div className="absolute top-6 left-6 z-10">
                                        <div className="px-4 py-2 bg-black/50 backdrop-blur-xl border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-2 shadow-xl">
                                            <MapPin className="w-3.5 h-3.5 text-primary" />
                                            {item.City || "Unknown"}
                                        </div>
                                    </div>

                                    {/* Value tag */}
                                    <div className="absolute bottom-6 right-6 z-10">
                                        <div className="px-3 py-1.5 bg-primary/20 backdrop-blur-md border border-primary/40 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-primary shadow-lg">
                                            High Value
                                        </div>
                                    </div>
                                </div>

                                {/* Details */}
                                <div className="space-y-4 px-4 pb-4">
                                    <h3 className="font-black text-slate-800 dark:text-white text-2xl line-clamp-2 leading-tight tracking-tight group-hover:text-primary transition-colors duration-300">
                                        {item.Title}
                                    </h3>

                                    <div className="flex items-center justify-between items-baseline pt-2">
                                        <div className="text-[36px] font-black text-slate-900 dark:text-white tracking-tighter decoration-primary decoration-4">
                                            {item.Price}
                                        </div>
                                        <div className="w-12 h-12 rounded-[20px] bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-100 dark:border-white/10 group-hover:border-primary/20 group-hover:bg-primary/5 transition-all">
                                            <Tag className="w-6 h-6 text-slate-400 group-hover:text-primary transition-colors" />
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-slate-50 dark:border-white/5 space-y-5">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="relative">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                                                    <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-teal-500 animate-ping" />
                                                </div>
                                                <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                                                    {item.Mileage || "Verified Deal"}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <button 
                                                onClick={() => {
                                                    setSelectedProduct(item);
                                                    setIsModalOpen(true);
                                                }}
                                                className="h-16 rounded-[24px] bg-slate-50 dark:bg-white/5 flex items-center justify-center font-black text-[12px] uppercase tracking-widest text-slate-900 dark:text-white hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all border border-slate-100 dark:border-white/10"
                                            >
                                                Details
                                            </button>
                                            <a
                                                href={`https://www.facebook.com${item.url}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="h-16 rounded-[24px] bg-primary text-white flex items-center justify-center gap-3 font-black text-[12px] uppercase tracking-widest hover:scale-[1.03] shadow-xl shadow-primary/25 active:scale-[0.98] transition-all group/btn"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                                Buy
                                            </a>
                                        </div>
                                    </div>
                                </div>
                             </div>
                        </li>
                    );
                })}
			</ul>

            {/* Pagination / Infinite Scroll Trigger */}
            <div ref={observerTarget} className="py-20 flex flex-col items-center justify-center space-y-4">
                {hasMoreToDisplay ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Intercepting more deals...</p>
                    </div>
                ) : results?.length > 0 && (
                    <div className="flex flex-col items-center gap-4 opacity-40">
                        <div className="w-px h-12 bg-linear-to-b from-primary to-transparent" />
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">End of Region Intel</p>
                    </div>
                )}
            </div>

            {/* Product Detail Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] border-none bg-slate-50 dark:bg-zinc-950 p-0 custom-scrollbar shadow-2xl">
                    <span className="sr-only">
                        <DialogTitle>{selectedProduct?.Title || "Product Details"}</DialogTitle>
                    </span>
                    <div className="p-10">
                        {selectedProduct && <ProductDetailView product={selectedProduct} isModal />}
                    </div>
                </DialogContent>
            </Dialog>
		</div>
	);
}
