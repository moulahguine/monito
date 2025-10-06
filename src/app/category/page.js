import BannerPet from "@/components/bannerPet/BannerPet";
import image from "../../../public/images/pet-banners/pet-banner-1.png";
import Card from "@/components/category/Card";
import FiltersAside from "./FiltersAside";
import SortSelect from "./SortSelect";
import { mockPets } from "@/data/mockPets";

function toSet(value) {
  if (Array.isArray(value)) return new Set(value);
  if (value === undefined || value === null || value === "") return new Set();
  return new Set([value]);
}

function buildFacets(pets) {
  const genders = Array.from(new Set(pets.map((p) => p.gene))).sort();
  const colors = Array.from(new Set(pets.map((p) => p.color))).sort();
  const breeds = Array.from(new Set(pets.map((p) => p.breed))).sort();
  const prices = pets.map((p) => Number(p.price));
  return {
    genders,
    colors,
    breeds,
    minPrice: Math.min(...prices),
    maxPrice: Math.max(...prices),
  };
}

function filterAndSortPets(
  pets,
  { selectedGenders, selectedColors, selectedBreeds, priceMax, sortBy }
) {
  let list = pets.filter((p) => Number(p.price) <= priceMax);
  if (selectedGenders.size)
    list = list.filter((p) => selectedGenders.has(p.gene));
  if (selectedColors.size)
    list = list.filter((p) => selectedColors.has(p.color));
  if (selectedBreeds.size)
    list = list.filter((p) => selectedBreeds.has(p.breed));

  switch (sortBy) {
    case "price-asc":
      return [...list].sort((a, b) => Number(a.price) - Number(b.price));
    case "price-desc":
      return [...list].sort((a, b) => Number(b.price) - Number(a.price));
    case "newest":
    default:
      return list;
  }
}

function getPageNumbers(total, current) {
  const pages = [];
  for (let i = 1; i <= total; i++) pages.push(i);
  return pages;
}

export default function CategoryPage({ searchParams }) {
  const selectedGenders = toSet(searchParams?.gender);
  const selectedColors = toSet(searchParams?.color);
  const selectedBreeds = toSet(searchParams?.breed);
  const prices = mockPets.map((p) => Number(p.price));
  const maxPrice = Math.max(...prices);
  const priceMax = Number(searchParams?.priceMax) || maxPrice;
  const sortBy = searchParams?.sortBy || "popular";
  const page = Math.max(1, Number(searchParams?.page) || 1);
  const pageSize = Math.max(1, Number(searchParams?.pageSize) || 12);

  const facets = buildFacets(mockPets);
  const filtered = filterAndSortPets(mockPets, {
    selectedGenders,
    selectedColors,
    selectedBreeds,
    priceMax,
    sortBy,
  });

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filtered.slice(start, end);

  const makeLink = (nextPage) => {
    const params = new URLSearchParams();
    // preserve multi-values
    selectedGenders.forEach((v) => params.append("gender", v));
    selectedColors.forEach((v) => params.append("color", v));
    selectedBreeds.forEach((v) => params.append("breed", v));
    if (priceMax && priceMax !== facets.maxPrice)
      params.set("priceMax", String(priceMax));
    if (sortBy && sortBy !== "popular") params.set("sortBy", sortBy);
    params.set("page", String(nextPage));
    params.set("pageSize", String(pageSize));
    return `?${params.toString()}`;
  };

  return (
    <div>
      <BannerPet imagePosition="left" image={image} />

      <div className="mx-auto max-w-7xl px-4  flex grid-cols-1 lg:grid-cols-[260px,1fr] gap-8 py-12">
        <aside>
          <FiltersAside
            genders={facets.genders}
            colors={facets.colors}
            breeds={facets.breeds}
            minPrice={facets.minPrice}
            maxPrice={facets.maxPrice}
          />
        </aside>
        <main>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-[var(--text-h3-28)] leading-[var(--leading-h3-36)] font-bold text-neutral-100">
                Small Dog
                <span className="ml-2 text-[var(--text-body-16)] text-neutral-60">
                  ({total} dogs)
                </span>
              </h2>
            </div>
            <SortSelect defaultValue={sortBy} />
          </div>

          {pageItems.length === 0 ? (
            <div className="rounded-xl border border-neutral-20 p-6 text-neutral-60">
              No results. Try adjusting filters or
              <a href="?" className="ml-1 text-primary-500 underline">
                clear all
              </a>
              .
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {pageItems.map((pet, index) => (
                <Card
                  key={`${pet.name}-${pet.image}-${index}`}
                  img={pet.image}
                  title={pet.name}
                  subtitle={`Gender: ${pet.gene}`}
                  description={`Age: ${pet.age} months`}
                  price={Number(pet.price)}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <a
                href={makeLink(Math.max(1, currentPage - 1))}
                aria-disabled={currentPage === 1}
                className="px-3 py-1 rounded border border-neutral-20 text-neutral-80 disabled:opacity-50"
              >
                Prev
              </a>
              {getPageNumbers(totalPages, currentPage).map((p) => (
                <a
                  key={p}
                  href={makeLink(p)}
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
                href={makeLink(Math.min(totalPages, currentPage + 1))}
                aria-disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border border-neutral-20 text-neutral-80 disabled:opacity-50"
              >
                Next
              </a>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
