"use client";


export default function TopGenreTags(genres: string[]) {
  return (
    <section className="w-full py-12 transition-colors duration-500">
      <div className="max-w-8xl mx-auto">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-primary dark:text-primary/90 mb-8">
          Top Genre Tags
        </h2>

        {/* Tag Grid */}
        <div className="flex flex-wrap gap-4">
          {genres.map((genre, index) => (
            <span
              key={index}
              className="
                px-5 py-2
                text-sm md:text-base
                font-medium
                rounded-full
                border border-[#E6E0F5] dark:border-[#2C2750]
                bg-[#F2ECFB] dark:bg-[#1A1630]
                text-[#6C63A6] dark:text-[#B8A9F3]
                shadow-sm
                hover:bg-[#EDE6FB] dark:hover:bg-[#231C43]
                hover:shadow-md
                transition-all
              "
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
