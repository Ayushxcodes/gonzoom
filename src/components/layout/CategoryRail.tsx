import Link from "next/link";

const categories = [
  "politics",
  "identity",
  "region",
  "crime",
  "people",
  "anonymous",
];

export default function CategoryRail() {
  return (
    <section aria-labelledby="categories">
      <h2 id="categories" className="mb-4 text-2xl font-semibold">
        Categories
      </h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((c) => (
          <Link
            key={c}
            href={`/category/${c}`}
            className="rounded-full border px-3 py-1 text-sm hover:bg-slate-100"
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </Link>
        ))}
      </div>
    </section>
  );
}
