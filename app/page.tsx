import { MovieBanner } from "./components/MovieBanner";
import { MovieSlider } from "./components/MovieSlider";
export default function Home() {
  return (
    <div className="bg-[#000]">
      <MovieBanner />
      <MovieSlider title="Now Playing" category="now_playing" />
      <MovieSlider title="Top Rated" category="top_rated" />
      <MovieSlider title="Popular" category="popular" />
      <MovieSlider title="Upcoming" category="upcoming" />
    </div>
  );
}
