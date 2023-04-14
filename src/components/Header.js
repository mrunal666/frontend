import Image from "next/image";
import Navbar from "./Navbar";

export default function Header({ scrollHandler }) {
  return (
    <header className="relative">
      <Navbar />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <Image
              priority
              fill
              className="h-full w-full object-cover"
              src={
                "https://ik.imagekit.io/h5gbgovde/images/header.jpg?updatedAt=1681069930917"
              }
              alt="Furniture"
            />
            <div className="absolute inset-0 bg-[#B6B2AC] mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center text-3xl  font-bold uppercase tracking-wide text-[#362F2F]">
              The Home Decor
            </p>
            <h1 className="mt-1 text-center font-bold uppercase text-gray-900 sm:text-5xl sm:tracking-tight lg:text-7xl">
              <span className="block text-white">Decorate Your</span>
              <span className="block text-[#362F2F]">Dreams</span>
            </h1>

            <div className="mx-auto mt-10 max-w-xs flex  justify-center">
              <button
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-semibold text-[#362F2F] shadow-sm hover:bg-orange-100 sm:px-8"
                onClick={scrollHandler}
              >
                Shop decor
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
