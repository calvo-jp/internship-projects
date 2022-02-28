import { useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import provider from "../provider";

type TItem = Awaited<ReturnType<typeof provider["read"]["all"]>>;

export default function Pokemons() {
  const [items, setItems] = useState<TItem>();
  const [pending, setPending] = useState(true);

  useEffect(() => {
    provider.read
      .all()
      .then(setItems)
      .finally(() => setPending(false));
  }, []);

  if (pending) return <Loader />;

  if (!items) return <InternalError />;

  return (
    <div className="mx-auto min-h-screen max-w-screen-md">
      <Header />

      <main className="p-4">
        <section className="flex flex-wrap justify-center gap-4">
          {items.results.map((item) => (
            <Card key={JSON.stringify(item)} url={item.url} />
          ))}
        </section>
      </main>
    </div>
  );
}

const Loader = () => {
  return <div>Loading...</div>;
};

const InternalError = () => {
  return <div>Something went wrong.</div>;
};
