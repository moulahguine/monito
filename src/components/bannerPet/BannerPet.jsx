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
  onPrimaryClick,
  mainBackground,
  imgBackground,
  textBackgournd,
  classNameForImg,
  classNameForText,
  classNameForMain,
  ...props
}) {
  const isImageLeft = imagePosition === "left";

  return (
    <section className="w-full mt-5 ">
      <main
        className={`max-w-7xl  mx-auto flex flex-col lg:flex-row items-end border-0 rounded-3xl bg-primary-500 lg:h-[378px] overflow-hidden group ${classNameForMain}`}
        {...props}
      >
        {/* Image Section */}
        <div
          className={`relative w-full h-80 lg:w-1/2  lg:min-h-[520px] flex-shrink-0 ${
            isImageLeft ? "lg:order-1" : "lg:order-2"
          }`}
        >
          <span
            className={`${
              imgBackground ? "inline" : "hidden"
            } pointer-events-none absolute z-10 bg-primary-600 duration-600 ${
              isImageLeft
                ? "right-[100px] top-[300px] h-[700px] w-[700px] rotate-30 rounded-[99px] group-hover:rotate-20  "
                : "-right-[150px] top-[300px] h-[700px] w-[700px] rotate-150 rounded-[99px] group-hover:rotate-160  "
            }`}
          ></span>
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
          <span
            className={`pointer-events-none absolute   ${
              isImageLeft
                ? "-right-[100px] -top-[250px] h-[700px] w-[700px] -rotate-150 rounded-[99px]  group-hover:-rotate-[160deg]"
                : "-left-[120px] -top-[250px] h-[700px] w-[700px] rotate-150 rounded-[99px]  group-hover:rotate-[160deg]"
            }  bg-secondary-400 duration-600 `}
          ></span>

          <div
            className={`max-w-lg relative z-20 flex flex-col ${
              isImageLeft ? "items-end" : "items-start"
            }  items-end `}
          >
            <h2 className="text-5xl font-bold text-primary-600 mb-4">
              {title}
            </h2>

            {subtitle && (
              <p className="text-2xl font-bold  text-primary-600 uppercase tracking-wider mb-3">
                {subtitle}
              </p>
            )}

            {description && (
              <p
                className={`text-body-16  text-primary-500 mb-8 w-[450px] ${
                  isImageLeft ? "text-end" : "text-start"
                } `}
              >
                {description}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {secondaryBtnText && (
                <Button
                  variant="secondary"
                  className="group-hover:bg-primary-600 group-hover:text-white"
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
