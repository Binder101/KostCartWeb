import Image from "next/image";

type PainPoint = {
    icon: string;      // using emoji to match your screenshot style
    title: string;
    subtitle?: string;
};

const PAIN_POINTS: PainPoint[] = [
    {
        icon: "📊",
        title: "Untracked inventory",
        subtitle: "& stock variance",
    },
    {
        icon: "💰",
        title: "High food cost",
    },
    {
        icon: "🤝",
        title: "Vendor mismanagement",
    },
    {
        icon: "🧾",
        title: "Manual entries",
        subtitle: "& spreadsheets",
    },
    {
        icon: "📱",
        title: "No real-time visibility",
    },
];

export default function ProblemStatementSection({
                                                    imageSrc = "/drawables/problem_section.jpg",
                                                    imageAlt = "Restaurant kitchen scene",
                                                }: {
    imageSrc?: string;
    imageAlt?: string;
}) {
    return (
        <section
            aria-labelledby="problem-statement-heading"
            className="bg-black py-16 sm:py-20 lg:py-24"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:items-start">
                    {/* LEFT: Copy + cards */}
                    <div>
                        <h2
                            id="problem-statement-heading"
                            className="text-white font-semibold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl"
                        >
                            Running a restaurant is <br />
                            tough.
                            <span className="block text-[#E57224]">
                Managing your costs <br />
                shouldn&apos;t be.
              </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70">
                            Restaurants lose up to 18–22% of revenue due to wastage,
                            inconsistent pricing, inaccurate inventory, and delayed vendor
                            payments. Kostcart fixes that — fast, simple, and seamlessly.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {PAIN_POINTS.map((item, idx) => {
                                const isLast = idx === PAIN_POINTS.length - 1;

                                return (
                                    <div
                                        key={item.title}
                                        className={[
                                            "rounded-2xl p-6",
                                            "bg-[#171717]",
                                            "border border-white/10",
                                            "shadow-[0_0_0_1px_rgba(255,255,255,0.04)]",
                                            "transition hover:border-white/20 hover:bg-white/[0.06]",
                                            "min-h-[124px]",
                                            isLast ? "sm:col-span-2" : "",
                                        ].join(" ")}
                                    >
                                        <div className="text-xl leading-none">{item.icon}</div>

                                        <h3 className="mt-3 text-base font-semibold text-white">
                                            {item.title}
                                        </h3>

                                        {item.subtitle ? (
                                            <p className="mt-1 text-sm text-white/55">
                                                {item.subtitle}
                                            </p>
                                        ) : (
                                            <p className="mt-1 text-sm text-white/55">&nbsp;</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* RIGHT: Image */}
                    <div className="lg:pt-2">
                        <div className="rounded-2xl border border-white/10 bg-[#171717] shadow-[0_0_0_1px_rgba(255,255,255,0.04)] overflow-hidden">
                            <div className="relative h-[260px] sm:h-[340px] lg:h-[420px] w-full">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 1024px) 100vw, 42vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
