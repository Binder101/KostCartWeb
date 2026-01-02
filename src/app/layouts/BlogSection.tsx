"use client";

import { useState } from "react";

type BlogPost = {
    id: string;
    title: string;
    summary: string;
    content: string[];
};

const BLOG_POSTS: BlogPost[] = [
    {
        id: "inventory-control",
        title: "How restaurants cut costs with smarter inventory",
        summary:
            "Three practical ways to reduce waste and keep your margins healthy.",
        content: [
            "Inventory gaps are one of the most common sources of revenue leakage. Start by tracking high-variance items daily and set clear reorder thresholds.",
            "Standardize recipes and portion sizes across shifts. Even small variations add up quickly when you scale orders throughout the week.",
            "Use vendor comparisons to lock in better pricing and avoid last-minute purchases. A consistent vendor scorecard helps teams stick to the plan.",
        ],
    },
    {
        id: "vendor-playbook",
        title: "A vendor management playbook for busy kitchens",
        summary:
            "A simple process to keep procurement organized without slowing service.",
        content: [
            "Document your preferred vendors and the categories they serve. When everyone knows who to call, ordering stays consistent.",
            "Set weekly check-ins to compare pricing, availability, and delivery reliability. Small adjustments prevent larger disruptions.",
            "Store invoices in one place and track payment timelines. It keeps relationships healthy and gives you leverage in negotiations.",
        ],
    },
    {
        id: "real-time-visibility",
        title: "Why real-time visibility matters for profitability",
        summary:
            "Spot issues early and respond before they affect the bottom line.",
        content: [
            "Daily visibility into stock and costs gives owners the ability to act quickly. Trends that look small can become serious over a month.",
            "Automated alerts prevent surprises by highlighting anomalies or low-stock items before service starts.",
            "Share concise dashboards with managers so every shift has the same numbers, which builds accountability and consistency.",
        ],
    },
];

export default function BlogSection() {
    const [activePost, setActivePost] = useState<BlogPost | null>(null);

    return (
        <section
            id="blog"
            className="bg-black py-16 sm:py-20 lg:py-24 scroll-mt-28"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 text-center">
                    <p className="text-xs font-medium tracking-[0.28em] text-white/60">
                        BLOG
                    </p>
                    <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                        Insights to help you run smarter
                    </h2>
                    <p className="text-base text-white/70">
                        Read quick guides from the KostCart team on reducing waste,
                        managing vendors, and improving profitability.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <button
                            key={post.id}
                            type="button"
                            onClick={() => setActivePost(post)}
                            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-white/20 hover:bg-white/[0.08]"
                        >
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="mt-3 text-sm text-white/70">
                                {post.summary}
                            </p>
                            <span className="mt-6 text-sm font-medium text-sky-200">
                                Read more →
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {activePost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-8"
                    onClick={() => setActivePost(null)}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-950/95 p-6 text-white shadow-[0_0_30px_rgba(0,0,0,0.6)] backdrop-blur"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold">
                                    {activePost.title}
                                </h3>
                                <p className="mt-2 text-sm text-white/70">
                                    {activePost.summary}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActivePost(null)}
                                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80 transition hover:bg-white/10"
                                aria-label="Close blog dialog"
                            >
                                Close
                            </button>
                        </div>

                        <div className="mt-6 max-h-[60vh] space-y-4 overflow-y-auto pr-2 text-sm text-white/80">
                            {activePost.content.map((paragraph) => (
                                <p key={paragraph}>{paragraph}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
