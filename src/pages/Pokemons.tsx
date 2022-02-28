import ChevronUpIcon from "@heroicons/react/outline/ChevronUpIcon";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";

interface Paginated {
  next: string | null;
  previous: string | null;
  results: Record<string, any>[];
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

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleScroll = () => {
    if (window.scrollY > 0) setShowScollTopButton(true);
    else setShowScollTopButton(false);
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

      <main className="grow p-4">
        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.results.map((item: Record<string, any>, index) => (
            <div key={index}>
              <Card url={item.url} />
            </div>
          ))}
        </section>

        {pending && <Loader />}
        {!pending && !!data.next && (
          <div className="flex justify-center p-4 text-sm text-gray-500">
            <button
              onClick={() => {
                if (data.next) {
                  setPending(true);
                  setUrl(data.next);
                }
              }}
            >
              Load more
            </button>
          </div>
        )}
      </main>

      {showScrollTopButton && (
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
  return (
    <div className="mx-auto w-fit p-4 text-sm text-gray-500">Loading...</div>
  );
};
