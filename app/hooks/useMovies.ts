"use client";
import { useEffect, useState } from "react";

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  vote_average: number;
  release_date: string;
};

export const useMovies = (category: string) => {
  const [data, setData] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);

        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${category}`, 
          {
            method: "GET",
            headers: {
              Authorization:
                `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch movies");
        }

        const movies = await res.json();
        setData(movies.results);
      } catch (err: any) {
        setError(err.message);
      }
        setIsLoading(false);
    };

    fetchMovies();
  }, [category]);

  return { data, isLoading, error };
};