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

  if (pending || !data) return <></>;

  return (
    <Link
      to={"/pokemons/" + data.id}
      className="block rounded-lg bg-white p-8 shadow-md"
    >
      <div className="flex h-[100px] items-center justify-center overflow-hidden">
        <img
          className="h-full w-full"
          src={data.sprites.other.dream_world.front_default}
          alt=""
        />
      </div>

      <div className="mt-2 p-2">
        <h2 className="text-xl">{data.name}</h2>
      </div>
    </Link>
  );
};

export default Card;
