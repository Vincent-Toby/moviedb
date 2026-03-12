"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useDebounce } from "@/app/hooks/useDebounce";

type Movie = {
  release_date: string;
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
};

export const Navbar = () => {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchMovie, setSearchMovie] = useState("");
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const debouncedQuery = useDebounce(searchMovie, 500);

  const searchRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (debouncedQuery) {
      if (!searchMovie) {
        setFilteredMovies([]);
        return;
      }
  
      const fetchSearchMovies = async () => {
        const res = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${searchMovie}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNhMjc4YzU4ODFjZWFmY2JlMTMwMTk4YWY5NTk0NCIsIm5iZiI6MTc3MjU1OTAxMi41OCwic3ViIjoiNjlhNzFhYTQ0MGExNzkxZGRkMDk3NGM4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OO4TxVErkym2LovGuhX8Z_rog-N2aOIf5aRPORKM95Q",
              "Content-Type": "application/json",
            },
          }
        );
  
        const data = await res.json();
        setFilteredMovies(data.results || []);
      };
  
      fetchSearchMovies();
      console.log("calling:", debouncedQuery);
    }
  }, [debouncedQuery, searchMovie]);



  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchMovie("");
        setFilteredMovies([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="flex gap-[52px] fixed top-0 left-0 w-full items-center justify-between bg-[#000000] text-white h-[70px] px-[16px] md:px-[40px] z-20 focus:outline-[#6c5ce7]">

        {/* logo */}
        <div className="p-0.5 rounded-md">
          <span className="text-[24px] font-semibold cursor-pointer">
            <Link href={"/"}>
              <p>movieDB</p>
            </Link>
          </span>
        </div>

        {/* search */}
        <div
          ref={searchRef}
          className="hidden flex-1 md:flex items-center bg-[#1c1c1c] px-[12px] border border-[#27272A] rounded-sm flex-1 dmax-w-[500px] ml-[24px] relative"
        >

          <svg
            className="ml-2 text-[#A1A1AA]"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
            >
              <path d="m21 21l-4.34-4.34" />
              <circle cx="11" cy="11" r="8" />
            </g>
          </svg>

          <input
            type="text"
            placeholder="Search..."
            value={searchMovie}
            onChange={(e) => setSearchMovie(e.target.value)}
            className="w-full flex-1 text-white px-[20px] py-[12px] outline-none bg-transparent"
          />

          {searchMovie && (
            <div className="absolute top-[60px] left-0 w-full bg-[#1c1c1c] border border-[#27272A] rounded-md max-h-[300px] overflow-y-auto">
              {filteredMovies.map((movie) => (
                <Link
                  key={movie.id}
                  href={`/movie/${movie.id}`}
                  onClick={() => {
                    setSearchMovie("");
                    setFilteredMovies([]);
                  }}
                >
                  <div className="p-3 hover:bg-[#27272A] cursor-pointer">
                    {movie.title}
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>

        {/* right side */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden"
          >
            <svg
              className="text-[#A1A1AA]"
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
      </nav>

      {/* search sm */}
      {mobileSearchOpen && (
        <div className="md:hidden fixed top-[70px] left-0 w-full bg-[#000000] px-[16px] pb-[16px] z-10">
          <div
            ref={searchRef}
            className="flex items-center bg-[#1c1c1c] px-[12px] border border-[#27272A] rounded-sm relative"
          >

            <svg
              className="ml-2 text-[#A1A1AA]"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
              >
                <path d="m21 21l-4.34-4.34" />
                <circle cx="11" cy="11" r="8" />
              </g>
            </svg>

            <input
              type="text"
              placeholder="Search..."
              value={searchMovie}
              onChange={(e) => setSearchMovie(e.target.value)}
              className="w-full flex-1 text-white px-[20px] py-[12px] outline-none bg-transparent"
            />

            {searchMovie && (
              <div className="absolute top-[60px] overflow-y-auto no-scrollbar text-white left-0 w-full bg-[#1c1c1c] border border-[#27272A] rounded-md max-h-[300px]">
                {filteredMovies.map((movie) => (
                  <Link
                    key={movie.id}
                    href={`/movie/${movie.id}`}
                    onClick={() => {
                      setSearchMovie("");
                      setFilteredMovies([]);
                      setMobileSearchOpen(false);
                    }}
                  >
                    <div className="p-3 hover:bg-[#27272A] cursor-pointer">
                      {movie.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};