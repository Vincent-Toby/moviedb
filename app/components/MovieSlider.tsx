"use client";
import React, { useRef } from "react";
import { MovieCards } from "./MovieCards";
import { useMovies } from "@/app/hooks/useMovies";

type MovieSliderProps = {
  title: string;
  category: string;
};

export const MovieSlider = ({ title, category }: MovieSliderProps) => {
  const { data: movies } = useMovies(category);

  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 300;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="relative py-[40px] px-[20px] md:px-[40px] bg-[#000] mt-[52px]">
      <div className="mb-[-40px]">
        <span className="text-[#fff] text-[24px] font-medium">{title}</span>
      </div>

      {/* left btn */}
      <svg
        onClick={slideLeft}
        className="bg-[#111] text-[#fff] p-[8px] hidden md:block absolute top-1/2 -translate-y-1/2 left-3 z-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-200"
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m12 19l-7-7l7-7m7 7H5"
        />
      </svg>

      {/* right btn */}
      <svg
        onClick={slideRight}
        className="bg-[#111] text-[#fff] p-[8px] hidden md:block absolute top-1/2 -translate-y-1/2 right-3 z-10 rounded-full cursor-pointer hover:scale-110 transition-all duration-200"
        xmlns="http://www.w3.org/2000/svg"
        width="52"
        height="52"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14m-7-7l7 7l-7 7"
        />
      </svg>

      {/* slider container */}
      <div
        ref={sliderRef}
        className="flex gap-[24px] overflow-x-auto no-scrollbar scroll-smooth py-[40px]"
      >
        {movies.map((movie) => (
          <MovieCards key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};