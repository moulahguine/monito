import Image from "next/image";
import AnimatedShapes from "@/components/hero/AnimatedShapes";
import Button from "@/components/ui/Button";
import Card from "@/components/category/Card";
import { mockPets } from "@/data/mockPets";
import BannerPet from "@/components/bannerPet/BannerPet";

export default function HomePage() {
  return (
    <main>
      <section className="relative inset-x-0 top-0 h-[100vh] overflow-hidden bg-secondary-500/35">
        <div className="mx-auto h-full max-w-7xl px-4 relative">
          <div className="pointer-events-none absolute -z-1 -left-80 -top-150 h-[635px] w-[635px] rounded-[99px] rotate-[25deg] bg-secondary-500/50"></div>
          <div className="flex w-full h-full relative justify-between">
            <div className="flex flex-col justify-center gap-4">
              <h1 className="flex flex-col relative text-6xl leading-display-60 font-extrabold text-primary-500">
                One More Friend
                <div className="pointer-events-none absolute -left-2 -top-2 h-20 w-20 -rotate-[25deg] rounded-xl bg-secondary-500/50 z-[-1]"></div>
                <span className="mt-2 text-h1-40  font-light text-primary-500">
                  Thousands More Fun!
                </span>
              </h1>
              <p className=" mt-4 max-w-[450px] text-body-16 leading-[1.7] text-neutral-80">
                Having a pet means you have more joy, a new friend, a happy
                person who will always be with you to have fun. We have 200+
                different pets that can meet your needs!
              </p>
              <div className="mt-6">
                <Button variant="primary">Explore Now</Button>
              </div>
            </div>

            <div className="relative h-full hidden w-[1200px] md:block flex-1">
              <Image
                className="absolute z-10 left-40 bottom-0 w-150 max-w-none"
                src="/images/hero-section/heroImg.png"
                alt="Hero"
                width={500}
                height={500}
              />

              <AnimatedShapes />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[var(--text-h3-28)] leading-[var(--leading-h3-36)] font-bold text-neutral-100">
              Small Dog
              <span className="ml-2 text-[var(--text-body-16)] text-neutral-60">
                ({mockPets.slice(0, 8).length} dogs)
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockPets.slice(0, 8).map((pet, index) => (
              <Card
                key={`${pet.name}-${pet.image}-${index}`}
                img={pet.image}
                title={pet.name}
                subtitle={`Gender: ${pet.gene}`}
                description={`Age: ${pet.age} months`}
                price={Number(pet.price)}
              />
            ))}
          </div>
        </div>
      </section>

      <BannerPet
        title="One More Friend"
        subtitle="Thousands More Fun!"
        description="Having a pet means you have more joy, a new friend, a happy person who will always be with you to have fun. We have 200+ different pets that can meet your needs!"
        image="/images/pet-banners/pet-banner-1.png"
        imageAlt="Young woman with Corgi dog"
        imagePosition="left"
        secondaryBtnText="Explore Now"
        primaryBtnHref="#intro"
      />
    </main>
  );
}
