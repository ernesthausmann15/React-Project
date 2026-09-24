import { DetailSkeleton, SkeletonGrid } from "@/components/SkeletonCard";
import Link from "next/link";

export default function MovieLoading() {
  return (
    <main className="page-shell details-page" aria-busy="true">
      <Link className="back-link" href="/movies">
        ← Back to browse
      </Link>
      <DetailSkeleton />
      <section className="related-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Continue the thread</span>
            <h2>Finding related titles</h2>
          </div>
        </div>
        <SkeletonGrid count={4} label="Loading related titles" />
      </section>
    </main>
  );
}
