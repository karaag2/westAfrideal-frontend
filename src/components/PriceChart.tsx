import { Card } from "@/src/components/ui/card";
// import { Listing } from "@/src/components/ResultsTable"; // Assuming this might be missing too, but fixing path first.
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";

interface Listing {
    city: string;
    price: number;
    condition: string;
}

interface PriceChartProps {
  listings: Listing[];
}

export function PriceChart({ listings }: PriceChartProps) {
  if (listings.length === 0) return null;

  // Aggregate data by city
  const cityData = listings.reduce((acc, listing) => {
    if (!acc[listing.city]) {
      acc[listing.city] = {
        city: listing.city,
        prices: [],
        minPrice: listing.price,
        maxPrice: listing.price,
        avgPrice: listing.price,
        count: 1
      };
    } else {
      acc[listing.city].prices.push(listing.price);
      acc[listing.city].minPrice = Math.min(acc[listing.city].minPrice, listing.price);
      acc[listing.city].maxPrice = Math.max(acc[listing.city].maxPrice, listing.price);
      acc[listing.city].count++;
    }
    return acc;
  }, {} as Record<string, any>);

  // Calculate averages
  const chartData = Object.values(cityData).map((data: any) => {
    const prices = [data.avgPrice, ...data.prices];
    const avgPrice = prices.reduce((sum: number, price: number) => sum + price, 0) / prices.length;
    
    return {
      city: data.city,
      avgPrice: Math.round(avgPrice),
      minPrice: data.minPrice,
      maxPrice: data.maxPrice,
      count: data.count,
      range: data.maxPrice - data.minPrice
    };
  }).sort((a, b) => a.avgPrice - b.avgPrice);

  // Scatter plot data for price distribution
  const scatterData = listings.map(listing => ({
    city: listing.city,
    price: listing.price,
    condition: listing.condition
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevated p-3">
          <p className="font-semibold">{label}</p>
          <p className="text-primary">
            Avg: <span className="font-semibold">${data.avgPrice.toLocaleString()}</span>
          </p>
          <p className="text-success">
            Min: <span className="font-semibold">${data.minPrice.toLocaleString()}</span>
          </p>
          <p className="text-destructive">
            Max: <span className="font-semibold">${data.maxPrice.toLocaleString()}</span>
          </p>
          <p className="text-muted-foreground text-sm">
            {data.count} listing{data.count !== 1 ? 's' : ''}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Average Price by City</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="city" 
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="avgPrice" 
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Price Distribution</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                type="category" 
                dataKey="city" 
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                type="number" 
                dataKey="price"
                tick={{ fontSize: 12 }}
                tickFormatter={(value) => `$${value.toLocaleString()}`}
              />
              <Tooltip 
                formatter={(value: any, name: any, props: any) => [
                  `$${value.toLocaleString()}`, 
                  `${props.payload.condition}`
                ]}
                labelFormatter={(label) => `City: ${label}`}
              />
              <Scatter 
                data={scatterData} 
                fill="hsl(var(--primary))"
                fillOpacity={0.6}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}