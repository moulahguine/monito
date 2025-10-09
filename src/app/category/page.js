import BannerPet from "@/components/bannerPet/BannerPet";
import image from "../../../public/images/pet-banners/pet-banner-1.png";
import { mockPets } from "@/data/mockPets";
import CategoryContent from "./CategoryContent";
import { filterCatalogServer } from "@/lib/catalog/serverFilter";

export default function CategoryPage({ searchParams }) {
  const result = filterCatalogServer({ items: mockPets, searchParams });
  return (
    <div>
      <BannerPet
        imagePosition="left"
        image={image}
        imgBackground={false}
        classNameForText={`rotate-[50deg]`}
      />
      <CategoryContent
        items={result.pageItems}
        facets={result.facets}
        total={result.total}
        totalPages={result.totalPages}
        currentPage={result.currentPage}
        pageNumbers={result.pageNumbers}
        sortBy={result.sortBy}
        priceMin={result.priceMin}
        priceMax={result.priceMax}
        pageSize={result.pageSize}
        linkBaseParams={result.linkBaseParams}
      />
    </div>
  );
}
