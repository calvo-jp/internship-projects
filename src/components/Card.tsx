import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface CardProps {
  url: string;
}

const Card = ({ url }: CardProps) => {
  const [pending, setPending] = useState(true);
  const [data, setData] = useState<Record<string, any>>();

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();

        throw new Error(response.statusText);
      })
      .catch(console.error)
      .then(setData)
      .finally(() => setPending(false));

    return () => {
      setPending(true);
      setData(undefined);
    };
  }, [url]);

  if (pending) return <div>Loading...</div>;
  if (!data) return <></>;

  return (
    <Link to={"/pokemons/" + data.id} className="block">
      <div className="flex h-[150px] w-[150px] items-center justify-center overflow-hidden rounded-full border-4 border-slate-100">
        <img
          width={64}
          height={64}
          src={data.sprites.other.dream_world.front_default}
          alt=""
        />
      </div>

      <div className="p-4">
        <h2 className="text-center text-lg">{capitalizeFirst(data.name)}</h2>
      </div>
    </Link>
  );
};

const capitalizeFirst = (subject: string) => {
  return subject[0].toUpperCase() + subject.substring(1);
};

export default Card;
