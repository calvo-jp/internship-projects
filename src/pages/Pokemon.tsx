import ArrowLeftIcon from "@heroicons/react/outline/ArrowLeftIcon";
import ChevronLeftIcon from "@heroicons/react/outline/ChevronLeftIcon";
import FireIcon from "@heroicons/react/outline/FireIcon";
import LightningBoltIcon from "@heroicons/react/outline/LightningBoltIcon";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import provider from "../provider";

interface Params {
  id: string;
  [key: string]: string;
}

type TData = Awaited<ReturnType<typeof provider["read"]["one"]>>;

export default function Pokemon() {
  const params = useParams<Params>();
  const pokemonId = params.id!;

  const [pending, setPending] = useState(true);
  const [data, setData] = useState<TData>();

  useEffect(() => {
    provider.read
      .one(pokemonId)
      .then(setData)
      .catch(console.error)
      .finally(() => setPending(false));

    return () => {
      setData(undefined);
      setPending(true);
    };
  }, [pokemonId]);

  if (pending) return <Loader />;
  if (!data) return <InternalError />;

  const stats: {
    name: string;
    value: number;
  }[] = data.stats.map((i: Record<string, any>) => ({
    value: i.base_stat,
    name: i.stat.name,
  }));

  return (
    <div className="mx-auto max-w-screen-md">
      <Header data={data} />

      <div className="flex flex-col gap-4 p-6">
        <Card>
          <Card.Heading
            text="Abilities"
            icon={<FireIcon className="h-6 w-6 text-red-500" />}
          />

          <Card.Content>
            <ul>
              {data.abilities.map((item: Record<string, any>) => (
                <li key={item.ability.name}>{item.ability.name}</li>
              ))}
            </ul>
          </Card.Content>
        </Card>

        <Card>
          <Card.Heading
            icon={<LightningBoltIcon className="h-6 w-6 text-amber-500" />}
            text="Stats"
          />

          <Card.Content>
            {stats.map((stat) => (
              <div key={stat.name}>
                <div className="text-sm">{stat.name}</div>

                <div className="flex items-center gap-1">
                  <progress
                    value={stat.value}
                    className="progress-bar h-1 w-full rounded-md bg-gray-200"
                    max={100}
                  />

                  {stat.value <= 90 && <p className="text-xs">{stat.value}</p>}
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
  icon: JSX.Element;
  text: string;
}

Card.Heading = ({ icon: SVGIcon, text }: CardHeadingProps) => {
  return (
    <div className="flex items-center gap-1">
      {SVGIcon}

      <h3 className="text-xl text-gray-500">{text}</h3>
    </div>
  );
};

Card.Content = ({ children }: React.PropsWithChildren<{}>) => {
  return <div className="mt-6">{children}</div>;
};

const Header = ({ data }: TData) => {
  const types = data.types.map((item: Record<string, any>) => item.type.name);

  return (
    <div className="relative bg-gradient-to-r from-orange-400 to-amber-500 text-white md:rounded-b-3xl">
      <Link
        to="/pokemons"
        className="absolute top-4 left-4 rounded-full border-gray-100 bg-black from-orange-400 to-amber-500 p-2 opacity-30 hover:opacity-50 md:-left-8 md:block md:border-4 md:bg-gradient-to-r md:p-3 md:opacity-100 md:hover:opacity-100"
      >
        <ChevronLeftIcon className="h-6 w-6 stroke-white md:h-8 md:w-8" />
      </Link>

      <div className="flex flex-col items-center gap-2 p-8 md:flex-row md:gap-6">
        <section className="flex h-[150px] w-[150px] shrink-0 grow-0 basis-[150px] items-center justify-center overflow-hidden rounded-full bg-white bg-opacity-30 p-6">
          <img
            className="h-full w-full"
            src={data.sprites.other.dream_world.front_default}
            alt=""
          />
        </section>

        <section className="text-center">
          <h1 className="text-3xl font-bold">{data.name}</h1>

          <div className="mt-2 flex gap-1 md:mt-1">
            {types.map((type: string) => (
              <div
                key={type}
                className="rounded-full bg-white bg-opacity-30 px-4 py-2 text-sm font-semibold"
              >
                {type}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const Loader = () => {
  return <div className="p-4 text-sm text-gray-600">Loading...</div>;
};

const InternalError = () => {
  return <div className="p-4 text-sm text-gray-600">Something went wrong.</div>;
};
