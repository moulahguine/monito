import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary-500/20">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-2xl bg-neutral-0 p-6 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2 md:items-center">
            <div>
              <h3 className="text-[var(--text-h3-28)] leading-[var(--leading-h3-36)] font-bold text-primary-500">
                Register Now So You Don’t Miss Our Programs
              </h3>
            </div>
            <form className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full rounded-full border border-neutral-40 px-4 py-3 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-primary-500 px-5 py-3 text-neutral-0 font-semibold"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <nav className="flex gap-6 text-neutral-80">
            <Link href="#">Home</Link>
            <Link href="#">Category</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
          </nav>
          <div className="md:col-span-2 text-right text-neutral-60 text-sm">
            © {new Date().getFullYear()} Monito. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
