"use client";

import Image from "next/image";
import { ExternalLink, MapPin, Tag, ShieldCheck, Zap, Info, Share2, Heart, TrendingDown } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";

interface ProductDetailViewProps {
    product: any;
    isModal?: boolean;
}

export default function ProductDetailView({ product, isModal = false }: ProductDetailViewProps) {
    if (!product) return null;

    return (
        <div className={isModal ? "" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8"}>
            <div className={`grid grid-cols-1 ${isModal ? "lg:grid-cols-1" : "lg:grid-cols-12"} gap-12`}>
                {/* Image Section */}
                <div className={isModal ? "" : "lg:col-span-7 space-y-6"}>
                    <div className="relative aspect-[4/3] w-full rounded-[40px] overflow-hidden bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-2xl group">
                        <Image
                            fill
                            src={product.ImageThumbNail}
                            alt={product.Title}
                            className="object-cover transition-transform duration-1000 group-hover:scale-105"
                            priority
                        />
                        <div className="absolute top-8 left-8 flex gap-3">
                            <Badge className="bg-black/60 backdrop-blur-xl border-none px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <MapPin className="w-3 h-3 text-primary" />
                                {product.City || "Regional Listing"}
                            </Badge>
                            <Badge className="bg-green-500/80 backdrop-blur-xl border-none px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                Live Listing
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className={isModal ? "space-y-6" : "lg:col-span-5 space-y-8"}>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 bg-primary/10 rounded-lg text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                Verified Market Price
                            </div>
                            <div className="px-3 py-1 bg-blue-500/10 rounded-lg text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] flex items-center gap-1">
                                <TrendingDown className="w-3 h-3" />
                                Competitive
                            </div>
                        </div>
                        <h1 className={`${isModal ? "text-2xl" : "text-4xl md:text-5xl"} font-black text-slate-900 dark:text-white tracking-tighter leading-none`}>
                            {product.Title}
                        </h1>
                        <div className="flex items-baseline gap-4 py-4">
                            <span className={`${isModal ? "text-4xl" : "text-6xl"} font-black text-primary tracking-tighter`}>{product.Price}</span>
                            {!isModal && <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">estimated total</span>}
                        </div>
                    </div>

                    <div className={`p-8 bg-white dark:bg-white/5 rounded-[36px] border border-slate-100 dark:border-white/10 ${isModal ? "" : "shadow-soft"} space-y-6`}>
                        <div className="flex flex-col gap-4">
                            <Button size="lg" className="w-full h-18 rounded-2xl bg-primary text-white text-lg font-black hover:scale-[1.02] shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3" asChild>
                                <a href={`https://www.facebook.com${product.url}`} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-6 h-6" />
                                    Navigate to Marketplace
                                </a>
                            </Button>
                            <div className="grid grid-cols-2 gap-4">
                                <Button variant="outline" className="h-14 rounded-2xl border-slate-200 dark:border-white/10 font-bold gap-2">
                                    <Heart className="w-5 h-5" /> Save Deal
                                </Button>
                                <Button variant="outline" className="h-14 rounded-2xl border-slate-200 dark:border-white/10 font-bold gap-2">
                                    <Share2 className="w-5 h-5" /> Share
                                </Button>
                            </div>
                        </div>

                        {!isModal && (
                            <div className="pt-6 border-t border-slate-50 dark:border-white/5">
                                <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 mb-4">Seller Information</h4>
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/10 flex items-center justify-center">
                                        <ShieldCheck className="w-8 h-8 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-black text-slate-900 dark:text-white">Marketplace Seller</div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                                            Active 2h ago
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Analysis Card */}
                    <div className="p-8 bg-slate-900 dark:bg-white rounded-[36px] text-white dark:text-slate-900 space-y-6 overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-3xl -z-0" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-4">
                                <Info className="w-4 h-4 text-primary" />
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Deal Analysis</span>
                            </div>
                            <h3 className="text-xl font-black tracking-tighter mb-4">Market Insight</h3>
                            <p className="text-white/60 dark:text-slate-500 text-sm leading-relaxed font-bold">
                                This product is priced <span className="text-primary italic">12% below average</span> in {product.City || "this region"}. 
                                Our platform suggests this is a "High Value" deal.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
