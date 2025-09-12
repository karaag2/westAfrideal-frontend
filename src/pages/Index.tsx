import { useState } from "react";
import { SearchForm } from "@/components/SearchForm";
import { ResultsTable, Listing } from "@/components/ResultsTable";
import { PriceChart } from "@/components/PriceChart";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generateMockListings } from "@/data/mockData";
import { BarChart3, Table, Search, TrendingUp } from "lucide-react";

const Index = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState<{ product: string; cities: string[] } | null>(null);

  const handleSearch = async (product: string, cities: string[]) => {
    setIsLoading(true);
    setSearchQuery({ product, cities });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockListings = generateMockListings(product, cities);
    setListings(mockListings);
    setIsLoading(false);
  };

  const totalListings = listings.length;
  const averagePrice = listings.length > 0 
    ? listings.reduce((sum, l) => sum + l.price, 0) / listings.length 
    : 0;
  const uniqueCities = new Set(listings.map(l => l.city)).size;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find the Best Deals
              <br />
              <span className="text-primary-glow">Across Cities</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Compare Facebook Marketplace prices instantly across multiple cities. 
              Never overpay again.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <Search className="h-4 w-4 mr-1" />
                Real-time Search
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <BarChart3 className="h-4 w-4 mr-1" />
                Price Analytics
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                <TrendingUp className="h-4 w-4 mr-1" />
                Best Deals
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <SearchForm onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Results Section */}
        {(listings.length > 0 || isLoading) && (
          <div className="space-y-8">
            {/* Stats Summary */}
            {searchQuery && !isLoading && (
              <Card className="p-6 bg-gradient-card">
                <h2 className="text-2xl font-bold mb-4">
                  Results for "{searchQuery.product}"
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">{totalListings}</div>
                    <div className="text-sm text-muted-foreground">Total Listings Found</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent">${averagePrice.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Average Price</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-warning">{uniqueCities}</div>
                    <div className="text-sm text-muted-foreground">Cities Compared</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Results Tabs */}
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="table" className="flex items-center gap-2">
                  <Table className="h-4 w-4" />
                  Listings
                </TabsTrigger>
                <TabsTrigger value="charts" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="mt-6">
                <ResultsTable listings={listings} isLoading={isLoading} />
              </TabsContent>

              <TabsContent value="charts" className="mt-6">
                {isLoading ? (
                  <Card className="p-8 text-center">
                    <div className="animate-pulse space-y-4">
                      <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
                      <div className="h-64 bg-muted rounded"></div>
                    </div>
                  </Card>
                ) : (
                  <PriceChart listings={listings} />
                )}
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* How it Works Section */}
        {listings.length === 0 && !isLoading && (
          <div className="max-w-4xl mx-auto mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="p-6 text-center bg-gradient-card shadow-card">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">1. Search</h3>
                <p className="text-muted-foreground">
                  Enter what you're looking for and select cities to compare prices across.
                </p>
              </Card>

              <Card className="p-6 text-center bg-gradient-card shadow-card">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">2. Compare</h3>
                <p className="text-muted-foreground">
                  View detailed price comparisons and analytics across all selected cities.
                </p>
              </Card>

              <Card className="p-6 text-center bg-gradient-card shadow-card">
                <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-success-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">3. Save</h3>
                <p className="text-muted-foreground">
                  Find the best deals and connect directly with sellers on Facebook Marketplace.
                </p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;