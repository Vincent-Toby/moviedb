import Image from "next/image";

type Prop = {
  params: Promise<{ id: string }>;
};

async function getMovie(id: string) {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YzNhMjc4YzU4ODFjZWFmY2JlMTMwMTk4YWY5NTk0NCIsIm5iZiI6MTc3MjU1OTAxMi41OCwic3ViIjoiNjlhNzFhYTQ0MGExNzkxZGRkMDk3NGM4Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.OO4TxVErkym2LovGuhX8Z_rog-N2aOIf5aRPORKM95Q",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Error Loading Movie..");
  return res.json();
}

export default async function Page({ params }: Prop) {
  const { id } = await params;
  const movie = await getMovie(id);

  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backgroundUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;

  const voteAverage = movie.vote_average.toString();

  return (
    <section
      className="min-h-[100vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundUrl})` }}
    >
      <div className="w-full min-h-[100vh] bg-black/80 flex flex-col md:flex-row items-center md:items-start text-white p-[100px] md:p-[100px] gap-[30px]">

        {/* image */}
        <div className="flex shrink-0">
          <Image
            src={posterUrl}
            alt={movie.title}
            width={350}
            height={350}
            className="w-[220px] md:w-[350px] h-auto object-cover rounded-lg"
          />
        </div>

        {/* movie desc */}
        <div className="flex flex-col max-w-[700px]">
          <div className="flex items-center flex-wrap gap-[12px]">
            <span className="text-[24px] md:text-[32px] font-bold">
              {movie.title}
            </span>

            <span className="bg-blue-500 py-[4px] px-[8px] rounded-sm w-max text-[16px]">
              {voteAverage.slice(0, 3)}
            </span>
          </div>

          <span className="text-[#A1A1AA] text-[14px] md:text-[16px] pt-[4px]">
            {movie.release_date}
          </span>

          <p className="pt-[16px] text-[18px] md:text-[20px] font-medium">
            Overview
          </p>

          <span className="text-[15px] md:text-[16px] pt-[8px] leading-relaxed">
            {movie.overview}
          </span>
        </div>
      </div>
    </section>
  );
}