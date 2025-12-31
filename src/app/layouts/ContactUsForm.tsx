"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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
    const router = useRouter();

    const [form, setForm] = useState<FormState>({
        name: "",
        restaurantName: "",
        city: "",
        phoneNumber: "",
        companyWebsite: "", // honeypot
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
            router.push("/contact/thank-you");
            return;
        }

        if (!isValid) {
            setError("Please fill all fields correctly.");
            return;
        }

        setSubmitting(true);
        try {
            const apiBase = process.env.NEXT_PUBLIC_API_URL;
            if (!apiBase) {
                throw new Error(
                    "Missing NEXT_PUBLIC_API_URL. Set it in .env.local."
                );
            }

            const res = await fetch(`${apiBase}/api/v1/contact`, {
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
            router.push("/contact/thank-you");
        } catch (err: any) {
            setError(err?.message ?? "Failed to submit. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="w-full max-w-xl">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Share your details and we’ll reach out soon.
                </p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                    {/* Honeypot (hidden) */}
                    <div className="hidden">
                        <label className="text-sm font-medium text-gray-700">
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
                        <label className="block text-sm font-medium text-gray-700">
                            Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.name}
                            onChange={(e) => onChange("name", e.target.value)}
                            placeholder="Your full name"
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-900"
                            required
                            minLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Restaurant Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.restaurantName}
                            onChange={(e) => onChange("restaurantName", e.target.value)}
                            placeholder="Restaurant / Business name"
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-900"
                            required
                            minLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            City <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="text"
                            value={form.city}
                            onChange={(e) => onChange("city", e.target.value)}
                            placeholder="City"
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-900"
                            required
                            minLength={2}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                            type="tel"
                            value={form.phoneNumber}
                            onChange={(e) =>
                                onChange("phoneNumber", normalizePhone(e.target.value))
                            }
                            placeholder="+91-95**23**67"
                            className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900 outline-none ring-0 focus:border-gray-900"
                            required
                            pattern="^[0-9+\-() ]{7,20}$"
                            minLength={7}
                            maxLength={20}
                        />
                        <p className="mt-1 text-xs text-gray-500">
                            Allowed: digits, spaces, +, -, parentheses.
                        </p>
                    </div>

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={submitting}
                        className="inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {submitting ? "Submitting..." : "Submit"}
                    </button>

                    <p className="text-center text-xs text-gray-500">
                        By submitting, your details will be emailed to our team.
                    </p>
                </form>
            </div>
        </div>
    );
}
