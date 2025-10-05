"use client";
import Image from "next/image";
import Button from "../ui/Button";

export default function ReusableCard({
  title,
  subtitle,
  description,
  image,
  imageAlt = "Card image",
  imagePosition = "right",
  contentBg = "bg-neutral-100",
  imageBgColors = ["bg-primary-500", "bg-secondary-500"],
  imageFit = "contain",
  primaryBtnText,
  primaryBtnHref,
  secondaryBtnText,
  secondaryBtnHref,
  className = "",
  onPrimaryClick,
  onSecondaryClick,
  ...props
}) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="w-full">
      <main
        className={`max-w-7xl mx-auto flex flex-col lg:flex-row items-end border-0 rounded-3xl bg-primary-500 lg:h-[378px] overflow-hidden ${className}`}
        {...props}
      >
        {/* Image Section */}
        <div
          className={`relative w-full h-80 lg:w-1/2  lg:min-h-[520px] flex-shrink-0 ${
            isImageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <div className="pointer-events-none absolute z-10 right-[55px] bottom-[-260px] h-[700px] w-[700px] -rotate-150 -translate-x-5 translate-y-55 rounded-[99px] bg-primary-600 "></div>
          <Image
            src={image}
            alt={imageAlt}
            width={500}
            height={500}
            className={`w-[513px] h-[367px] object-contain absolute bottom-0 z-20`}
          />
        </div>

        {/* Content Section */}
        <div
          className={`w-full h-[100%] p-12  relative ${
            isImageLeft ? "lg:order-2" : "lg:order-1"
          }`}
        >
          <span className="pointer-events-none absolute -top-30 -right-40  z-10  h-[635px] w-[782px] rounded-[99px] rotate-[35deg]   bg-secondary-400"></span>

          <div className="max-w-lg relative z-20 flex flex-col items-end ">
            <h2 className="text-5xl font-bold text-primary-600 mb-4">
              {title}
            </h2>

            {subtitle && (
              <p className="text-2xl font-bold  text-primary-600 uppercase tracking-wider mb-3">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="text-body-16  text-primary-500 mb-8 w-[450px] text-end">
                {description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {secondaryBtnText && (
                <Button
                  variant="secondary"
                  href={secondaryBtnHref}
                  onClick={onSecondaryClick}
                  className="w-full sm:w-auto"
                >
                  {secondaryBtnText}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}
