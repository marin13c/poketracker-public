import { useState, useEffect, useRef } from "react";

export default function PokemonSearch({
  pokemons,
  setPokemons,
}: {
  pokemons: any[];
  setPokemons: (data: any[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    fetch("https://backend-pokedextcg.onrender.com/pokemon")
      .then((response) => response.json())
      .then((data) => setPokemons(data))
      .catch((error) => console.error("Error al cargar el JSON:", error));
  }, []);

  const filtered = pokemons.filter((p) =>
    p.nombre.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (p: any) => {
    setSelected(p);
    setSearch(p.nombre);
    setShowSuggestions(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      containerRef.current &&
      !(containerRef.current as any).contains(e.target)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          className="border rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Busca un Pokémon"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
            const p = pokemons.find(
              (p) => p.nombre.toLowerCase() === e.target.value.toLowerCase()
            );
            setSelected(p || null);
          }}
          onFocus={() => setShowSuggestions(true)}
        />
        {showSuggestions && filtered.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg shadow-md mt-1 max-h-60 overflow-y-auto">
            {filtered.map((p, i) => (
              <li
                key={i}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                onClick={() => handleSelect(p)}
              >
                {p.nombre}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selected && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow-lg flex flex-col sm:flex-row items-center gap-6">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selected.numero}.png`}
            alt={selected.nombre}
            className="w-28 h-28 sm:w-32 sm:h-32"
          />
          <div>
            <p className="text-lg font-semibold text-blue-600">
              N°: {selected.numero}
            </p>
            <p className="text-xl font-bold">{selected.nombre}</p>
            <p className="mt-1 text-gray-600">
              <strong>Obtenido:</strong> {selected.obtenido ? "Sí" : "No"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
