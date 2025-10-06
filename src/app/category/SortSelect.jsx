"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SortSelect({ defaultValue = "popular" }) {
  const router = useRouter();
  const search = useSearchParams();
  const value = search.get("sortBy") || defaultValue;

  const onChange = (e) => {
    const params = new URLSearchParams(search.toString());
    params.set("sortBy", e.target.value);
    params.delete("page"); // reset pagination when sorting
    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      <label className="mr-2 text-[var(--text-body-sm-14)] text-neutral-60">
        Sort by
      </label>
      <select
        name="sortBy"
        value={value}
        onChange={onChange}
        className="rounded-full border border-neutral-20 bg-neutral-0 px-3 py-2 text-[var(--text-body-sm-14)]"
      >
        <option value="popular">Popular</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
}
