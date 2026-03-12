"use client";
import Link from "next/link";
import { Movie } from "./FetchMovies";
import { MovieImage } from "./MovieImage";
import Image from "next/image";

type MovieCardProps = {
  movie: Movie;
};

export const MovieCards = ({ movie }: MovieCardProps) => {
  const voteAvg = movie.vote_average.toString();
  const fullImageUrl = `${process.env.NEXT_PUBLIC_TMDB_IMAGE}${movie.poster_path}`

  return (
    <div className="min-w-[220px] bg-[#1c1c1c] rounded-md overflow-hidden mt-[36px] hover:scale-110 transition-all duration-200">
      <Link href={`/movie/${movie.id}`}>
        <div>
          {/* movie img */}
          <div className="relative">
            {/* <MovieImage imageUrl={movie.poster_path} title={movie.title} />
            
             */}
             <Image
        src={fullImageUrl}
        alt={movie.title}
        width={220}
        height={330}
        className="w-auto h-auto object-cover"
      />

            <div className="absolute top-2 left-2 bg-blue-500 text-white text-sm font-semibold px-2 py-1 rounded-md">
              <span>{voteAvg.slice(0, 3)}</span>
            </div>
          </div>

          <div className="p-4 flex flex-col gap-2">
            <h2 className="text-white font-semibold text-[18px]">
              {movie.title}
            </h2>

            <p className="text-[#fff] text-[12px]">
              {movie.overview.slice(0, 50)}...
            </p>

            <p className="text-[#A1A1AA] text-[12px]">{movie.release_date}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};
