"use client";
import Link from "next/link";
import Card from "./Card";
import { FaArrowRight, FaBeer } from "react-icons/fa";

export default function HomePetSection({ pets, limit = 8 }) {
  const displayedPets = limit ? pets.slice(0, limit) : pets;

  return (
    <section className="py-16 bg-neutral-0">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[var(--text-h2-36)] leading-[var(--leading-h2-44)] font-bold text-neutral-100">
            What's new?
            <br />
            <span className="text-h4-24 text-primary-500/90">
              Take A Look At Some Of Our Pets
            </span>
          </h2>
          <Link
            href="/category"
            className="flex items-center gap-1.5 text-primary-500 hover:text-primary-600 font-semibold text-body-16 border px-[28px] py-[12px] rounded-4xl group transition-colors"
          >
            View More{" "}
            <FaArrowRight className="text-[14px] group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPets.map((pet, index) => (
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
      </div>
    </section>
  );
}
