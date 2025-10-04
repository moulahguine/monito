import Image from "next/image";
import AnimatedShapes from "@/components/AnimatedShapes";

export default function HomePage() {
  return (
    <main>
      <section className="absolute inset-x-0 top-0 h-[770px] overflow-hidden bg-secondary-500/10">
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
              <p className="mt-4 max-w-[450px] text-body-16 leading-[1.7] text-neutral-80">
                Having a pet means you have more joy, a new friend, a happy
                person who will always be with you to have fun. We have 200+
                different pets that can meet your needs!
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#"
                  className="rounded-full bg-primary-500 px-5 py-3 font-semibold text-neutral-0"
                >
                  Explore Now
                </a>
              </div>
            </div>

            <div className="relative h-full hidden w-[1200px] md:block flex-1">
              <Image
                className="absolute z-10 left-40 bottom-0  max-w-none"
                src="/images/hero section/heroImg.png"
                alt="Hero"
                width={500}
                height={500}
              />

              <AnimatedShapes />
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to allow scrolling below fixed hero */}
      <div className="h-dvh"></div>
    </main>
  );
}
