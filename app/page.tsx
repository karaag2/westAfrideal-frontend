"use client";
import React from "react";
import Link from "next/link";
import { 
  Search, 
  MapPin, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  Globe, 
  ArrowRight,
  BarChart2,
  CheckCircle2,
  Filter,
  MousePointer2
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Badge } from "@/src/components/ui/badge";
import { Card, CardContent } from "@/src/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full bg-white dark:bg-zinc-950 transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-48 bg-dot-pattern overflow-hidden">
        {/* Soft Decorative Blobs */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50/50 dark:bg-blue-900/10 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center animate-reveal">
          <div>
            <Badge variant="secondary" className="mb-8 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-500/10 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-500/20 font-medium">
              <SparkleIcon className="w-4 h-4 mr-2 text-teal-500" />
              Smarter Marketplace Shopping for West Africa
            </Badge>
            <h1 className="text-6xl md:text-[88px] font-black tracking-tighter leading-[0.95] text-slate-900 dark:text-white mb-8">
              Find the <span className="text-gradient">Best Deals</span> <br />
              Save Automatically.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              The first price comparison engine designed specifically for Facebook Marketplace in West Africa. 
              Search cities instantly and never overpay again.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link href="/LookForProduct">
                <Button size="lg" className="rounded-2xl px-10 h-16 text-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-2xl shadow-slate-200 dark:shadow-none">
                  Start searching
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-2xl px-10 h-16 text-xl border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:text-white transition-colors">
                How it works
              </Button>
            </div>
          </div>

          {/* Feature Mockup Cards */}
          <div className="mt-24 relative max-w-5xl mx-auto px-4 opacity-0 animate-reveal" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <div className="relative glass-card rounded-[32px] p-2 overflow-hidden shadow-2xl shadow-blue-500/5">
              <div className="p-8 md:p-12 text-left bg-white/50 dark:bg-black/20">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-white/10 rounded-2xl flex items-center justify-center">
                      <Search className="w-6 h-6 text-slate-600 dark:text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Comparing Prices</h4>
                      <p className="text-sm text-slate-500 dark:text-slate-500">Searching 12+ cities...</p>
                    </div>
                  </div>
                  <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-zinc-900 bg-slate-200 dark:bg-white/10" />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { city: "Abidjan", price: "45,000 FCFA", color: "bg-teal-500" },
                    { city: "Dakar", price: "38,500 FCFA", color: "bg-blue-500" },
                    { city: "Lagos", price: "72,000 NGN", color: "bg-purple-500" }
                  ].map((item, i) => (
                    <div key={i} className="bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 rounded-3xl p-6 shadow-sm hover:translate-y-[-5px] transition-transform cursor-default">
                      <div className="flex items-center gap-2 mb-4">
                        <div className={`w-2 h-2 rounded-full ${item.color}`} />
                        <span className="text-sm font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{item.city}</span>
                      </div>
                      <div className="text-3xl font-black text-slate-900 dark:text-white mb-2">{item.price}</div>
                      <div className="text-green-600 dark:text-green-400 text-sm font-bold flex items-center gap-1">
                        <TrendingUp className="w-4 h-4" /> Best Value Found
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating UI Elements */}
            <div className="absolute -top-12 -right-12 hidden lg:block animate-float">
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-slate-50 dark:border-white/5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-500/10 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white">Verified Seller</div>
                        <div className="text-xs text-slate-500 dark:text-slate-500 text-left">4.8 Average Rating</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento-style Features Section */}
      <section className="py-24 bg-slate-50 dark:bg-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">Everything you need to <br /> find the right deal.</h2>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">Stop jumping between city filters. Use our powerful tools to save you time and money.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="md:col-span-2 shadow-soft border-none bg-white dark:bg-white/5 rounded-[40px] overflow-hidden group">
              <CardContent className="p-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-teal-50 dark:bg-teal-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart2 className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="text-3xl font-black mb-4 dark:text-white">Price History Analytics</h3>
                <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed mb-8 max-w-md">
                  We track market data daily across 100+ categories. Know whether the current price is a steal or a ripoff before you buy.
                </p>
                <div className="mt-auto bg-slate-50 dark:bg-black/20 rounded-3xl p-6 border border-slate-100 dark:border-white/5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-slate-400 dark:text-slate-500">Market Average</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">42,500 FCFA</span>
                    </div>
                    <div className="h-4 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-teal-500 w-[65%]" />
                    </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-none bg-slate-900 dark:bg-white rounded-[40px] overflow-hidden group">
              <CardContent className="p-10 flex flex-col h-full text-white dark:text-slate-900">
                <div className="w-16 h-16 bg-white/10 dark:bg-slate-900/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white dark:text-slate-900" />
                </div>
                <h3 className="text-3xl font-black mb-4">Regional Reach</h3>
                <p className="text-white/60 dark:text-slate-500 text-lg leading-relaxed mb-0">
                  Search across Cote d'Ivoire, Senegal, Nigeria, and Benin simultaneously. Find the rarest items.
                </p>
                <div className="mt-12 flex justify-center opacity-50 dark:opacity-20">
                    <Globe className="w-24 h-24 text-white dark:text-slate-900 animate-pulse" />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-none bg-white dark:bg-white/5 rounded-[40px] overflow-hidden group">
              <CardContent className="p-10 text-center">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Filter className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-2xl font-black mb-4 dark:text-white">Pro Filters</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">Filter by distance, price, and category with pinpoint precision.</p>
              </CardContent>
            </Card>

            <Card className="md:col-span-2 shadow-soft border-none bg-linear-to-br from-teal-500 to-blue-600 rounded-[40px] overflow-hidden group">
              <CardContent className="p-10 flex flex-col md:flex-row items-center gap-10 text-white">
                <div className="flex-1">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <MousePointer2 className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-3xl font-black mb-4">One-Click Contact</h3>
                    <p className="text-white/90 text-lg leading-relaxed mb-0">
                    Jump directly to the Facebook Marketplace listing and start chatting with the seller instantly.
                    </p>
                </div>
                <div className="w-full md:w-64 aspect-video bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center">
                    <Zap className="w-12 h-12 text-white animate-pulse" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white dark:bg-zinc-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center italic">
          <div className="flex justify-center mb-8">
            <div className="flex -space-x-2">
                {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white dark:border-zinc-900 bg-slate-100 dark:bg-white/10" />
                ))}
            </div>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8 tracking-tight">"WestAfriDeal saved me 50,000 FCFA on a laptop <br /> just by showing a better price in another city."</h2>
          <div className="flex flex-col items-center">
             <div className="font-black text-slate-900 dark:text-white font-sans not-italic">Moussa Diarra</div>
             <div className="text-slate-500 dark:text-slate-400 not-italic">Student & Tech Enthusiast, Abidjan</div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-32 bg-slate-900 dark:bg-white relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.1),transparent)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(20,184,166,0.05),transparent)]" />
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-white dark:text-slate-900 mb-8 tracking-tighter leading-none">Ready to start saving?</h2>
          <p className="text-xl text-white/60 dark:text-slate-500 mb-12 max-w-xl mx-auto font-medium">Join the new way of shopping across West African marketplaces.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/LookForProduct">
              <Button size="lg" className="rounded-2xl px-12 h-16 text-xl bg-white dark:bg-slate-900 text-slate-950 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 font-bold">
                Get started for free
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* Footer Section - Landing Page Only */}
      <footer className="bg-slate-50 dark:bg-zinc-950 border-t border-slate-200 dark:border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">WestAfriDeal</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm text-lg leading-relaxed">
                Empowering West African shoppers to find the best value on local marketplaces through advanced search and real-time analytics.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-8 text-lg">Explore</h3>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                <li><Link href="/LookForProduct" className="hover:text-primary transition-colors font-medium">Search Marketplace</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors font-medium">Price Trends</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors font-medium">Popular Cities</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-8 text-lg">Legal</h3>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                <li><Link href="#" className="hover:text-primary transition-colors font-medium">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors font-medium">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors font-medium">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-24 pt-10 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 dark:text-slate-400">
            <div className="font-medium">
              © {new Date().getFullYear()} WestAfriDeal. Build with precision.
            </div>
            
            {/* Signature */}
            <div className="group flex items-center gap-2 px-6 py-2 bg-white dark:bg-white/5 rounded-full border border-slate-200 dark:border-white/10 shadow-sm">
                <span className="text-sm font-bold">Made with ❤️ by</span>
                <Link 
                  href="https://www.linkedin.com/in/amos-issa-yonli-953826298" 
                  target="_blank"
                  className="text-slate-900 dark:text-white font-black hover:text-primary transition-colors relative"
                >
                  Amos Issa
                  <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </Link>
            </div>

            <div className="flex gap-8 font-bold text-sm">
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Twitter</Link>
              <Link href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">GitHub</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SparkleIcon(props: any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      </svg>
    )
  }
