"use client";
import Link from "next/link";
import Card from "./Card";

export default function CategoryPage({ pets, title, showViewAll = false }) {
  return (
    <>
      {title && (
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[var(--text-h2-36)] leading-[var(--leading-h2-44)] font-bold text-neutral-100">
            {title}
          </h2>
          {showViewAll && (
            <Link
              href="/category"
              className="text-primary-500 hover:text-primary-600 font-semibold text-[var(--text-body-16)]"
            >
              View more
            </Link>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pets.map((pet, index) => (
          <Card
            key={`${pet.breed}-${pet.color}-${index}`}
            img={pet.image}
            title={pet.name}
            subtitle={`Gene: ${pet.gene}`}
            description={`Age: ${pet.age} months`}
            price={pet.price}
            onClick={() => console.log(`Selected: ${pet.name}`)}
          />
        ))}
      </div>
    </>
  );
}
