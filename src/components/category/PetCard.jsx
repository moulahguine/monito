"use client";
import Image from "next/image";

export default function PetCard({ pet, onClick }) {
  const { name, breed, color, gene, age, price, image } = pet;

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-20 hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={image}
          alt={`${breed} ${color}`}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-[var(--text-h4-24)] leading-[var(--leading-h4-32)] font-bold text-neutral-100 mb-2">
          {name}
        </h3>

        <div className="space-y-1 mb-3">
          <p className="text-[var(--text-body-sm-14)] leading-[var(--leading-body-sm-20)] text-neutral-60">
            Gene: {gene}
          </p>
          <p className="text-[var(--text-body-sm-14)] leading-[var(--leading-body-sm-20)] text-neutral-60">
            Age: {age} months
          </p>
        </div>

        <p className="text-[var(--text-h5-20)] leading-[var(--leading-h5-28)] font-bold text-primary-500">
          {price.toLocaleString("vi-VN")} VND
        </p>
      </div>
    </div>
  );
}
