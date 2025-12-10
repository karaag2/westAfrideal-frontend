"use client";

import {ArrowUp01, ArrowUpIcon, MapPin, X} from "lucide-react";
import {useState, useEffect} from "react";
import {KeyboardEvent, ChangeEvent, FormEvent} from "react";
import {Input} from "./ui/input";
import {Badge} from "./ui/badge";
import Image from "next/image";
import {useSearch} from "./providers";

interface Product {
    Title: string;
    Price: string;
    ImageThumbNail: string;
    url: string;
}

interface SearchFormProps {
    defaultQuery?: string;
    defaultLocation?: string;
}

const AVAILABLE_CITIES = [
    "abidjan",
    "yamoussoukro",
    "bouake",
    "san-pedro",
    "korhogo",
    "douala",
    "yaounde",
    "buea",
    "lomé",
    "paris",
    "londre",
];

export default function SearchForm({
                                       defaultQuery = "laptop",
                                       defaultLocation = "abidjan",
                                   }: SearchFormProps) {
    const [query, setQuery] = useState(defaultQuery);
    const [location, setLocation] = useState(defaultLocation);
    const [allData, setAllData] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(5);
    const [loading, setLoading] = useState(false);
    const [selectedCities, setSelectedCities] = useState<string[]>([]);
    const [cityInput, setCityInput] = useState("");
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const {setResults, logging, setLogging} = useSearch();

    // const reusltList = document.getElementById("results");
    // Fonction pour récupérer les données

    const fetchData = async () => {
        setLogging(true);
        try {
            const queryParams = new URLSearchParams({q: query});

            selectedCities.forEach((loc) => queryParams.append("location", loc));

            const res = await fetch(`/api/search?${queryParams.toString()}`);
            const json = await res.json();
            if (json.results) setResults(json.results);
        } catch (err) {
            console.error("Erreur fetch:", err);
        } finally {
            setLogging(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        /*   setVisibleCount(5);
           fetchData();*/
    };

    useEffect(() => {
        const handleScroll = () => {
            setVisibleCount((prev) => Math.min(prev + 5, allData.length));
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [allData, visibleCount]);
    const [input, setInput] = useState<string>("");
    const [cities, setCities] = useState<string[]>([]);


    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && input.trim() !== "") {
            e.preventDefault();
            if (!cities.includes(input.trim())) {
                setCities([...cities, input.trim()]);
                setInput("");
            }
        }
    };

    const addCity = (city: string) => {
        if (!selectedCities.includes(city)) {
            setSelectedCities([...selectedCities, city]);
        }
        setCityInput("");
        setShowCityDropdown(false);
    };

    const removeCity = (city: string) => {
        setSelectedCities(selectedCities.filter((c) => c !== city));
    };

    const filteredCities = AVAILABLE_CITIES.filter(
        (city) =>
            city.toLowerCase().includes(cityInput.toLowerCase()) &&
            !selectedCities.includes(city),
    );

    return (
        <div className=" p-4 max-w-2xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4 w-full">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un produit"
                    name="q"
                    className="flex-1 bg-accent p-2 border rounded-md"
                />
                {/* <input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Localisation"
					className="p-2 border rounded"
					name="location"
				/> */}
                <div className="space-y-2">
                    <label
                        htmlFor="cities"
                        className="font-medium text-foreground text-sm"
                    >
                        Select Cities to Compare
                    </label>
                    <div className="relative">
                        <MapPin
                            className="top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2 transform"/>
                        <Input
                            id="cities"
                            type="text"
                            placeholder="Search for cities..."
                            value={cityInput}
                            onChange={(e) => {
                                setCityInput(e.target.value);
                                setShowCityDropdown(true);
                            }}
                            onFocus={() => setShowCityDropdown(true)}
                            className="bg-accent pl-10"
                        />
                        {showCityDropdown && filteredCities.length > 0 && (
                            <div
                                className="z-10 absolute bg-accent bg-card shadow-elevated mt-1 border border-border rounded-md w-full max-h-48 overflow-y-auto">
                                <div
                                    className="top-0 sticky bg-primary w-full"
                                    onClick={() => setShowCityDropdown(false)}
                                >
                                    <ArrowUp01/>
                                </div>
                                {filteredCities.slice(0, 8).map((city) => (
                                    <button
                                        key={city}
                                        type="button"
                                        onClick={() => addCity(city)}
                                        className="hover:bg-white px-3 py-2 w-full text-primary hover:text-accent text-left transition-colors"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {selectedCities.length > 0 && (
                    <div className="space-y-2">
						<span className="font-medium text-accent text-sm">
							Selected Cities:
						</span>
                        <div className="flex flex-wrap gap-2">
                            {selectedCities.map((city) => (
                                <Badge
                                    key={city}
                                    variant="secondary"
                                    className="items-center gap-1"
                                >
                                    {city}
                                    <button
                                        type="button"
                                        onClick={() => removeCity(city)}
                                        className="ml-1 hover:text-destructive"
                                    >
                                        <X className="w-3 h-3"/>
                                    </button>
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-accent px-4 py-1 rounded text-primary"
                >
                    Rechercher
                </button>
            </form>

            {logging && <p>Chargement...</p>}

            <ul className="space-y-4 max-h-[60vh] overflow-y-auto" id="results">
                {allData.slice(0, visibleCount).map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 p-2 border rounded">
                        <Image
                            src={item.ImageThumbNail}
                            alt={item.Title}
                            className="rounded w-20 h-20 object-cover"
                            width={80}
                            height={80}
                        />
                        <div>
                            <a
                                href={`https://www.facebook.com${item.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-blue-600"
                            >
                                {item.Title}
                            </a>
                            {/* <p>{item.}</p> */}
                            <p>{item.Price}</p>
                        </div>
                    </li>
                ))}
                {/* {!loading && visibleCount < allData.length && (
					<p className="mt-4 text-gray-500 text-center">
						Faites défiler pour voir plus...
					</p>
				)} */}
            </ul>
        </div>
    );

    // <p>{item.mi}</p>
    // 					<p>{item.Price}</p>
    // 				</div>
    // 			</li>
    // 		))}
    // 	</ul>

    // 	{!loading && visibleCount < allData.length && (
    // 		<p className="mt-4 text-gray-500 text-center">
    // 			Faites défiler pour voir plus...
    // 		</p>
    // 	)}
    // </div>
}
