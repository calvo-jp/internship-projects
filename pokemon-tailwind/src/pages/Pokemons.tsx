import ChevronUpIcon from "@heroicons/react/outline/ChevronUpIcon";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import normalizePokemonObject from "../helpers/normalizePokemonObject";
import IPokemon from "../types/pokemon";

interface Result {
  name: string;
  url: string;
}

interface Paginated {
  next: string | null;
  previous: string | null;
  results: Result[];
  count: number;
}

const defaultEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=12";
const defaultData: Paginated = {
  count: 0,
  results: [],
  next: null,
  previous: null,
};

export default function Pokemons() {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState(defaultData);
  const [url, setUrl] = useState(defaultEndpoint);
  const [showScrollTopButton, setShowScollTopButton] = useState(false);
  const [pokemons, setPokemons] = useState<IPokemon[]>([]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (window.scrollY > 0) setShowScollTopButton(true);
    else setShowScollTopButton(false);
  };

  const loadMore = () => {
    if (data.next) {
      setPending(true);
      setUrl(data.next);
    }
  };

  const fetchPokemons = useCallback(async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) throw new Error(response.statusText);

      const { results, ...etc } = await response.json();

      setData((current) => ({
        ...current,
        ...etc,
      }));

      const promises = results.map((result: Result) => fetch(result.url));
      const responses = await Promise.allSettled(promises);

      for (const response of responses) {
        if (response.status === "fulfilled") {
          const parsed = await response.value.json();
          const pokemon = normalizePokemonObject(parsed);

          setPokemons((state) => [...state, pokemon]);
        } else {
          throw new Error(response.reason);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      return setPending(false);
    }
  }, [url]);

  useEffect(() => {
    fetchPokemons();

    window.addEventListener("scroll", handleScroll);

    return () => {
      setPending(true);
      setShowScollTopButton(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchPokemons]);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col">
      <Header />

      <main className="grow p-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pokemons.map((pokemon) => (
            <div key={pokemon.id}>
              <PokemonCard data={pokemon} />
            </div>
          ))}
        </section>

        {pending && <CardsSkeleton />}
        {!pending && !!data.next && <LoadMoreButton onClick={loadMore} />}
      </main>

      {showScrollTopButton && <ScrollToTopButton onClick={scrollToTop} />}
    </div>
  );
}

const LoadMoreButton = (props: React.ComponentProps<"button">) => {
  return (
    <div className="flex justify-center p-4 text-gray-500">
      <button {...props}>Load more</button>
    </div>
  );
};

const ScrollToTopButton = (props: React.ComponentProps<"button">) => {
  return (
    <button
      className="fixed right-4 bottom-4 z-10 flex rounded-full bg-gradient-to-r from-amber-600 to-orange-500 p-4 shadow-md"
      {...props}
    >
      <ChevronUpIcon className="h-6 w-6 stroke-white" />
    </button>
  );
};

const Header = () => {
  return (
    <header className="overflow-hidden bg-gradient-to-r from-orange-400 to-amber-400 p-6 lg:rounded-b-3xl">
      <div>
        <h1 className="text-6xl font-bold text-white">Pokedex</h1>
        <p className="-mt-1 ml-1 text-sm text-amber-100">Powered by pokeapi</p>
      </div>
    </header>
  );
};

interface PokemonCardProps {
  data: IPokemon;
}

const PokemonCard = ({ data }: PokemonCardProps) => {
  return (
    <Link
      to={"/pokemons/" + data.id}
      className="block rounded-lg border border-transparent bg-white p-8 shadow-md transition-all duration-300 hover:border-orange-300 hover:ring-2 hover:ring-orange-200 focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
    >
      <div className="flex h-[100px] items-center justify-center overflow-hidden">
        <img className="h-full w-full" src={data.image} alt="" />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl">{data.name}</h2>

        <ul className="flex flex-wrap items-center gap-x-1 text-xs text-gray-400">
          <li>Abilities: {data.abilities.length}</li>
          <li className="h-[3px] w-[3px] rounded-full bg-gray-200"></li>
          <li>Moves: {data.moves.length}</li>
          <li className="h-[3px] w-[3px] rounded-full bg-gray-200"></li>
          <li>Types: {data.types.length}</li>
        </ul>
      </div>
    </Link>
  );
};

const CardsSkeleton = () => {
  return (
    <div className='className="grid lg:grid-cols-3" mt-4 grid-cols-1 gap-4 md:grid-cols-2'>
      {new Array(12).fill(null).map((_, idx) => (
        <CardSkeleton key={idx} />
      ))}
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="block animate-pulse rounded-lg bg-slate-200 p-8">
      <div className="min-h-[130px]"></div>
    </div>
  );
};
