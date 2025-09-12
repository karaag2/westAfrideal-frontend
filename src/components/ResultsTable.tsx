import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, TrendingDown, TrendingUp, ArrowUpDown } from "lucide-react";

export interface Listing {
  id: string;
  title: string;
  price: number;
  city: string;
  url: string;
  image?: string;
  condition: string;
  postedDate: string;
  distance?: string;
}

interface ResultsTableProps {
  listings: Listing[];
  isLoading?: boolean;
}

export function ResultsTable({ listings, isLoading = false }: ResultsTableProps) {
  const [sortBy, setSortBy] = useState<string>("price-asc");
  const [filterCity, setFilterCity] = useState<string>("all");

  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-1/4 mx-auto"></div>
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  if (listings.length === 0) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">No results found</h3>
        <p className="text-sm text-muted-foreground mt-2">Try searching for a different product or adding more cities.</p>
      </Card>
    );
  }

  const cities = [...new Set(listings.map(l => l.city))];
  const filteredListings = filterCity === "all" 
    ? listings 
    : listings.filter(l => l.city === filterCity);

  const sortedListings = [...filteredListings].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "date-desc":
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
      case "city":
        return a.city.localeCompare(b.city);
      default:
        return 0;
    }
  });

  const averagePrice = listings.reduce((sum, l) => sum + l.price, 0) / listings.length;
  const minPrice = Math.min(...listings.map(l => l.price));
  const maxPrice = Math.max(...listings.map(l => l.price));

  const getPriceIndicator = (price: number) => {
    if (price <= minPrice * 1.1) return { icon: TrendingDown, color: "text-success", label: "Great Deal" };
    if (price >= maxPrice * 0.9) return { icon: TrendingUp, color: "text-destructive", label: "High Price" };
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center bg-gradient-card">
          <div className="text-2xl font-bold text-success">${minPrice.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Lowest Price</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-card">
          <div className="text-2xl font-bold text-primary">${averagePrice.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Average Price</div>
        </Card>
        <Card className="p-4 text-center bg-gradient-card">
          <div className="text-2xl font-bold text-destructive">${maxPrice.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Highest Price</div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="city">City A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Select value={filterCity} onValueChange={setFilterCity}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        {sortedListings.map((listing) => {
          const priceIndicator = getPriceIndicator(listing.price);
          
          return (
            <Card key={listing.id} className="p-4 hover:shadow-elevated transition-shadow">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground line-clamp-2">{listing.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline">{listing.city}</Badge>
                        <Badge variant="secondary">{listing.condition}</Badge>
                        {priceIndicator && (
                          <Badge variant="outline" className={priceIndicator.color}>
                            <priceIndicator.icon className="h-3 w-3 mr-1" />
                            {priceIndicator.label}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Posted: {new Date(listing.postedDate).toLocaleDateString()}
                        {listing.distance && ` • ${listing.distance}`}
                      </p>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        ${listing.price.toLocaleString()}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => window.open(listing.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Listing
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}