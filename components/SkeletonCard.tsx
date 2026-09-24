interface SkeletonGridProps {
  count?: number;
  label?: string;
  className?: string;
}

export function SkeletonCard() {
  return (
    <div
      className="movie-card skeleton-card overflow-hidden rounded-sm border border-[var(--line)] bg-surface p-2.5 pb-3"
      aria-hidden="true"
    >
      <div className="skeleton-poster shimmer aspect-[2/3] rounded-sm" />
      <div className="mt-3 space-y-2">
        <div className="skeleton-line skeleton-title shimmer h-3 w-[78%] rounded-sm" />
        <div className="skeleton-line skeleton-meta shimmer h-2 w-[32%] rounded-sm" />
      </div>
    </div>
  );
}

export function SkeletonGrid({
  count = 6,
  label = "Loading movie results",
  className = "movie-grid skeleton-grid",
}: SkeletonGridProps) {
  return (
    <div className={className} role="status" aria-label={label}>
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
      <div className="detail-skeleton-poster shimmer rounded-sm" />
      <div className="detail-skeleton-copy space-y-4 pt-2">
        <div className="skeleton-line skeleton-kicker shimmer h-2.5 w-28 rounded-sm" />
        <div className="skeleton-line skeleton-heading shimmer h-16 w-[70%] rounded-sm" />
        <div className="skeleton-line skeleton-wide shimmer h-3 w-[90%] rounded-sm" />
        <div className="skeleton-line skeleton-wide shimmer h-3 w-[84%] rounded-sm" />
        <div className="skeleton-line skeleton-short shimmer h-3 w-[55%] rounded-sm" />
        <div className="skeleton-facts mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-4">
          <div className="skeleton-line shimmer h-9 rounded-sm" />
          <div className="skeleton-line shimmer h-9 rounded-sm" />
          <div className="skeleton-line shimmer h-9 rounded-sm" />
        </div>
      </div>
    </div>
  );
}
