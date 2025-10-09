"use client";

import Card from "@/components/ui/Card";
import FiltersAsideServer from "./FiltersAsideServer";
import SortSelect from "./SortSelect";
export default function CategoryContent({
  items,
  facets,
  total,
  totalPages,
  currentPage,
  pageNumbers,
  sortBy,
  priceMin,
  priceMax,
  pageSize,
  linkBaseParams,
  title = "Small Dog",
}) {
  const makeLink = (updates = {}) => {
    const params = new URLSearchParams();
    (linkBaseParams?.genders || []).forEach((v) => params.append("gender", v));
    (linkBaseParams?.colors || []).forEach((v) => params.append("color", v));
    (linkBaseParams?.breeds || []).forEach((v) => params.append("breed", v));
    if (priceMin && priceMin !== facets.minPrice)
      params.set("priceMin", String(priceMin));
    if (priceMax && priceMax !== facets.maxPrice)
      params.set("priceMax", String(priceMax));
    if (sortBy && sortBy !== "popular") params.set("sortBy", String(sortBy));
    params.set("page", String(currentPage));
    params.set("pageSize", String(pageSize));
    Object.entries(updates).forEach(([k, v]) => {
      if (v === undefined || v === null || v === "") return;
      params.set(k, String(v));
    });
    return `?${params.toString()}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4  flex grid-cols-1 lg:grid-cols-[260px,1fr] gap-8 py-12">
      <FiltersAsideServer
        genders={facets.genders}
        colors={facets.colors}
        breeds={facets.breeds}
        minPrice={facets.minPrice}
        maxPrice={facets.maxPrice}
        selected={{
          genders: new Set(linkBaseParams?.genders || []),
          colors: new Set(linkBaseParams?.colors || []),
          breeds: new Set(linkBaseParams?.breeds || []),
          priceMin,
          priceMax,
        }}
      />

      <main>
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-[var(--text-h3-28)] leading-[var(--leading-h3-36)] font-bold text-neutral-100">
              {title}
              <span className="ml-2 text-[var(--text-body-16)] text-neutral-60">
                ({total} dogs)
              </span>
            </h2>
          </div>
          <SortSelect defaultValue={sortBy} />
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-neutral-20 p-6 text-neutral-60">
            No results. Try adjusting filters or
            <a href="?" className="ml-1 text-primary-500 underline">
              clear all
            </a>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item, index) => (
              <Card
                key={`${item.name}-${item.image}-${index}`}
                img={item.image}
                title={item.name}
                subtitle={`Gender: ${item.gene}`}
                description={`Age: ${item.age} months`}
                price={Number(item.price)}
              />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <a
              href={makeLink({ page: Math.max(1, currentPage - 1) })}
              aria-disabled={currentPage === 1}
              className="px-3 py-1 rounded border border-neutral-20 text-neutral-80 disabled:opacity-50"
            >
              Prev
            </a>
            {pageNumbers.map((p) => (
              <a
                key={p}
                href={makeLink({ page: p })}
                aria-current={p === currentPage ? "page" : undefined}
                className={`px-3 py-1 rounded border ${
                  p === currentPage
                    ? "border-primary-500 text-primary-600"
                    : "border-neutral-20 text-neutral-80"
                }`}
              >
                {p}
              </a>
            ))}
            <a
              href={makeLink({ page: Math.min(totalPages, currentPage + 1) })}
              aria-disabled={currentPage === totalPages}
              className="px-3 py-1 rounded border border-neutral-20 text-neutral-80 disabled:opacity-50"
            >
              Next
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
