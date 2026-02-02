import SearchForm from "@/src/components/SearchForm";
import clsx from "clsx";
import React from "react";
import { Search } from "lucide-react";
import { 
    Sheet, 
    SheetTrigger, 
    SheetContent, 
    SheetTitle, 
    SheetClose, 
    SheetFooter 
} from "@/src/components/ui/sheet";
import { Button } from "@/src/components/ui/button";

const SideBar = () => {
    return (
        <div className="h-full flex flex-col">
            {/* Mobile: Floating Search Trigger */}
            <div className="lg:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <button
                            type="button"
                            aria-label="Open filters"
                            className="fixed bottom-10 right-6 z-50 p-5 rounded-[22px] bg-slate-900 text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] flex items-center gap-3 font-black uppercase text-xs tracking-widest hover:scale-105 active:scale-95 transition-all"
                        >
                            <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center">
                                <Search className="w-4 h-4" />
                            </div>
                            Search Deals
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="bg-white dark:bg-zinc-950 p-0 border-r border-slate-100 dark:border-white/5 w-full sm:max-w-md">
                        <div className="flex flex-col h-full">
                            <div className="p-8 border-b border-slate-50 dark:border-white/5">
                                <SheetTitle className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter">
                                    Search Options
                                </SheetTitle>
                                <p className="mt-1 text-slate-400 dark:text-slate-500 font-bold text-sm tracking-wide">Find your product at the best price</p>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                                <SearchForm />
                            </div>
                            
                            <SheetFooter className="p-6 border-t border-slate-50 dark:border-white/5 bg-slate-50/50 dark:bg-black/20">
                                <SheetClose asChild>
                                    <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 dark:border-white/10 font-black uppercase tracking-widest text-xs hover:bg-slate-100 transition-all">
                                        Close & View Results
                                    </Button>
                                </SheetClose>
                            </SheetFooter>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop: Static Sidebar */}
            <div className="hidden lg:flex flex-col h-full bg-white dark:bg-zinc-950">
                <div className="p-10 border-b border-slate-100 dark:border-white/5">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-3">
                        Marketplace <br />
                        <span className="text-primary italic">Intelligence</span>
                    </h1>
                    <p className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest">Powering better shopping</p>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                    <SearchForm />
                </div>
                
                <div className="p-10 border-t border-slate-100 dark:border-white/5 bg-slate-50/30 dark:bg-black/20">
                    <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Real-time data active</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
