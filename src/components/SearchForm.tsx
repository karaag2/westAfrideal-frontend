"use client";
import { useState, useEffect } from "react";
import { KeyboardEvent, ChangeEvent, FormEvent } from "react";

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

export default function SearchForm({
	defaultQuery = "laptop",
	defaultLocation = "abidjan",
}: SearchFormProps) {
	const [query, setQuery] = useState(defaultQuery);
	const [location, setLocation] = useState(defaultLocation);
	const [allData, setAllData] = useState<Product[]>([]);
	const [visibleCount, setVisibleCount] = useState(5);
	const [loading, setLoading] = useState(false);

	// Fonction pour récupérer les données
	const fetchData = async () => {
		setLoading(true);
		try {
			const res = await fetch(
				`/api/search/?q=${encodeURIComponent(
					query,
				)}&location=${encodeURIComponent(location)}`,
			);
			const json = await res.json();
			if (json.results) setAllData(json.results);
		} catch (err) {
			console.error("Erreur fetch:", err);
		} finally {
			setLoading(false);
		}
	};

	// Soumettre la recherche
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setVisibleCount(5); // reset visible count
		fetchData();
	};

	// Infinite scroll
	useEffect(() => {
		const handleScroll = () => {
			if (
				window.innerHeight + window.scrollY >=
					document.body.offsetHeight - 100 &&
				visibleCount < allData.length
			) {
				setVisibleCount((prev) => Math.min(prev + 5, allData.length));
			}
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [allData, visibleCount]);
	const [input, setInput] = useState<string>("");
	const [cities, setCities] = useState<string[]>([]);

	// Ajouter une ville à la liste
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && input.trim() !== "") {
			e.preventDefault();
			if (!cities.includes(input.trim())) {
				setCities([...cities, input.trim()]);
				setInput("");
			}
		}
	};

	// Supprimer une ville
	const removeCity = (city: string) => {
		setCities(cities.filter((c) => c !== city));
	};

	// Soumission du formulaire
	//   const handleSubmit = (e: FormEvent) => {
	//     e.preventDefault()
	//     console.log("Villes sélectionnées :", cities)
	//     // Ici tu peux faire ton fetch vers ton API
	//   }
	return (
		<div className="mx-auto p-4 max-w-2xl">
			<form onSubmit={handleSubmit} className="flex gap-2 mb-4">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="Rechercher un produit"
					name="q"
					className="flex-1 p-2 border rounded"
				/>
				{/* <input
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Localisation"
					className="p-2 border rounded"
					name="location"
				/> */}
				<input
					type="text"
					value={input}
					onChange={(e: ChangeEvent<HTMLInputElement>) =>
						setInput(e.target.value)
					}
					onKeyDown={handleKeyDown}
					placeholder="Ajouter une ville et appuyer sur Entrée"
					className="p-2 border rounded w-full"
				/>
				<div>
					<div className="flex flex-wrap gap-2 mb-2">
						{cities.map((city) => (
							<span
								key={city}
								className="flex items-center gap-1 bg-blue-500 px-2 py-1 rounded-full text-white"
							>
								{city}
								<button type="button" onClick={() => removeCity(city)}>
									x
								</button>
							</span>
						))}
					</div>
				</div>
				<button type="submit" className="bg-blue-500 px-4 rounded text-white">
					Rechercher
				</button>
			</form>

			{loading && <p>Chargement...</p>}

			<ul className="space-y-4">
				{allData.slice(0, visibleCount).map((item, idx) => (
					<li key={idx} className="flex items-center gap-4 p-2 border rounded">
						<img
							src={item.ImageThumbNail}
							alt={item.Title}
							className="rounded w-20 h-20 object-cover"
						/>
						<div>
							<a
								href={item.url}
								target="_blank"
								rel="noopener noreferrer"
								className="font-bold text-blue-600"
							>
								{item.Title}
							</a>
							<p>{item.mi}</p>
							<p>{item.Price}</p>
						</div>
					</li>
				))}
			</ul>

			{!loading && visibleCount < allData.length && (
				<p className="mt-4 text-gray-500 text-center">
					Faites défiler pour voir plus...
				</p>
			)}
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
