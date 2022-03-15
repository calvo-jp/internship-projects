import SpinnerIcon from "./icons/Spinner";

export default function Loader() {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-white">
      <SpinnerIcon className="h-[125px] w-[125px]" />
    </div>
  );
}
