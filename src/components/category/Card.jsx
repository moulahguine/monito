"use client";
import Image from "next/image";

export default function Card({
  img,
  title,
  subtitle,
  description,
  price,
  onClick,
  ...props
}) {
  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-lg  hover:shadow-sm transition-shadow p-2 group transition duration-300 ease-in-out cursor-pointer"
      onClick={onClick}
      {...props}
    >
      <div className="aspect-square relative overflow-hidden  ">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover group-hover:scale-120 group-hover:-rotate-6 transition duration-300 ease-in-out"
        />
      </div>

      <div className="p-4">
        <h3 className="text-body-16 leading-[var(--leading-h4-32)] font-bold text-neutral-100 mb-2">
          {title}
        </h3>
        <div className="flex gap-3">
          {subtitle && (
            <p className="text-body-sm-14 leading-[var(--leading-body-sm-20)] text-neutral-60 mb-2">
              {subtitle}
            </p>
          )}
          <span className="bg-neutral-60 w-1 h-1 rounded-full mt-2 "></span>
          {description && (
            <p className="text-body-sm-14 leading-[var(--leading-body-sm-20)] text-neutral-60 mb-3">
              {description}
            </p>
          )}
        </div>
        {price && (
          <p className="text-h5-20 leading-[var(--leading-h5-28)] font-bold text-primary-500">
            {price.toLocaleString("vi-VN")} VND
          </p>
        )}
      </div>
    </div>
  );
}
