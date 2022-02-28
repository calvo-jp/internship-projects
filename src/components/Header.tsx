const Brand = () => {
  return (
    <div className="w-fit">
      <h1 className="bg-gradient-to-r from-orange-400 to-amber-400 text-6xl font-black uppercase [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
        POKEDEX
      </h1>
    </div>
  );
};

export default function Header() {
  return (
    <header className="flex flex-col items-center justify-center p-8">
      <Brand />
    </header>
  );
}
