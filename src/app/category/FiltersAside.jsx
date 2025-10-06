"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

export default function FiltersAside({
  genders,
  colors,
  breeds,
  minPrice,
  maxPrice,
}) {
  const router = useRouter();
  const search = useSearchParams();

  const selected = useMemo(() => {
    const getMulti = (key) => new Set(search.getAll(key));
    return {
      genders: getMulti("gender"),
      colors: getMulti("color"),
      breeds: getMulti("breed"),
      priceMax: Number(search.get("priceMax")) || maxPrice,
    };
  }, [search, maxPrice]);

  const updateParam = (key, value, multi = false) => {
    const params = new URLSearchParams(search.toString());
    if (multi) {
      const values = new Set(params.getAll(key));
      values.has(value) ? values.delete(value) : values.add(value);
      params.delete(key);
      [...values].forEach((v) => params.append(key, v));
    } else {
      if (value === undefined || value === null || value === "")
        params.delete(key);
      else params.set(key, String(value));
    }
    params.delete("page"); // reset pagination on filter change
    router.replace(`?${params.toString()}`);
  };

  return (
    <aside className="rounded-2xl border border-neutral-20 bg-neutral-0 p-4 h-fit sticky top-6">
      <h3 className="mb-4 text-[var(--text-h5-20)] font-bold text-neutral-100">
        Filter
      </h3>

      <div className="mb-4">
        <p className="mb-2 text-[var(--text-body-sm-14)] text-neutral-60">
          Gender
        </p>
        <div className="space-y-2">
          {genders.map((g) => (
            <label key={g} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.genders.has(g)}
                onChange={() => updateParam("gender", g, true)}
              />
              <span>{g}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-[var(--text-body-sm-14)] text-neutral-60">
          Color
        </p>
        <div className="max-h-32 overflow-auto space-y-2 pr-1">
          {colors.map((c) => (
            <label key={c} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.colors.has(c)}
                onChange={() => updateParam("color", c, true)}
              />
              <span>{c}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <p className="mb-2 text-[var(--text-body-sm-14)] text-neutral-60">
          Breed
        </p>
        <div className="space-y-2">
          {breeds.map((b) => (
            <label key={b} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.breeds.has(b)}
                onChange={() => updateParam("breed", b, true)}
              />
              <span>{b}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-2">
        <p className="mb-2 text-[var(--text-body-sm-14)] text-neutral-60">
          Price
        </p>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          value={selected.priceMax}
          onChange={(e) => updateParam("priceMax", Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 text-[var(--text-caption-12)] text-neutral-60">
          Up to {selected.priceMax.toLocaleString("vi-VN")} VND
        </div>
      </div>
    </aside>
  );
}
