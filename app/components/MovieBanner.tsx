import React from "react";
import Link from "next/link";

export const MovieBanner = () => {
  const backdropUrl =
    "https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg";

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center px-[40px] md:px-[40px]"
      style={{
        backgroundImage: `url(${backdropUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* banner */}
      <div className="relative z-10 w-full max-w-6xl bg-[#111]/80 border border-[#222] rounded-2xl p-[32px] md:p-[68px]">
        <div className="text-center md:text-left">
          <h1 className="text-[30px] sm:text-4xl md:text-[38px] font-bold text-white">
            Welcome.
          </h1>

          <p className="text-[#A1A1AA] sm:text-[16px] md:text-[20px] mt-2">
            Millions of movies, TV shows and people to discover.
            <span className="text-white font-medium"> Explore now.</span>
          </p>
        </div>

        {/* btns */}
        <div className="mt-[40px] flex flex-col sm:flex-row items-center gap-[16px]">
          <Link href="/movies">
            <button className="w-full sm:w-auto bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-[#e4e4e7] transition cursor-pointer">
              Explore Movies
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};