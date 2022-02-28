import ChevronUpIcon from "@heroicons/react/outline/ChevronUpIcon";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import normalizeResult from "../helpers/normalizeResponse";
import IPokemon from "../types/pokemon";

interface Paginated {
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
  count: number;
}

const defaultData: Paginated = {
  count: 0,
  results: [],
  next: null,
  previous: null,
};

export default function Pokemons() {
  const defaultEndpoint = useMemo(
    () => "https://pokeapi.co/api/v2/pokemon?limit=12",
    []
  );

  const [pending, setPending] = useState(true);
  const [data, setData] = useState(defaultData);
  const [url, setUrl] = useState(defaultEndpoint);
  const [showScrollTopButton, setShowScollTopButton] = useState(false);

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

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then(({ results: r, ...etc }) => {
        setData(({ results }) => ({
          ...etc,
          results: [...results, ...r],
        }));
      })
      .finally(() => setPending(false));

    window.addEventListener("scroll", handleScroll);

    return () => {
      setShowScollTopButton(false);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [url]);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col">
      <Header />

      <main className="grow p-6">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.results.map((item) => (
            <div key={item.url}>
              <Card url={item.url} />
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
    <header className="bg-gradient-to-r from-orange-400 to-amber-400 p-6 lg:rounded-b-3xl">
      <div>
        <h1 className="text-6xl font-bold text-white">Pokedex</h1>
        <p className="-mt-1 ml-1 text-sm text-amber-100">Powered by pokeapi</p>
      </div>
    </header>
  );
};

interface CardProps {
  url: string;
}

const Card = ({ url }: CardProps) => {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState<IPokemon>();

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();

        throw new Error(response.statusText);
      })
      .catch(console.error)
      .then((data) => setData(normalizeResult(data)))
      .finally(() => setPending(false));

    return () => {
      setPending(true);
      setData(undefined);
    };
  }, [url]);

  if (pending) return <CardSkeleton />;

  if (!data) return <></>;

  return (
    <Link
      to={"/pokemons/" + data.id}
      className="block rounded-lg bg-white p-8 shadow-md"
    >
      <div className="flex h-[100px] items-center justify-center overflow-hidden">
        <img className="h-full w-full" src={data.image} alt="" />
      </div>

      <div className="mt-4">
        <h2 className="text-xl">{data.name}</h2>
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
