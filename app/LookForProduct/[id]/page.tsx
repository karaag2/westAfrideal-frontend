"use client";

import { useSearchParams, useRouter, useParams } from "next/navigation";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ProductDetailView from "@/src/components/ProductDetailView";
import { useSearch } from "@/src/components/providers";

export default function ProductDetailPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const params = useParams();
    const { results } = useSearch();
    const [product, setProduct] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Source 1: Context (Best for transitions)
        if (results && Array.isArray(results)) {
            const found = results.find(p => {
                const fbMatch = p.url.match(/item\/(\d+)/);
                return (fbMatch ? fbMatch[1] : "") === params.id;
            });
            if (found) {
                setProduct(found);
                return;
            }
        }

        // Source 2: URL Params (Best for direct links/refresh)
        const dataStr = searchParams.get("data");
        if (dataStr) {
            try {
                setProduct(JSON.parse(dataStr));
            } catch (e) {
                setError("Parsing error: Data corrupted.");
            }
        } else {
            setError("Session expired. Please search again.");
        }
    }, [searchParams, results, params.id]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 animate-reveal">
                <div className="w-20 h-20 bg-rose-50 dark:bg-rose-500/10 rounded-[28px] flex items-center justify-center border border-rose-100 dark:border-rose-500/20">
                    <AlertCircle className="w-10 h-10 text-rose-500" />
                </div>
                <div className="text-center space-y-2">
                    <p className="text-slate-900 dark:text-white font-black text-2xl tracking-tighter">{error}</p>
                    <button 
                        onClick={() => router.push('/LookForProduct')}
                        className="text-primary font-bold text-sm uppercase tracking-widest hover:underline"
                    >
                        Back to Search
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Synchronizing Product Data...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-500 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 text-center">
                {/* Back Button */}
                <button 
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-black text-xs uppercase tracking-widest mb-10 group mx-auto"
                >
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    Go Back to Results
                </button>

                <ProductDetailView product={product} />
            </div>
        </div>
    );
}
