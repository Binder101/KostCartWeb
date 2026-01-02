// app/blog/page.tsx (or wherever you render the section)
import BlogSection, { BlogPost } from "@/app/layouts/BlogSection";

const POSTS: BlogPost[] = [
    {
        slug: "profit-first-costing-system-from-scratch",
        title: "Costing: How Restaurants Can Build a Profit-First Costing System From Scratch",
        excerpt:
            "Full tables don’t guarantee profits. Build a costing system that standardizes recipes, controls inventory, tracks vendors, and accounts for Swiggy/Zomato economics—so margins stay protected.",
        readTime: "9 min read",
        author : "Kumar Ashutosh",
        likes: 44,
    },
    {
        slug: "food-cost-percentage-doesnt-tell-whole-story",
        title: "Why Food Cost Percentage Doesn’t Tell the Whole Story: A Multi-Metric Approach to True Profitability",
        excerpt:
            "Food cost % is useful—but incomplete. Track contribution margin, menu mix, inventory variance, vendor trends, discounts, platform net margins, and prime cost to measure real profitability.",
        readTime: "8 min read",
        author : "Taaha Mirza",
        likes: 18,
    },
    {
        slug: "global-commodity-prices-impact-food-cost",
        title: "How Global Commodity Prices Impact Your Restaurant’s Food Cost—And What You Can Do About It",
        excerpt:
            "Commodity swings quietly change your purchase bills. Learn how to track ingredient-level trends, strengthen vendor control, engineer menus, optimize inventory, and protect margins proactively.",
        readTime: "7 min read",
        author: "Nihit Kumar",
        likes: 17,
    },
    {
        slug: "scalable-recipe-costing-framework",
        title: "Designing a Recipe Costing Framework That Scales: From Single Outlet to 50+ Outlet Chains",
        excerpt:
            "Scaling breaks informal costing. Use master recipes, unit-level ingredient costs, yield/wastage factors, centralized governance, inventory linkage, and automated reporting to stay consistent across outlets.",
        readTime: "10 min read",
        author : "Kumar Ashutosh",
        likes: 12,
    },
    {
        slug: "psychology-of-menu-pricing",
        title: "The Psychology of Menu Pricing: How Strategic Costing Affects Customer Perception and Purchase Behavior",
        excerpt:
            "Pricing is perception. Use anchor items, good-better-best, smart descriptions, visual hierarchy, and channel-specific pricing—backed by dish-level margins—without relying on discounts.",
        readTime: "8 min read",
        author: "Nihit Kumar",
        likes: 21,
    },
    {
        slug: "real-time-variance-control-predictive-analytics",
        title: "A Modern Approach to Controlling Food Cost Variance Using Real-Time Data and Predictive Analytics",
        excerpt:
            "Variance is the gap between theoretical and actual cost. Connect sales, recipes, inventory and purchases in real time, then use predictive alerts to catch over-portioning, pilferage, and wastage early.",
        readTime: "9 min read",
        author : "Kumar Ashutosh",
        likes: 15,
    },
    {
        slug: "vendor-management-complete-guide",
        title: "A Complete Guide to Vendor Management for Restaurants: Contracts, Rate Cards, Negotiation Techniques, and Audits",
        excerpt:
            "Procurement is a profit lever. Structure contracts, maintain rate cards, audit invoices, track performance, diversify suppliers, and link vendor prices to dish margins to prevent silent cost creep.",
        readTime: "11 min read",
        author: "Nihit Kumar",
        likes: 27,
    },
];

export default function BlogPage() {
    return <BlogSection posts={POSTS} />;
}
