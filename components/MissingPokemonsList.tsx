interface MissingPokemonsListProps {
  nombresObtenidos: string[];
  pokemons: any[];
}

export default function MissingPokemonsList({
  nombresObtenidos,
  pokemons,
}: MissingPokemonsListProps) {
  const pokemonsFaltantes = pokemons
    .filter((p) => !nombresObtenidos.includes(p.nombre))
    .sort((a, b) => a.numero - b.numero);

  return (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {pokemonsFaltantes.map((pokemon) => {
        const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.numero}.png`;

        return (
          <div
            key={pokemon.numero}
            className="bg-red-50 shadow-md rounded-xl overflow-hidden text-center p-4 hover:shadow-lg transition transform hover:scale-105"
          >
            <img
              src={imageUrl}
              alt={pokemon.nombre}
              className="w-24 h-24 mx-auto mb-2 grayscale opacity-70"
            />
            <p className="font-semibold text-red-600">{pokemon.numero}</p>
            <p className="text-gray-700">{pokemon.nombre}</p>
          </div>
        );
      })}
    </div>
  );
}
