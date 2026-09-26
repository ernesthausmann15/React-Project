export default function FilterBar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  resultCount,
}) {
  return (
    <div className="filter-bar">
      <label className="search-field">
        <span>Filter results</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Title or year"
        />
      </label>
      <label className="sort-field">
        <span>Sort by</span>
        <select
          value={sort}
          onChange={(event) => onSortChange(event.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="title">Title A-Z</option>
        </select>
      </label>
      <span className="result-count">{resultCount} titles</span>
    </div>
  );
}
