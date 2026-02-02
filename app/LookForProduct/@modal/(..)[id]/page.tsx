"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";
import ProductDetailView from "@/src/components/ProductDetailView";
import { useSearch } from "@/src/components/providers";

export default function ProductModal() {
    const router = useRouter();
    const searchParams = useSearchParams();
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

        // Source 2: URL Params
        const dataStr = searchParams.get("data");
        if (dataStr) {
            try {
                setProduct(JSON.parse(dataStr));
            } catch (e) {
                console.error("Failed to parse product data", e);
                setError("Incomplete product information. Please try clicking again.");
            }
        }
    }, [searchParams, results, params.id]);

    if (!product && !error) return null;

    return (
        <Dialog open={true} onOpenChange={(open) => {
            if (!open) router.back();
        }}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] border-none bg-slate-50 dark:bg-zinc-950 p-0 custom-scrollbar shadow-2xl">
                <span className="sr-only">
                    <DialogTitle>{product?.Title || "Error"}</DialogTitle>
                </span>
                <div className="p-10">
                    {error ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-12">
                            <div className="w-16 h-16 bg-rose-50 dark:bg-rose-500/10 rounded-2xl flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-rose-500" />
                            </div>
                            <p className="font-extrabold text-slate-800 dark:text-white text-center">{error}</p>
                        </div>
                    ) : (
                        <ProductDetailView product={product} isModal />
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
