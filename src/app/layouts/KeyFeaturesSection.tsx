import { IndianRupee, Boxes, Handshake } from "lucide-react";

type KeyFeaturesSectionProps = {
    id?: string;
    className?: string;
};

const features = [
    {
        title: "Cost Management",
        description:
            "Track every rupee — from raw materials to daily expenses — and get real-time cost insights.",
        Icon: IndianRupee,
    },
    {
        title: "Inventory Automation",
        description:
            "Live stock levels, auto deductions, low-stock alerts, and expiry tracking to reduce wastage.",
        Icon: Boxes,
    },
    {
        title: "Vendor Management",
        description:
            "Manage all vendors, compare prices, create POs, and monitor payment cycles in one place.",
        Icon: Handshake,
    },
] as const;

export default function KeyFeaturesSection({
                                               id = "features",
                                               className = "",
                                           }: KeyFeaturesSectionProps) {
    return (
        <section
            id={id}
            className={`relative overflow-hidden bg-black py-20 sm:py-24 scroll-mt-28 ${className}`}
        >
            {/* Background glow to match hero */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),transparent_58%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_55%)]" />
                <div className="absolute inset-0 opacity-25 mask-[radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-medium tracking-[0.28em] text-white/60">
                        KEY FEATURES
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        Key Features Overview
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-white/70">
                        Everything you need to control costs, reduce wastage, and keep your business running
                        smoothly.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {features.map(({ title, description, Icon }) => (
                        <div
                            key={title}
                            className="group rounded-2xl border border-white/10 bg-white/5 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]"
                        >
                            {/* Center everything within the card */}
                            <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                                    <Icon className="h-6 w-6 text-sky-200" aria-hidden />
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                                        {description}
                                    </p>
                                </div>

                                <div className="mt-2 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
