import { toSet, applyFilters, buildFacets } from "@/lib/catalog/filters";
import { sortItems } from "@/lib/catalog/sorters";
import { paginate, getPageNumbers } from "@/lib/catalog/pagination";

export function filterCatalogServer({
  items,
  searchParams,
  defaultPageSize = 16,
  defaultSort = "popular",
}) {
  const getAll = (k) => {
    if (!searchParams) return [];

    if (typeof searchParams.getAll === "function")
      return searchParams.getAll(k);

    const v = searchParams[k];

    if (Array.isArray(v)) return v;

    if (v === undefined || v === null || v === "") return [];

    return [String(v)];
  };

  const getOne = (k) => {
    if (!searchParams) return undefined;

    if (typeof searchParams.get === "function")
      return searchParams.get(k) ?? undefined;

    const v = searchParams[k];

    return v === undefined || v === null || v === "" ? undefined : String(v);
  };

  const selectedByKey = {
    gender: toSet(getAll("gender")),
    color: toSet(getAll("color")),
    breed: toSet(getAll("breed")),
  };

  const facets = buildFacets(items);

  const rawMin = Number(getOne("priceMin"));
  const rawMax = Number(getOne("priceMax"));
  const priceMin =
    Number.isFinite(rawMin) && rawMin >= 0 ? rawMin : facets.minPrice;
  const priceMax =
    Number.isFinite(rawMax) && rawMax > 0 ? rawMax : facets.maxPrice;

  const sortBy = getOne("sortBy") || defaultSort;

  const priceFiltered = items.filter((p) => {
    const price = Number(p.price);
    return price >= priceMin && price <= priceMax;
  });

  const filtered = applyFilters(priceFiltered, {
    filtersConfig: [
      { key: "gender", predicate: (item, set) => set.has(item.gene) },
      { key: "color", predicate: (item, set) => set.has(item.color) },
      { key: "breed", predicate: (item, set) => set.has(item.breed) },
    ],
    selectedByKey,
  });

  const sorted = sortItems(filtered, sortBy);

  const page = Math.max(1, Number(getOne("page")) || 1);
  const pageSize = Math.max(1, Number(getOne("pageSize")) || defaultPageSize);

  const pagination = paginate(sorted, page, pageSize);

  const pageNumbers = getPageNumbers(pagination.totalPages);

  const linkBaseParams = {
    genders: Array.from(selectedByKey.gender),
    colors: Array.from(selectedByKey.color),
    breeds: Array.from(selectedByKey.breed),
    priceMin,
    priceMax,
    sortBy,
    pageSize,
    currentPage: pagination.currentPage,
  };

  return {
    facets,
    selectedByKey,
    priceMin,
    priceMax,
    sortBy,
    pageSize,
    pageItems: pagination.pageItems,
    total: pagination.total,
    totalPages: pagination.totalPages,
    currentPage: pagination.currentPage,
    pageNumbers,
    linkBaseParams,
  };
}
