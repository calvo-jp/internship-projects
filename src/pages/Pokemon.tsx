import ChevronLeftIcon from "@heroicons/react/outline/ChevronLeftIcon";
import CogIcon from "@heroicons/react/solid/CogIcon";
import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import normalizePokemonObject from "../helpers/normalizePokemonObject";
import IPokemon from "../types/pokemon";
import NotFound from "./NotFound";

interface Params {
  id: string;
  [key: string]: string;
}

export default function Pokemon() {
  const params = useParams<Params>();
  const pokemonId = params.id!;

  const [pending, setPending] = useState(true);
  const [data, setData] = useState<IPokemon>();

  const fetchPokemon = useCallback(async () => {
    const endpoint = "https://pokeapi.co/api/v2/pokemon/" + pokemonId;

    try {
      const response = await fetch(endpoint);

      if (!response.ok) throw new Error(response.statusText);

      const pokemon = await response.json();
      setData(normalizePokemonObject(pokemon));
    } catch (e) {
      console.error(e);
    } finally {
      setPending(false);
    }
  }, [pokemonId]);

  useEffect(() => {
    fetchPokemon();

    return () => {
      setData(undefined);
      setPending(true);
    };
  }, [fetchPokemon]);

  if (pending) return <Loader />;
  if (!data) return <NotFound />;

  return (
    <div className="mx-auto max-w-screen-md">
      <Header data={data} />

      <div className="flex flex-col gap-4 p-6">
        <Card>
          <Card.Heading label="Abilities" />
          <Card.Content>
            <ul>
              {data.abilities.map((ability) => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          </Card.Content>
        </Card>

        <Card>
          <Card.Heading label="Moves" />
          <Card.Content>
            <ul className="flex flex-wrap gap-1">
              {data.moves.map((move) => (
                <li
                  className="rounded-md bg-amber-100 p-1 px-2 text-sm"
                  key={move}
                >
                  {move}
                </li>
              ))}
            </ul>
          </Card.Content>
        </Card>

        <Card>
          <Card.Heading label="Stats" />
          <Card.Content>
            {data.stats.map((stat) => (
              <div key={stat.name}>
                <div className="text-sm">{stat.name}</div>

                <div className="flex items-center gap-1">
                  <progress
                    value={stat.value}
                    className="progress-bar h-1 w-full rounded-md bg-gray-200"
                    max={100}
                  />

                  <p className="text-xs">{stat.value}</p>
                </div>
              </div>
            ))}
          </Card.Content>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <div className="col-span-2 rounded-lg bg-white p-8 shadow-md md:col-span-1">
      {children}
    </div>
  );
};

interface CardHeadingProps {
  label: string;
}

Card.Heading = ({ label }: CardHeadingProps) => {
  return (
    <div className="flex items-center gap-1">
      <CogIcon className="block h-4 w-4 fill-gray-400" />
      <h3 className="text-xl text-gray-500">{label}</h3>
    </div>
  );
};

Card.Content = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="mt-6">{children}</div>;
};

interface HeaderProps {
  data: IPokemon;
}

const Header = ({ data }: HeaderProps) => {
  return (
    <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 text-white md:rounded-b-3xl">
      <BackButton />

      <div className="flex flex-col items-center gap-2 p-8 md:flex-row md:gap-6">
        <section>
          <Avatar src={data.image} />
        </section>

        <section className="text-center">
          <h1 className="text-3xl font-bold">{data.name}</h1>

          <Types data={data.types} />
        </section>
      </div>
    </div>
  );
};

interface TypesProps {
  data: string[];
}

const Types = ({ data }: TypesProps) => {
  return (
    <div className="mt-2 flex gap-1 md:mt-1">
      {data.map((i) => (
        <div
          key={i}
          className="rounded-full bg-white bg-opacity-30 px-4 py-2 text-sm font-semibold"
        >
          {i}
        </div>
      ))}
    </div>
  );
};

interface AvatarProps {
  src: string;
}
const Avatar = ({ src }: AvatarProps) => {
  return (
    <div className="flex h-[150px] w-[150px] shrink-0 grow-0 basis-[150px] items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-30 p-6">
      <img className="h-full w-full" src={src} alt="" />
    </div>
  );
};

const BackButton = () => {
  return (
    <Link
      to="/pokemons"
      className="absolute top-4 left-4 rounded-full border-gray-100 bg-black from-orange-400 to-amber-500 p-2 opacity-30 hover:opacity-50 md:-left-8 md:block md:border-4 md:bg-gradient-to-r md:p-3 md:opacity-100 md:hover:opacity-100"
    >
      <ChevronLeftIcon className="h-6 w-6 stroke-white md:h-8 md:w-8" />
    </Link>
  );
};

const Loader = () => {
  return <div className="p-4 text-sm text-gray-600">Loading...</div>;
};
