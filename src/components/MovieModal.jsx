import { useEffect } from "react";

export default function MovieModal({ movie, onClose }) {
  useEffect(() => {
    if (!movie) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("modal-open");
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("modal-open");
    };
  }, [movie, onClose]);
  if (!movie) return null;
  const poster =
    movie.Poster !== "N/A"
      ? movie.Poster
      : "https://placehold.co/600x900/17202a/e8f0f2?text=No+Poster";
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="movie-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="icon-button modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close movie preview"
        >
          &times;
        </button>
        <img src={poster} alt={`${movie.Title} poster`} />
        <div className="modal-content">
          <span className="eyebrow">Quick preview</span>
          <h2 id="modal-title">{movie.Title}</h2>
          <p className="muted">
            {movie.Year} · {movie.Type || "Movie"}
          </p>
          <p>
            Open the full record to explore ratings, cast, plot, and related
            films.
          </p>
        </div>
      </section>
    </div>
  );
}
