import Link from "next/link";
import { Eye, MessageCircle, Heart, MoreVertical } from "lucide-react";

export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    author?: string;
    date?: string;      // e.g. "Mar 21, 2023"
    readTime?: string;  // e.g. "6 min read"
    views?: number;
    comments?: number;
    likes?: number;
};

type BlogSectionProps = {
    id?: string;
    className?: string;
    heading?: string;
    subheading?: string;
    posts: BlogPost[];
};

function BlogCard({ post }: { post: BlogPost }) {
    return (
        <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07]">
            {/* subtle hover glow */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)]"
            />

            <div className="relative flex h-full flex-col p-6">
                {/* Top meta row */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                        {/* avatar placeholder */}
                        <div className="h-10 w-10 rounded-full border border-white/10 bg-white/5" />
                        <div className="leading-tight">
                            <p className="text-sm font-medium text-white/80">
                                {post.author ?? "Admin"}
                            </p>
                            <p className="text-xs text-white/55">
                                {(post.date ?? "Mar 21, 2023") + "  •  " + (post.readTime ?? "6 min read")}
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        className="rounded-lg p-2 text-white/55 transition hover:bg-white/5 hover:text-white/80"
                        aria-label="More options"
                    >
                        <MoreVertical className="h-5 w-5" />
                    </button>
                </div>

                {/* Title + excerpt */}
                <div className="mt-5">
                    <Link href={`/blog/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold tracking-tight text-white transition group-hover:text-sky-200 sm:text-2xl">
                            {post.title}
                        </h3>
                    </Link>

                    <p className="mt-3 text-sm leading-relaxed text-white/70 line-clamp-3">
                        {post.excerpt}
                    </p>
                </div>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />

                {/* Footer stats */}
                <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-1.5">
              <Eye className="h-4 w-4 text-white/45" />
                {post.views ?? 0} views
            </span>
                        <span className="inline-flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-white/45" />
                            {post.comments ?? 0} comments
            </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <span className="text-white/60">{post.likes ?? 0}</span>
                        <button
                            type="button"
                            className="rounded-lg p-2 text-rose-300/80 transition hover:bg-white/5 hover:text-rose-300"
                            aria-label="Like"
                        >
                            <Heart className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function BlogSection({
                                        id = "blog",
                                        className = "",
                                        heading = "Insights for Profit-First Restaurants",
                                        subheading = "Practical playbooks on costing, inventory, vendor control, and pricing strategy.",
                                        posts,
                                    }: BlogSectionProps) {
    return (
        <section id={id} className={`relative overflow-hidden bg-black py-20 sm:py-24 ${className}`}>
            {/* background glow to match landing page */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.28),transparent_58%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.22),transparent_55%)]" />
                <div className="absolute inset-0 opacity-25 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px]" />
            </div>

            <div className="mx-auto w-full max-w-6xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-medium tracking-[0.28em] text-white/60">BLOG</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                        {heading}
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-white/70">{subheading}</p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} />
                    ))}
                </div>
            </div>
        </section>
    );
}
