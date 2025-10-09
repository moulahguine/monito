import FiltersAsideClient from "./FiltersAsideClient";

export default function FiltersAsideServer({
  genders,
  colors,
  breeds,
  minPrice,
  maxPrice,
  selected,
}) {
  const filterAside = [
    {
      title: "Gender",
      items: genders,
      dataKey: "gender",
      selectedSet: selected.genders,
      labelRenderer: (value) => (
        <span className="text-[14px] text-primary-600">{value}</span>
      ),
    },
    {
      title: "Color",
      items: colors,
      dataKey: "color",
      selectedSet: selected.colors,
      labelRenderer: (value) => (
        <span className="text-[14px] text-primary-600">{value}</span>
      ),
    },
    {
      title: "Breed",
      items: breeds,
      dataKey: "breed",
      selectedSet: selected.breeds,
      labelRenderer: (value) => (
        <span className="text-[14px] text-primary-600">{value}</span>
      ),
    },
  ];

  const CheckSection = ({
    title,
    items,
    dataKey,
    selectedSet,
    labelRenderer,
  }) => (
    <div className={`mb-4 border-b border-gray-100 pb-4`}>
      <p className="mb-2 text-body-sm-14 text-color-neutral-100 font-bold">
        {title}
      </p>
      <div className="space-y-2">
        {items.map((val) => (
          <label key={val} className="flex items-center gap-2">
            <input
              className={`appearance-none w-[16px] h-[16px] border-1 border-gray-200 rounded`}
              type="checkbox"
              value={val}
              defaultChecked={selectedSet.has(val)}
              data-key={dataKey}
              data-multi="true"
            />
            {labelRenderer(val)}
          </label>
        ))}
      </div>
    </div>
  );

  const PriceSection = () => (
    <div className="mb-2">
      <p className="mb-2 text-body-sm-14 text-color-neutral-100 font-bold">
        Price
      </p>
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={minPrice}
            max={maxPrice}
            placeholder="Min"
            className="w-full rounded border border-neutral-20 bg-neutral-0 px-3 py-2 text-body-sm-14 checked:bg-primary-500 checked:border-none
    focus:outline-none"
            defaultValue={selected.priceMin ?? minPrice}
            data-key="priceMin"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            inputMode="numeric"
            min={minPrice}
            max={maxPrice}
            placeholder="Max"
            className="w-full rounded border border-neutral-20 bg-neutral-0 px-3 py-2 text-[var(--text-body-sm-14)]"
            defaultValue={selected.priceMax ?? maxPrice}
            data-key="priceMax"
          />
        </div>
      </div>
    </div>
  );

  return (
    <FiltersAsideClient className="bg-transparent p-4 h-fit sticky top-6">
      <h3 className="mb-4 text-[24px] font-bold text-primary-500">Filter</h3>
      {filterAside.map((section) => (
        <CheckSection key={section.title} {...section} />
      ))}
      <PriceSection />
    </FiltersAsideClient>
  );
}
