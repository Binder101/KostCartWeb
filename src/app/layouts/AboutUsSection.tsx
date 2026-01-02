import Image from "next/image";

const founders = [
    {
        name: "Tahaa Mirza",
        role: "Co-Founder & Product",
        description: "Obsessed with removing friction in restaurant operations through thoughtful product design.",
        image: "/team/founder-tahaa-mirza.png",
    },
    {
        name: "Nihit Kumar",
        role: "Co-Founder & Engineering",
        description: "Builds resilient platforms that make inventory and costing visible in real time.",
        image: "/team/founder-nihit.png",
    },
    {
        name: "Kumar Ashutosh",
        role: "Co-Founder & Marketing",
        description: "Former multi-brand operator focused on aligning kitchen workflows with profitability.",
        image: "/team/founder-kumar-ashutosh.png",
    },
    {
        name: "Sarthak Kalra",
        role: "Co-Founder & Growth",
        description: "Bridges restaurant partners with data-led decisions that unlock dependable margins.",
        image: "/team/founder-sarthak-kalra.png",
    },
] as const;

export default function AboutUsSection() {
    return (
        <section
            id="about-us"
            className="relative overflow-hidden bg-[#05070d] py-20 text-white sm:py-24"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(244,114,182,0.16),transparent_58%)]" />
                <div className="absolute inset-0 opacity-25 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:84px_84px]" />
            </div>

            <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
                <div className="text-center">
                    <p className="text-xs font-medium tracking-[0.3em] text-white/60">ABOUT US</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Meet the Founders
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70">
                        Four operators and builders focused on bringing clarity, consistency, and profitability to
                        restaurant teams.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {founders.map((founder) => (
                        <figure
                            key={founder.name}
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_60px_rgba(15,23,42,0.35)]"
                        >
                            <div className="relative aspect-4/5">
                                <Image
                                    src={founder.image}
                                    alt={`${founder.name} portrait`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <figcaption className="space-y-2 px-5 pb-6 pt-4">
                                <div>
                                    <p className="text-base font-semibold text-white">{founder.name}</p>
                                    <p className="text-sm text-white/70">{founder.role}</p>
                                </div>
                                <p className="text-sm leading-relaxed text-white/70">{founder.description}</p>
                            </figcaption>
                        </figure>
                    ))}
                </div>

                <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10">
                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                About KostCart
                            </p>
                            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                                Restaurants don’t fail because they lack demand.
                                <span className="block text-white/70">
          They fail because revenue leaks quietly every single day.
        </span>
                            </h3>
                        </div>

                        <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                The problem we solve
                            </p>
                            <p className="mt-1 text-lg font-semibold text-white">
                                Stop revenue leakage at the source
                            </p>
                        </div>
                    </div>

                    {/* Key message strip */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-black/20 p-6">
                        <div className="grid gap-5 sm:grid-cols-3">
                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                    Mission
                                </p>
                                <p className="mt-2 text-base font-semibold text-white">
                                    Reduce wastage & improve margins
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    We built KostCart to optimize inventory and costing so operators can consistently
                                    protect profitability.
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                    Insight
                                </p>
                                <p className="mt-2 text-base font-semibold text-white">
                                    Busy kitchens, low clarity
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    We kept seeing the same pattern: strong sales, but no visibility into where money
                                    was actually going.
                                </p>
                            </div>

                            <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                    Focus
                                </p>
                                <p className="mt-2 text-base font-semibold text-white">
                                    Eliminate leakage daily
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    Not after-the-fact reports — we help you control cost drivers as operations happen.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Structured content */}
                    <div className="mt-8 grid gap-6 lg:grid-cols-2">
                        {/* Left: What we do */}
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                What we do
                            </p>
                            <h4 className="mt-2 text-lg font-semibold text-white">
                                Costing + inventory, built like an operator’s system
                            </h4>

                            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-white/70">
                                <li className="flex items-start gap-3">
    <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center">
      ✅
    </span>
                                    <span>
      Bring structure and transparency to restaurant costing and inventory—traditionally
      managed via fragmented tools, manual tracking, and spreadsheets.
    </span>
                                </li>

                                <li className="flex items-start gap-3">
    <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center">
      ✅
    </span>
                                    <span>
      Identify hidden losses, reduce wastage, and improve day-to-day decisions that
      directly impact margins.
    </span>
                                </li>

                                <li className="flex items-start gap-3">
    <span className="mt-[2px] inline-flex h-6 w-6 shrink-0 items-center justify-center">
      ✅
    </span>
                                    <span>Designed for operational workflows — not just dashboards.</span>
                                </li>
                            </ul>

                        </div>

                        {/* Right: Who it’s for + how we build */}
                        <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                Who it’s for
                            </p>
                            {/*<h4 className="mt-2 text-lg font-semibold text-white">*/}
                            {/*    Multi-brand operators, QSRs, and cloud kitchens*/}
                            {/*</h4>*/}

                            <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                {[
                                    "Multi-brand operators",
                                    "QSR chains",
                                    "Cloud kitchens",
                                    "Growing food businesses",
                                ].map((tag) => (
                                    <div
                                        key={tag}
                                        className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                                    >
                                        {tag}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 border-t border-white/10 pt-6">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
                                    How we build
                                </p>
                                <p className="mt-2 text-sm leading-relaxed text-white/70">
                                    We’re currently pre-revenue and working closely with early customers, refining the
                                    product using real operational feedback from live kitchens. This founder-led,
                                    problem-first approach ensures we build what restaurants actually need—not what
                                    looks good on paper.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Vision (kept, but more premium) */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-linear-to-b from-black/10 to-black/40 p-6 sm:p-7">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-white/60">
                            Our long-term vision is bold and clear
                        </p>
                        <p className="mt-3 text-lg font-semibold text-white sm:text-xl">
                            To become the Tally of restaurants—the default system of record for costs, inventory,
                            and profitability in the food business.
                        </p>
                        <p className="mt-3 text-base text-white/70">
                            Because in the next era of food-tech, profit clarity will matter more than order volume.
                        </p>

                        <div className="mt-6 flex flex-wrap justify-between gap-3">
                            {["Profit clarity", "Inventory control", "Cost accuracy", "Wastage reduction"].map((pill) => (
                                <span
                                    key={pill}
                                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/70"
                                >
          {pill}
        </span>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}