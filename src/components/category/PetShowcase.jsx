import Link from "next/link";
import PetCard from "./PetCard";

export default function PetShowcase({
  pets,
  title = "What's new? Take A Look At Some Of Our Pets",
}) {
  return (
    <section className="py-16 bg-neutral-0">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[var(--text-h2-36)] leading-[var(--leading-h2-44)] font-bold text-neutral-100">
            {title}
          </h2>
          <Link
            href="/category"
            className="text-primary-500 hover:text-primary-600 font-semibold text-[var(--text-body-16)]"
          >
            View more
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pets.map((pet, index) => (
            <PetCard
              key={`${pet.breed}-${pet.color}-${index}`}
              pet={pet}
              onClick={() => console.log(`Selected: ${pet.name}`)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
