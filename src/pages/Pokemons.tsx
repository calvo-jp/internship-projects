import ChevronUpIcon from "@heroicons/react/outline/ChevronUpIcon";
import { useCallback, useEffect, useMemo, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";

interface Paginated {
  next: string | null;
  previous: string | null;
  results: Record<string, any>[];
  count: number;
}

const defaultEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=25";

export default function Pokemons() {
  const defaultData = useMemo<Paginated>(
    () => ({
      count: 0,
      results: [],
      next: null,
      previous: null,
    }),
    []
  );

  const [pending, setPending] = useState(true);
  const [data, setData] = useState(defaultData);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (window.scrollY > 0) setShowScrollTop(true);
    else setShowScrollTop(false);
  };

  useEffect(() => {
    fetch(defaultEndpoint)
      .then((response) => response.json())
      .then(setData)
      .finally(() => setPending(false));

    window.addEventListener("scroll", handleScroll);

    return () => {
      setPending(true);
    };
  }, [data.next]);

  return (
    <div className="mx-auto flex min-h-screen max-w-screen-lg flex-col">
      <Header />

      <main className="grow p-4">
        {pending && <Loader />}
        {!pending && (
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.results.map((item: Record<string, any>) => (
              <div key={item.url}>
                <Card url={item.url} />
              </div>
            ))}
          </section>
        )}
      </main>

      {showScrollTop && (
        <button
          className="fixed right-4 bottom-4 z-10 flex rounded-full bg-gradient-to-r from-amber-600 to-orange-500 p-2 shadow-md"
          onClick={scrollToTop}
        >
          <ChevronUpIcon className="h-8 w-8 stroke-white" />
        </button>
      )}
    </div>
  );
}

const Loader = () => {
  return <div className="p-4 text-sm text-gray-500">Loading...</div>;
};
