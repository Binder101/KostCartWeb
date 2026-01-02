"use client";

import { useState } from "react";

type BlogContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string }
    | { type: "list"; items: string[] };

type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    readTime: string;
    author: string;
    likes: number;
    content: BlogContentBlock[];
};

const BLOG_POSTS: BlogPost[] = [
    {
        slug: "profit-first-costing-system-from-scratch",
        title:
            "The Complete Science of Food Costing: How Restaurants Can Build a Profit-First Costing System From Scratch",
        excerpt:
            "Build a costing system that standardizes recipes, controls inventory, tracks vendors, and accounts for Swiggy/Zomato economics—so margins stay protected.",
        readTime: "11 min read",
        author: "Kumar Ashutosh",
        likes: 44,
        content: [
            {
                type: "paragraph",
                text: "Running a busy restaurant doesn’t always mean you’re making money. Many restaurant owners see full tables, strong online orders, and healthy revenue—yet struggle with low or inconsistent profits. The root cause is almost always the same: poor food costing and lack of cost visibility.",
            },
            {
                type: "paragraph",
                text: "Food costing isn’t just an accounting exercise. It’s a profit-control system. When done right, it helps restaurants control expenses, price menus correctly, reduce wastage, and protect margins—especially in a high-commission world of Swiggy and Zomato.",
            },
            {
                type: "paragraph",
                text: "This guide breaks down the science of food costing and shows how restaurants can build a profit-first costing system from scratch.",
            },
            { type: "heading", text: "What Is Food Costing in Restaurants?" },
            {
                type: "paragraph",
                text: "Food costing is the process of calculating the actual cost of preparing each dish, including raw materials, wastage, and portion size. It tells you how much it really costs to serve a plate of food—not what you think it costs.",
            },
            {
                type: "paragraph",
                text: "A healthy restaurant typically targets a food cost percentage between 28% and 35%, depending on the cuisine and business model. Anything above that directly eats into profit margins.",
            },
            {
                type: "paragraph",
                text: "Food Cost % Formula: Food Cost ÷ Food Sales × 100",
            },
            {
                type: "paragraph",
                text: "But this formula alone is not enough. Real-world food costing requires deeper control.",
            },
            { type: "heading", text: "Why Most Restaurants Struggle With Food Cost Control" },
            {
                type: "list",
                items: [
                    "No standard recipes or portion control",
                    "Manual inventory tracking or no inventory system",
                    "Vendor price fluctuations not tracked",
                    "Over-ordering and expiry wastage",
                    "Pilferage and uncontrolled consumption",
                    "Ignoring Swiggy/Zomato commissions while pricing",
                ],
            },
            {
                type: "paragraph",
                text: "Without a structured system, food costing becomes guesswork.",
            },
            { type: "heading", text: "Step 1: Standardize Recipes and Portions" },
            {
                type: "paragraph",
                text: "The foundation of food costing starts in the kitchen. Every dish must have a standard recipe, defined ingredient quantities, and a fixed portion size.",
            },
            {
                type: "paragraph",
                text: "For example, if a butter chicken recipe uses 220 grams of chicken today and 260 grams tomorrow, your food cost is already broken.",
            },
            {
                type: "list",
                items: [
                    "Consistent taste",
                    "Predictable costs",
                    "Accurate margin calculation",
                ],
            },
            {
                type: "paragraph",
                text: "Without this step, no software or report will save your margins.",
            },
            { type: "heading", text: "Step 2: Calculate Ingredient-Level Costs" },
            {
                type: "paragraph",
                text: "Next, calculate the per-unit cost of every ingredient, including vendor-specific pricing, GST, and delivery charges.",
            },
            {
                type: "paragraph",
                text: "Example: If tomatoes cost ₹30/kg and a dish uses 120 grams, the tomato cost per plate is ₹3.6.",
            },
            {
                type: "paragraph",
                text: "Repeat this for every ingredient. This gives you the true dish cost and forms the base of menu costing and pricing decisions.",
            },
            { type: "heading", text: "Step 3: Build Dish-Level Food Cost & Menu Pricing" },
            {
                type: "paragraph",
                text: "Once ingredient costs are mapped, calculate total dish cost, food cost percentage, and target selling price.",
            },
            {
                type: "paragraph",
                text: "If your target food cost is 30% and a dish costs ₹120 to make, the selling price should be around ₹400.",
            },
            {
                type: "list",
                items: [
                    "Identify low-margin dishes",
                    "Reprice or redesign menu items",
                    "Remove loss-making SKUs",
                ],
            },
            {
                type: "paragraph",
                text: "Many restaurants unknowingly sell high-volume but loss-making dishes.",
            },
            { type: "heading", text: "Step 4: Control Inventory Like a Profit Lever" },
            {
                type: "paragraph",
                text: "Inventory is where most food cost leakages happen. Over-ordering, no daily stock visibility, expired stock, and no linkage between sales and consumption can erode margins quickly.",
            },
            {
                type: "paragraph",
                text: "A strong inventory management system tracks opening stock, purchases, consumption based on sales, and closing stock to reveal excess usage, pilferage, and abnormal consumption trends.",
            },
            {
                type: "paragraph",
                text: "Inventory control directly impacts food cost and cash flow.",
            },
            { type: "heading", text: "Step 5: Track Vendor Performance & Purchase Prices" },
            {
                type: "paragraph",
                text: "Vendor pricing changes silently—but the impact is massive. Restaurants must track vendor-wise item prices, purchase history, and price fluctuations over time.",
            },
            {
                type: "paragraph",
                text: "With data, restaurants negotiate better. This alone can save 2–4% on food cost.",
            },
            { type: "heading", text: "Step 6: Factor in Swiggy & Zomato Commissions" },
            {
                type: "paragraph",
                text: "One of the biggest food costing mistakes is ignoring aggregator commissions. A dish profitable offline may be loss-making online due to 18–30% commissions, platform discounts, and packaging costs.",
            },
            {
                type: "list",
                items: [
                    "Calculate net margins after commissions",
                    "Adjust online prices",
                    "Create platform-specific menus",
                ],
            },
            { type: "heading", text: "Step 7: Use Data, Not Gut Feeling" },
            {
                type: "paragraph",
                text: "Modern food costing is impossible without data. A profit-first system provides daily food cost reports, dish-wise margin analysis, wastage and variance reports, and vendor cost comparisons.",
            },
            {
                type: "paragraph",
                text: "This turns costing from a monthly headache into a daily control system.",
            },
            {
                type: "heading",
                text: "Final Thoughts: Food Costing Is a System, Not a Task",
            },
            {
                type: "paragraph",
                text: "Food costing is not something you do once—it’s something you run daily. Restaurants that win on margins treat food costing as a discipline, a process, and a profit engine. In today’s competitive market, revenue is vanity, profit is sanity, and food costing is the science behind it.",
            },
        ],
    },
    {
        slug: "food-cost-percentage-doesnt-tell-whole-story",
        title:
            "Why Food Cost Percentage Doesn’t Tell the Whole Story: A Multi-Metric Approach to True Profitability",
        excerpt:
            "Food cost % is useful—but incomplete. Track contribution margin, menu mix, inventory variance, vendor trends, discounts, platform net margins, and prime cost for real profitability.",
        readTime: "10 min read",
        author: "Taaha Mirza",
        likes: 18,
        content: [
            {
                type: "paragraph",
                text: "For decades, food cost percentage has been treated as the ultimate benchmark of restaurant profitability. Yet many restaurants with a “healthy” food cost percentage still struggle to make money.",
            },
            {
                type: "paragraph",
                text: "Food cost percentage alone doesn’t reflect true profitability. In today’s environment involving online aggregators, discounts, fluctuating vendor prices, and rising operational costs, relying on a single metric can be misleading.",
            },
            {
                type: "paragraph",
                text: "To understand real profits, restaurants need a multi-metric profitability approach.",
            },
            { type: "heading", text: "What Is Food Cost Percentage—and Why It Falls Short" },
            {
                type: "paragraph",
                text: "Food cost percentage is calculated as Food Cost ÷ Food Revenue × 100. Traditionally, a range of 28–35% is considered healthy. But this formula assumes a controlled, predictable environment—something modern restaurants rarely operate in.",
            },
            {
                type: "list",
                items: [
                    "Ignores selling price strategy",
                    "Ignores discounts and promotions",
                    "Ignores Swiggy and Zomato commissions",
                    "Ignores portion variance and wastage patterns",
                ],
            },
            {
                type: "paragraph",
                text: "A low food cost percentage can still mean low profits if other costs are rising faster.",
            },
            { type: "heading", text: "The Illusion of “Good” Food Cost" },
            {
                type: "paragraph",
                text: "Dish A: Food cost ₹120, selling price ₹400 → Food cost = 30%. Dish B: Food cost ₹60, selling price ₹150 → Food cost = 40%. Food cost percentage ignores absolute margin contribution, which is what pays rent, salaries, and profits.",
            },
            { type: "heading", text: "Metric 1: Contribution Margin (The Real Profit Driver)" },
            {
                type: "paragraph",
                text: "Contribution margin shows how much money each dish contributes after food cost, not just the percentage. Contribution Margin = Selling Price – Food Cost.",
            },
            {
                type: "paragraph",
                text: "Restaurants should optimize menus around margin contribution, not just food cost percentage.",
            },
            { type: "heading", text: "Metric 2: Menu Engineering Mix" },
            {
                type: "list",
                items: [
                    "Stars (high margin, high volume)",
                    "Plowhorses (low margin, high volume)",
                    "Puzzles (high margin, low volume)",
                    "Dogs (low margin, low volume)",
                ],
            },
            {
                type: "paragraph",
                text: "True profitability comes from menu balance, not cost cutting alone.",
            },
            { type: "heading", text: "Metric 3: Inventory Variance & Consumption Control" },
            {
                type: "paragraph",
                text: "Inventory variance reveals over-portioning, pilferage, overproduction, and expiry. Tracking theoretical vs actual consumption is essential for real food cost control.",
            },
            { type: "heading", text: "Metric 4: Vendor Price Trends & Procurement Efficiency" },
            {
                type: "paragraph",
                text: "Tracking vendor-wise pricing, item-level purchase trends, and price variance over time helps restaurants identify cost creep early.",
            },
            { type: "heading", text: "Metric 5: Swiggy & Zomato Net Margins" },
            {
                type: "paragraph",
                text: "Online platforms add 18–30% commission, discounts, and packaging costs. Restaurants must track net realization per order, platform-wise contribution margin, and online vs offline profitability.",
            },
            { type: "heading", text: "Metric 6: Discount & Promotion Impact" },
            {
                type: "paragraph",
                text: "Discounts distort food cost percentage. Restaurants must evaluate discount ROI, margin after discount, and volume vs profitability trade-offs.",
            },
            { type: "heading", text: "Metric 7: Prime Cost (The Bigger Picture)" },
            {
                type: "paragraph",
                text: "Prime Cost = Food Cost + Labour Cost. High-performing restaurants track prime cost percentage as the core health metric because it reflects operational reality.",
            },
            { type: "heading", text: "Building a Multi-Metric Profitability System" },
            {
                type: "list",
                items: [
                    "Food cost percentage",
                    "Contribution margin",
                    "Inventory variance",
                    "Vendor pricing trends",
                    "Online net margins",
                    "Prime cost",
                ],
            },
            {
                type: "paragraph",
                text: "This layered approach provides clarity, control, and confidence. Technology now makes this possible without manual effort.",
            },
            { type: "heading", text: "Final Thoughts: Food Cost Is a Signal, Not the Answer" },
            {
                type: "paragraph",
                text: "Food cost percentage is not wrong—it’s just incomplete. True profitability comes from understanding how money flows through every dish, every order, and every channel.",
            },
        ],
    },
    {
        slug: "global-commodity-prices-impact-food-cost",
        title:
            "How Global Commodity Prices Impact Your Restaurant’s Food Cost—And What You Can Do About It",
        excerpt:
            "Global commodity swings quietly raise purchase costs. Track ingredient-level trends, strengthen vendors, re-engineer menus, and protect margins proactively.",
        readTime: "9 min read",
        author: "Nihit Kumar",
        likes: 17,
        content: [
            {
                type: "paragraph",
                text: "One of the biggest drivers of food cost sits far outside your restaurant: global commodity prices. When global prices fluctuate, food costs quietly rise or fall, often without immediate visibility.",
            },
            {
                type: "paragraph",
                text: "Understanding how global commodity prices affect your restaurant’s food cost—and knowing how to respond—is no longer optional. It’s a core part of profit-first restaurant management.",
            },
            { type: "heading", text: "What Are Global Commodity Prices?" },
            {
                type: "paragraph",
                text: "Global commodities are basic raw materials traded internationally. For restaurants, the most impactful commodities include wheat and flour, rice and pulses, edible oils, dairy, sugar, poultry, and meat.",
            },
            {
                type: "paragraph",
                text: "Even if you buy from a nearby vendor, the prices they quote are often tied to global supply and demand.",
            },
            { type: "heading", text: "Why Global Prices Fluctuate So Often" },
            {
                type: "list",
                items: [
                    "Weather conditions affecting crop yield",
                    "Geopolitical tensions and trade restrictions",
                    "Fuel and transportation costs",
                    "Currency exchange rate movements",
                    "Export-import policy changes",
                ],
            },
            { type: "heading", text: "How Commodity Prices Impact Restaurant Food Cost" },
            {
                type: "paragraph",
                text: "When global prices rise, vendors increase rates to protect their margins. Restaurants often absorb these increases silently, leading to higher ingredient costs, lower contribution margins, and reduced profitability.",
            },
            {
                type: "paragraph",
                text: "Vendor price inconsistency creates lack of price transparency, weak negotiation power, and inaccurate food costing.",
            },
            {
                type: "paragraph",
                text: "Global commodity inflation forces tough menu decisions: raise prices too fast and customers react; don’t raise prices and margins disappear.",
            },
            { type: "heading", text: "Why Traditional Food Cost Tracking Falls Short" },
            {
                type: "paragraph",
                text: "Most restaurants calculate food cost percentage monthly. Global price movements require real-time cost tracking, ingredient-level visibility, and purchase price trend analysis.",
            },
            { type: "heading", text: "What Restaurants Can Do to Protect Margins" },
            {
                type: "heading",
                text: "Track Ingredient-Level Cost Trends",
            },
            {
                type: "paragraph",
                text: "Identify which commodities are rising fastest, which ingredients impact multiple menu items, and where substitution is possible.",
            },
            { type: "heading", text: "Strengthen Vendor Management" },
            {
                type: "paragraph",
                text: "Track vendor-wise pricing history, compare rates across suppliers, and negotiate based on data to offset inflation.",
            },
            { type: "heading", text: "Build Menu Pricing Buffers" },
            {
                type: "paragraph",
                text: "Price dishes with a margin buffer, adjust portion sizes strategically, and redesign recipes without affecting taste to create flexibility during commodity spikes.",
            },
            { type: "heading", text: "Optimize Inventory Ordering" },
            {
                type: "paragraph",
                text: "Order based on consumption patterns, reduce dead stock and expiry, and improve cash flow efficiency.",
            },
            { type: "heading", text: "Re-Engineer High-Risk Dishes" },
            {
                type: "paragraph",
                text: "Identify oil-heavy, dairy-intensive, or wheat-based fast movers and reprice them selectively or promote lower-risk alternatives.",
            },
            { type: "heading", text: "Monitor Online Platform Margins Separately" },
            {
                type: "paragraph",
                text: "Track platform-wise net margins, cost vs realization per dish, and discount impact to avoid hidden online losses.",
            },
            { type: "heading", text: "Use Data to Stay Ahead, Not Catch Up" },
            {
                type: "paragraph",
                text: "Restaurants that survive and scale will use real-time food cost analytics, track vendor pricing trends, adjust menus dynamically, and focus on contribution margin instead of just food cost %.",
            },
            { type: "heading", text: "Final Thoughts: You Can’t Control Markets, But You Can Control Margins" },
            {
                type: "paragraph",
                text: "Global commodity prices are unpredictable. Your profits don’t have to be. Restaurants that understand how global markets affect local costs gain a powerful advantage by responding faster, pricing smarter, and protecting margins without compromising quality.",
            },
        ],
    },
    {
        slug: "scalable-recipe-costing-framework",
        title:
            "Designing a Recipe Costing Framework That Scales: From Single Outlet to 50+ Outlet Chains",
        excerpt:
            "Scaling breaks informal costing. Use master recipes, unit-level ingredient costs, yield factors, centralized governance, and automated reporting to stay consistent across outlets.",
        readTime: "12 min read",
        author: "Kumar Ashutosh",
        likes: 12,
        content: [
            {
                type: "paragraph",
                text: "Recipe costing may work informally for a single outlet, but the moment a business starts expanding, that system breaks down. Scaling restaurants don’t fail because of food quality or demand—they fail because costing systems don’t scale.",
            },
            {
                type: "paragraph",
                text: "This article explains how to design a scalable recipe costing framework that works from your first outlet to enterprise-level chains—without complexity or guesswork.",
            },
            { type: "heading", text: "What Is Recipe Costing—and Why It Becomes Critical at Scale" },
            {
                type: "paragraph",
                text: "Recipe costing is the process of calculating the exact cost of preparing a dish, based on ingredient quantities, vendor prices, and standard portions. At scale, recipe costing becomes the foundation of menu pricing, the link between inventory and sales, and the control system for margins.",
            },
            { type: "heading", text: "Why Single-Outlet Costing Methods Fail When You Scale" },
            {
                type: "list",
                items: [
                    "Different dish costs at different outlets",
                    "Inconsistent margins",
                    "Impossible benchmarking",
                    "No control over food cost inflation",
                ],
            },
            {
                type: "paragraph",
                text: "Scaling requires standardisation before optimisation.",
            },
            { type: "heading", text: "Step 1: Create Master Recipes, Not Outlet Recipes" },
            {
                type: "list",
                items: [
                    "Ingredient list",
                    "Exact quantities (weight or volume)",
                    "Standard yield and portion size",
                    "Cooking loss or wastage factor",
                ],
            },
            {
                type: "paragraph",
                text: "Master recipes ensure that every outlet cooks the same dish, at the same cost, every time.",
            },
            { type: "heading", text: "Step 2: Cost Ingredients at Unit Level" },
            {
                type: "paragraph",
                text: "Ingredient costing must be standardized at the base unit level (per gram, ml, or piece), including GST, transportation, and handling.",
            },
            {
                type: "paragraph",
                text: "Unit-level costing allows automatic recalculation when vendor prices change or regional price differences exist.",
            },
            { type: "heading", text: "Step 3: Introduce Yield & Wastage Factors" },
            {
                type: "paragraph",
                text: "Include cleaning loss, cooking shrinkage, and oil absorption by tracking gross quantity, net usable quantity, and yield percentage.",
            },
            { type: "heading", text: "Step 4: Centralize Costing, Decentralize Execution" },
            {
                type: "paragraph",
                text: "Cost centrally, execute locally. A central team should control recipe definitions, ingredient costing logic, and menu pricing rules, while outlets follow standard recipes and enter purchases and stock data.",
            },
            { type: "heading", text: "Step 5: Link Recipes to Inventory Consumption" },
            {
                type: "paragraph",
                text: "When a dish sells, ingredients should automatically be deducted from inventory based on the recipe. This enables theoretical consumption calculation, actual vs expected usage tracking, and detection of pilferage.",
            },
            { type: "heading", text: "Step 6: Plan for Vendor & Regional Price Variations" },
            {
                type: "paragraph",
                text: "Allow outlet-level vendor pricing while maintaining recipe-level cost logic to show margin impact per location.",
            },
            { type: "heading", text: "Step 7: Build Menu Pricing on Contribution, Not Percentage" },
            {
                type: "paragraph",
                text: "Focus on contribution margin per dish, margin consistency across outlets, and high-volume, high-margin items. Menu engineering becomes data-driven, not emotional.",
            },
            { type: "heading", text: "Step 8: Factor in Online Aggregator Economics" },
            {
                type: "paragraph",
                text: "Add packaging costs, account for commission impact, and track platform-specific margins so online growth doesn’t scale losses.",
            },
            { type: "heading", text: "Step 9: Automate Reporting as You Scale" },
            {
                type: "paragraph",
                text: "Automation produces outlet-wise food cost reports, dish-wise margin comparisons, and variance alerts so leadership sees problems before they become patterns.",
            },
            { type: "heading", text: "Final Thoughts: Scale Needs Systems, Not Heroics" },
            {
                type: "paragraph",
                text: "A strong recipe costing framework creates consistency, protects margins, and enables confident expansion. Growth without costing control isn’t growth—it’s risk.",
            },
        ],
    },
    {
        slug: "psychology-of-menu-pricing",
        title:
            "The Psychology of Menu Pricing: How Strategic Costing Affects Customer Perception and Purchase Behavior",
        excerpt:
            "Pricing is perception. Use anchor items, good-better-best, smart descriptions, and visual hierarchy—backed by dish-level margins—without relying on discounts.",
        readTime: "11 min read",
        author: "Nihit Kumar",
        likes: 21,
        content: [
            {
                type: "paragraph",
                text: "Menu pricing is a powerful psychological tool that shapes how customers perceive value, make choices, and decide what to order. Strategic costing, behavioral psychology, and data-driven decision-making must align to protect margins.",
            },
            { type: "heading", text: "Why Menu Pricing Is a Psychological Game" },
            {
                type: "paragraph",
                text: "Customers evaluate prices emotionally and comparatively. A ₹350 dish feels expensive or affordable based on surrounding prices, portion cues, descriptions, and perceived quality.",
            },
            { type: "heading", text: "Anchor Pricing: Setting the Reference Point" },
            {
                type: "paragraph",
                text: "A high-priced item sets a reference point. A ₹799 premium platter makes a ₹499 main course feel like value. Anchor items should still carry healthy margins.",
            },
            { type: "heading", text: "The Power of “Good-Better-Best” Pricing" },
            {
                type: "paragraph",
                text: "Present a basic, a slightly premium, and a high-end option. Most customers choose the middle option, so cost it for maximum margin.",
            },
            { type: "heading", text: "Price Endings and Perceived Value" },
            {
                type: "paragraph",
                text: "₹299 feels significantly cheaper than ₹300. Round numbers feel premium; odd numbers feel value-driven. Pricing cues must align with profit targets.",
            },
            { type: "heading", text: "Menu Design and Visual Hierarchy Matter" },
            {
                type: "paragraph",
                text: "Customers focus on top-right areas, boxes, and highlighted items—place high-margin dishes and signature items there.",
            },
            { type: "heading", text: "Descriptions Sell More Than Discounts" },
            {
                type: "paragraph",
                text: "Words like “Handcrafted,” “Slow-cooked,” “Farm-fresh,” and “Chef’s special” increase perceived value and justify pricing.",
            },
            { type: "heading", text: "Portion Psychology: Size Signals Value" },
            {
                type: "paragraph",
                text: "A slightly larger plate or better presentation can justify higher prices and reduce sensitivity. Portion control must stay standardized to protect margins.",
            },
            { type: "heading", text: "How Discounts Affect Long-Term Perception" },
            {
                type: "paragraph",
                text: "Frequent discounts train customers to wait and reduce perceived value. Strategic costing identifies dishes that can absorb discounts and limits promotions to specific items or channels.",
            },
            { type: "heading", text: "Online Menus Need Separate Pricing Psychology" },
            {
                type: "paragraph",
                text: "Online diners compare prices more aggressively and are highly discount-sensitive. Recalculate net margins after commissions and use platform-specific pricing.",
            },
            { type: "heading", text: "Strategic Costing Is the Foundation of Pricing Psychology" },
            {
                type: "paragraph",
                text: "Psychology without costing is risky. Costing without psychology is limiting. Strategic costing provides clear dish-level margins and confidence to hold prices.",
            },
            { type: "heading", text: "Final Thoughts: Price Is What You Charge, Value Is What They Feel" },
            {
                type: "paragraph",
                text: "Customers don’t remember your food cost percentage. They remember how the price made them feel. The most successful restaurants design menus intentionally and price with psychological insight—backed by cost data.",
            },
        ],
    },
    {
        slug: "real-time-variance-control-predictive-analytics",
        title:
            "A Modern Approach to Controlling Food Cost Variance Using Real-Time Data and Predictive Analytics",
        excerpt:
            "Connect sales, recipes, inventory, and purchases in real time to catch over-portioning, pilferage, and wastage early with predictive alerts.",
        readTime: "12 min read",
        author: "Kumar Ashutosh",
        likes: 15,
        content: [
            {
                type: "paragraph",
                text: "Food cost variance is the gap between theoretical food cost and actual food cost. Left unchecked, it quietly eats into margins, especially as businesses scale or face rising input costs.",
            },
            { type: "heading", text: "What Is Food Cost Variance?" },
            {
                type: "list",
                items: [
                    "Over-portioning",
                    "Pilferage",
                    "Recipe deviations",
                    "Vendor price fluctuations",
                    "Inventory errors",
                    "Unplanned wastage",
                ],
            },
            { type: "heading", text: "Why Traditional Methods Fail" },
            {
                type: "paragraph",
                text: "Monthly food cost reports and manual inventory counts identify issues after the money is already gone. They miss daily consumption patterns and can’t pinpoint variance sources.",
            },
            { type: "heading", text: "The Shift to Real-Time Food Cost Tracking" },
            {
                type: "paragraph",
                text: "Real-time tracking connects sales data, recipe consumption, inventory movement, and purchase prices, allowing teams to ask “Why did food cost spike today?” instead of last month.",
            },
            { type: "heading", text: "Using Predictive Analytics to Prevent Variance" },
            {
                type: "paragraph",
                text: "Predictive analytics forecasts ingredient consumption, predicts stock shortages or overstock, identifies abnormal usage patterns, and alerts teams before variance escalates.",
            },
            { type: "heading", text: "Ingredient-Level Visibility Is Non-Negotiable" },
            {
                type: "paragraph",
                text: "Track ingredient-wise theoretical vs actual usage, cost movement over time, and high-risk items prone to wastage or theft.",
            },
            { type: "heading", text: "Automating Inventory & Consumption Mapping" },
            {
                type: "paragraph",
                text: "When a dish is sold, ingredients should be automatically deducted based on the recipe. Inventory updates in real time and variance is measured continuously.",
            },
            { type: "heading", text: "Vendor Price Volatility & Predictive Procurement" },
            {
                type: "paragraph",
                text: "Track vendor price trends, forecast cost increases, time purchases better, and identify alternative suppliers early.",
            },
            { type: "heading", text: "Controlling Variance Across Multiple Outlets" },
            {
                type: "paragraph",
                text: "Modern systems enable outlet-wise variance tracking, cross-location benchmarking, and early detection of underperforming outlets.",
            },
            { type: "heading", text: "Real-Time Alerts Drive Accountability" },
            {
                type: "paragraph",
                text: "Alerts notify teams when usage exceeds thresholds, wastage spikes, or cost deviates from norms—making variance control part of daily operations.",
            },
            { type: "heading", text: "Swiggy & Zomato Add a New Layer of Complexity" },
            {
                type: "paragraph",
                text: "Packaging costs, platform commissions, and discounts change net margins. Separate online vs offline food cost variance to avoid hidden losses.",
            },
            { type: "heading", text: "Final Thoughts: Control Before Cost Cutting" },
            {
                type: "paragraph",
                text: "Real-time data shows where money is leaking. Predictive analytics stops it from leaking again. When variance is controlled in real time, profitability stops being a surprise—and starts being a system.",
            },
        ],
    },
    {
        slug: "vendor-management-complete-guide",
        title:
            "A Complete Guide to Vendor Management for Restaurants: Contracts, Rate Cards, Negotiation Techniques, and Audits",
        excerpt:
            "Procurement is a profit lever. Structure contracts, maintain rate cards, audit invoices, track performance, diversify suppliers, and link vendor prices to dish margins.",
        readTime: "13 min read",
        author: "Nihit Kumar",
        likes: 27,
        content: [
            {
                type: "paragraph",
                text: "Vendor costs account for 50–60% of total expenses. Without a structured vendor management system, restaurants face rising food costs, inconsistent quality, and weak negotiation power.",
            },
            { type: "heading", text: "Why Vendor Management Is Critical for Restaurant Profitability" },
            {
                type: "list",
                items: [
                    "Inconsistent pricing",
                    "Quality fluctuations",
                    "Last-minute rate hikes",
                    "Over-dependence on a single supplier",
                    "No visibility on cost trends",
                ],
            },
            {
                type: "paragraph",
                text: "Vendor management is not a back-office function—it’s a profit lever.",
            },
            { type: "heading", text: "Step 1: Structuring Vendor Contracts the Right Way" },
            {
                type: "list",
                items: [
                    "Product specifications (grade, size, quality)",
                    "Agreed pricing or pricing logic",
                    "Payment terms and credit period",
                    "Delivery timelines and penalties",
                    "Replacement or rejection policy",
                    "Price revision frequency",
                ],
            },
            { type: "heading", text: "Step 2: Creating and Maintaining Rate Cards" },
            {
                type: "paragraph",
                text: "Rate cards list item-wise rates, units, effective dates, and vendor-specific pricing. They become benchmarks for audits and negotiation.",
            },
            { type: "heading", text: "Step 3: Avoiding Single-Vendor Dependency" },
            {
                type: "paragraph",
                text: "Maintain at least 2–3 vendors for critical items, split volume strategically, and test alternate suppliers to improve pricing pressure and continuity.",
            },
            { type: "heading", text: "Step 4: Using Data to Negotiate Better Rates" },
            {
                type: "paragraph",
                text: "Track purchase volumes, price trends, order frequency, and rejection rates. Data turns negotiation into a measurable discussion.",
            },
            { type: "heading", text: "Step 5: Timing Your Negotiations Strategically" },
            {
                type: "paragraph",
                text: "Negotiate at contract renewal, before high-demand seasons, after volume increases, or when alternate vendors are available.",
            },
            { type: "heading", text: "Step 6: Quality Control Is Part of Vendor Management" },
            {
                type: "paragraph",
                text: "Random batch inspections, weight verification, freshness checks, and rejection documentation reduce wastage and prep-level losses.",
            },
            { type: "heading", text: "Step 7: Invoice Matching and Purchase Audits" },
            {
                type: "paragraph",
                text: "Match invoices with rate cards, purchase orders, and delivered quantities to catch higher billed rates, short deliveries, incorrect units, or hidden charges.",
            },
            { type: "heading", text: "Step 8: Tracking Vendor Performance Over Time" },
            {
                type: "paragraph",
                text: "Score vendors on pricing consistency, delivery reliability, quality adherence, and issue resolution speed to guide allocation and renewal decisions.",
            },
            { type: "heading", text: "Step 9: Integrating Vendor Management With Inventory & Costing" },
            {
                type: "paragraph",
                text: "Link vendor decisions to inventory management, recipe costing, and food cost analytics so you can see margin impact in real time.",
            },
            { type: "heading", text: "Step 10: Scaling Vendor Management for Multi-Outlet Chains" },
            {
                type: "paragraph",
                text: "Centralize procurement policies, allow local flexibility with rate controls, govern rate cards centrally, and track outlet compliance.",
            },
            { type: "heading", text: "Final Thoughts: Vendors Don’t Kill Margins—Lack of Control Does" },
            {
                type: "paragraph",
                text: "Restaurants that manage vendors professionally get better prices, receive better service, face fewer surprises, and protect margins consistently. Profit isn’t made only by selling more—it’s protected by buying better.",
            },
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

                <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {BLOG_POSTS.map((post) => (
                        <button
                            key={post.slug}
                            type="button"
                            onClick={() => setActivePost(post)}
                            className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-left text-white shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition hover:border-white/20 hover:bg-white/[0.08]"
                        >
                            <h3 className="text-lg font-semibold">{post.title}</h3>
                            <p className="mt-3 text-sm text-white/70">
                                {post.excerpt}
                            </p>
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/60">
                                <span>{post.readTime}</span>
                                <span aria-hidden="true">•</span>
                                <span>{post.author}</span>
                                <span aria-hidden="true">•</span>
                                <span>{post.likes} likes</span>
                            </div>
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
                        className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-950/95 p-6 text-white shadow-[0_0_30px_rgba(0,0,0,0.6)] backdrop-blur"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-2xl font-semibold">
                                    {activePost.title}
                                </h3>
                                <p className="mt-2 text-sm text-white/70">
                                    {activePost.excerpt}
                                </p>
                                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-white/60">
                                    <span>{activePost.readTime}</span>
                                    <span aria-hidden="true">•</span>
                                    <span>{activePost.author}</span>
                                    <span aria-hidden="true">•</span>
                                    <span>{activePost.likes} likes</span>
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActivePost(null)}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-white/80 transition hover:bg-white/10"
                                aria-label="Close blog dialog"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mt-6 max-h-[65vh] space-y-4 overflow-y-auto pr-2 text-sm text-white/80">
                            {activePost.content.map((block, index) => {
                                if (block.type === "heading") {
                                    return (
                                        <h4
                                            key={`${block.type}-${index}`}
                                            className="text-base font-semibold text-white"
                                        >
                                            {block.text}
                                        </h4>
                                    );
                                }

                                if (block.type === "list") {
                                    return (
                                        <ul
                                            key={`${block.type}-${index}`}
                                            className="list-disc space-y-2 pl-5"
                                        >
                                            {block.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                }

                                return <p key={`${block.type}-${index}`}>{block.text}</p>;
                            })}
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
