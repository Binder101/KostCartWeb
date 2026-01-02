"use client";

import { useMemo, useState } from "react";

type FormState = {
    name: string;
    restaurantName: string;
    city: string;
    phoneNumber: string;

    // Optional anti-spam honeypot (hidden field)
    companyWebsite: string;
};

type ApiResponse =
    | { ok: true; message: string }
    | { ok: false; message: string };

function normalizePhone(input: string) {
    // Keep digits and common phone symbols
    return input.replace(/[^\d+\-() ]/g, "");
}

export default function ContactUsForm() {
    const [form, setForm] = useState<FormState>({
        name: "",
        restaurantName: "",
        city: "",
        phoneNumber: "",
        companyWebsite: "", // honeypot
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const isValid = useMemo(() => {
        const nameOk = form.name.trim().length >= 2;
        const restOk = form.restaurantName.trim().length >= 2;
        const cityOk = form.city.trim().length >= 2;

        // Basic phone sanity check (server will also validate)
        const phone = form.phoneNumber.trim();
        const phoneOk = /^[0-9+\-() ]{7,20}$/.test(phone);

        return nameOk && restOk && cityOk && phoneOk;
    }, [form]);

    function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        // Honeypot check
        if (form.companyWebsite.trim().length > 0) {
            // Silently succeed to frustrate bots
            setSubmitted(true);
            return;
        }

        if (!isValid) {
            setError("Please fill all fields correctly.");
            return;
        }

        setSubmitting(true);
        setSubmitted(false);
        try {
            const apiBase =
                process.env.NEXT_PUBLIC_BASE_API ||
                process.env.NEXT_PUBLIC_API_URL;
            if (!apiBase) {
                throw new Error(
                    "Missing NEXT_PUBLIC_BASE_API. Set it in .env.local."
                );
            }

            const normalizedBase = apiBase.replace(/\/+$/, "");
            const res = await fetch(`${normalizedBase}/api/v1/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    restaurant_name: form.restaurantName.trim(),
                    city: form.city.trim(),
                    phone_number: form.phoneNumber.trim(),
                }),
            });

            const data = (await res.json().catch(() => null)) as ApiResponse | null;

            if (!res.ok) {
                const msg =
                    data?.message ||
                    `Something went wrong. Server returned ${res.status}.`;
                throw new Error(msg);
            }

            // Success
            setSubmitted(true);
            setForm({
                name: "",
                restaurantName: "",
                city: "",
                phoneNumber: "",
                companyWebsite: "",
            });
        } catch (err: any) {
            setError(err?.message ?? "Failed to submit. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-xl">
            <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-6 text-slate-100 shadow-[0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur">
                <h2 className="text-xl font-semibold text-white">Contact Us</h2>
                <p className="mt-1 text-sm text-slate-300">
                    Share your details and we’ll reach out soon.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {/* Honeypot (hidden) */}
                    <div className="hidden">
                        <label className="text-sm font-medium text-slate-300">
                            Company Website
                        </label>
                        <input
                            type="text"
                            value={form.companyWebsite}
                            onChange={(e) => onChange("companyWebsite", e.target.value)}
                            autoComplete="off"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200">
                            Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            placeholder="Your full name"
                            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-blue-400"
                            required
                            minLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200">
                            Restaurant Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.restaurantName}
                            onChange={(e) => onChange("restaurantName", e.target.value)}
                            placeholder="Restaurant / Business name"
                            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-blue-400"
                            required
                            minLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200">
                            City <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => onChange("city", e.target.value)}
                            placeholder="City"
                            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-blue-400"
                            required
                            minLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200">
                            Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="tel"
                            value={form.phoneNumber}
                            onChange={(e) =>
                                onChange("phoneNumber", normalizePhone(e.target.value))
                            }
                            placeholder="95**23**67"
                            className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-0 placeholder:text-slate-500 focus:border-blue-400"
                            required
                            pattern="^[0-9+\-() ]{7,20}$"
                            minLength={10}
                            maxLength={10}
                        />
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                            {error}
                        </div>
                    )}

                    {submitted && !error && (
                        <div className="rounded-xl border border-emerald-400/40 bg-emerald-400/10 p-3 text-sm text-emerald-100">
                            Thanks! We’ve received your details and will reach out soon.
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-[#2563ff] px-4 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_rgba(37,99,255,0.35)] transition hover:bg-[#1d4fe0] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>

                    <p className="text-center text-xs text-slate-400">
                        By submitting, your details will be emailed to our team.
                    </p>
                </form>
            </div>
        </div>
    );
}
