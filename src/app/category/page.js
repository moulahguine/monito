import CategoryPage from "@/components/category/CategoryPage";
import { mockPets } from "@/data/mockPets";

export default function CategoryPageRoute() {
  return (
    <main className="pt-24 py-16 bg-neutral-0">
      <div className="mx-auto max-w-7xl px-4">
        <CategoryPage pets={mockPets} title="All Available Pets" />

        {/* Load more pets button */}
        <div className="mt-8 text-center">
          <button className="bg-neutral-80 text-neutral-0 px-8 py-4 rounded-lg font-semibold hover:bg-neutral-60 transition-colors">
            Load More Pets
          </button>
        </div>
      </div>
    </main>
  );
}
