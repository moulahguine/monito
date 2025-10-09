// Sorting utilities: map-based for extensibility

export const sorters = {
  "price-asc": (a, b) => Number(a.price) - Number(b.price),
  "price-desc": (a, b) => Number(b.price) - Number(a.price),
  newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  popular: null, // no-op; preserves incoming order
};

export function sortItems(items, sortKey) {
  const sorter = sorters[sortKey] || sorters["popular"];
  if (!sorter) return items; // default no-op
  return [...items].sort(sorter);
}
