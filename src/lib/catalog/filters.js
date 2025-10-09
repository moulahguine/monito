// Filtering utilities: generic, composable, and testable

export function toSet(value) {
  if (Array.isArray(value)) return new Set(value);
  if (value === undefined || value === null || value === "") return new Set();
  return new Set([value]);
}

// Build facets for UI filters; kept specific to current UI needs
export function buildFacets(items) {
  const genders = Array.from(new Set(items.map((p) => p.gene))).sort();
  const colors = Array.from(new Set(items.map((p) => p.color))).sort();
  const breeds = Array.from(new Set(items.map((p) => p.breed))).sort();
  const prices = items.map((p) => Number(p.price));
  return {
    genders,
    colors,
    breeds,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

// Generic filter runner using a configuration array for scalability
// Each config: { key: string, predicate: (item, selected: Set<any>) => boolean }
export function applyFilters(
  items,
  { filtersConfig = [], selectedByKey = {}, priceMax }
) {
  let result = items;
  if (typeof priceMax === "number") {
    result = result.filter((p) => Number(p.price) <= priceMax);
  }
  for (const config of filtersConfig) {
    const selected = selectedByKey[config.key];
    if (selected && selected.size) {
      result = result.filter((item) => config.predicate(item, selected));
    }
  }
  return result;
}
