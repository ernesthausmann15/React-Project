// This teaching component demonstrates prop drilling: a parent owns modal
// state and passes movie data plus callbacks down to reusable children.
import { useState } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";

export default function MovieContainer({ movies }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const handleOpenModal = (movie) => setSelectedMovie(movie);
  const handleCloseModal = () => setSelectedMovie(null);

  return (
    <section className="movie-container">
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            onSelect={handleOpenModal}
          />
        ))}
      </div>
      <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
    </section>
  );
}
