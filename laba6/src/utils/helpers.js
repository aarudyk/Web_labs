const SORT_OPTIONS = new Set([
  "all",
  "rating-high",
  "rating-low",
  "year-new",
  "year-old",
]);

export function filterAndSortItems(items, searchQuery, filterValue) {
  const query = searchQuery.trim().toLowerCase();
  const isSortOption = SORT_OPTIONS.has(filterValue);

  let result = items.filter((item) => {
    const matchesSearch =
      !query ||
      item.title.toLowerCase().includes(query) ||
      item.author.toLowerCase().includes(query) ||
      item.genre.toLowerCase().includes(query);

    const matchesGenre =
      isSortOption ||
      item.genre.toLowerCase() === filterValue.toLowerCase();

    return matchesSearch && matchesGenre;
  });

  switch (filterValue) {
    case "rating-high":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case "rating-low":
      result = [...result].sort((a, b) => a.rating - b.rating);
      break;
    case "year-new":
      result = [...result].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
      break;
    case "year-old":
      result = [...result].sort((a, b) => (a.year ?? 9999) - (b.year ?? 9999));
      break;
    default:
      result = [...result].sort((a, b) => a.title.localeCompare(b.title, "uk"));
      break;
  }

  return result;
}

export function getUniqueGenres(items) {
  const genres = items.map((item) => item.genre).filter(Boolean);
  return [...new Set(genres)].sort((a, b) => a.localeCompare(b, "uk"));
}

export function createLocalId() {
  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
