export function SkeletonCard() {
  return (
    <div className="movie-card skeleton-card" aria-hidden="true">
      <div className="skeleton-poster shimmer" />
      <div className="skeleton-line skeleton-title shimmer" />
      <div className="skeleton-line skeleton-meta shimmer" />
    </div>
  );
}

export function SkeletonGrid({ count = 6, label = "Loading movie results" }) {
  return (
    <div className="movie-grid skeleton-grid" role="status" aria-label={label}>
      <span className="sr-only">{label}</span>
      {Array.from({ length: count }, (_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div
      className="detail-skeleton"
      role="status"
      aria-label="Loading movie details"
    >
      <span className="sr-only">Loading movie details</span>
      <div className="detail-skeleton-poster shimmer" />
      <div className="detail-skeleton-copy">
        <div className="skeleton-line skeleton-kicker shimmer" />
        <div className="skeleton-line skeleton-heading shimmer" />
        <div className="skeleton-line skeleton-wide shimmer" />
        <div className="skeleton-line skeleton-wide shimmer" />
        <div className="skeleton-line skeleton-short shimmer" />
        <div className="skeleton-facts">
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line shimmer" />
          <div className="skeleton-line shimmer" />
        </div>
      </div>
    </div>
  );
}
