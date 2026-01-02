"use client";

import { useMemo, useState } from "react";

type FormState = {
    name: string;
    restaurantName: string;
    state: string;
    city: string;
    phoneNumber: string;
    marketingConsent: boolean;

    // Optional anti-spam honeypot (hidden field)
    companyWebsite: string;
};

type ApiResponse =
    | { ok: true; message: string }
    | { ok: false; message: string };

const INDIA_STATE_CITIES: Record<string, string[]> = {
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Andhra Pradesh": [
        "Anantapur",
        "Guntur",
        "Kadapa",
        "Kakinada",
        "Kurnool",
        "Nellore",
        "Rajahmundry",
        "Tirupati",
        "Vijayawada",
        "Visakhapatnam",
    ],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
    Assam: ["Dibrugarh", "Guwahati", "Jorhat", "Silchar", "Tezpur"],
    Bihar: ["Bhagalpur", "Darbhanga", "Gaya", "Muzaffarpur", "Patna"],
    Chandigarh: ["Chandigarh"],
    Chhattisgarh: ["Bhilai", "Bilaspur", "Durg", "Korba", "Raipur"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
    Delhi: ["Delhi", "New Delhi"],
    Goa: ["Margao", "Panaji", "Vasco da Gama"],
    Gujarat: ["Ahmedabad", "Bhavnagar", "Jamnagar", "Rajkot", "Surat", "Vadodara"],
    Haryana: ["Faridabad", "Gurugram", "Hisar", "Panipat", "Rohtak"],
    "Himachal Pradesh": ["Dharamshala", "Mandi", "Shimla", "Solan"],
    "Jammu and Kashmir": ["Anantnag", "Jammu", "Srinagar"],
    Jharkhand: ["Bokaro", "Dhanbad", "Jamshedpur", "Ranchi"],
    Karnataka: ["Bengaluru", "Belagavi", "Hubballi", "Mangaluru", "Mysuru"],
    Kerala: ["Kochi", "Kollam", "Kozhikode", "Thiruvananthapuram", "Thrissur"],
    Ladakh: ["Kargil", "Leh"],
    Lakshadweep: ["Kavaratti"],
    "Madhya Pradesh": ["Bhopal", "Gwalior", "Indore", "Jabalpur", "Ujjain"],
    Maharashtra: ["Aurangabad", "Mumbai", "Nagpur", "Nashik", "Pune", "Thane"],
    Manipur: ["Imphal"],
    Meghalaya: ["Shillong", "Tura"],
    Mizoram: ["Aizawl", "Lunglei"],
    Nagaland: ["Dimapur", "Kohima", "Mokokchung"],
    Odisha: ["Bhubaneswar", "Cuttack", "Puri", "Rourkela", "Sambalpur"],
    Puducherry: ["Karaikal", "Puducherry"],
    Punjab: ["Amritsar", "Jalandhar", "Ludhiana", "Patiala"],
    Rajasthan: ["Ajmer", "Bikaner", "Jaipur", "Jodhpur", "Kota", "Udaipur"],
    Sikkim: ["Gangtok", "Namchi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    Telangana: ["Hyderabad", "Karimnagar", "Khammam", "Nizamabad", "Warangal"],
    Tripura: ["Agartala", "Udaipur"],
    "Uttar Pradesh": [
        "Agra",
        "Aligarh",
        "Ghaziabad",
        "Kanpur",
        "Lucknow",
        "Meerut",
        "Noida",
        "Varanasi",
    ],
    Uttarakhand: ["Dehradun", "Haridwar", "Haldwani", "Rishikesh"],
    "West Bengal": ["Asansol", "Durgapur", "Howrah", "Kolkata", "Siliguri"],
};

function normalizePhone(input: string) {
    // Keep digits and common phone symbols
    return input.replace(/[^\d+\-() ]/g, "");
}

export default function ContactUsForm() {
    const [form, setForm] = useState<FormState>({
        name: "",
        restaurantName: "",
        state: "",
        city: "",
        phoneNumber: "",
        marketingConsent: false,
        companyWebsite: "", // honeypot
    });

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);

    const isValid = useMemo(() => {
        const nameOk = form.name.trim().length >= 2;
        const restOk = form.restaurantName.trim().length >= 2;
        const stateOk = form.state.trim().length >= 2;
        const cityOk = form.city.trim().length >= 2;

        // Basic phone sanity check (server will also validate)
        const phone = form.phoneNumber.trim();
        const phoneOk = /^[0-9+\-() ]{10}$/.test(phone);

        return nameOk && restOk && stateOk && cityOk && phoneOk;
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
            const location = `${form.city.trim()}, ${form.state.trim()}`;
            const res = await fetch(`${normalizedBase}/api/v1/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name.trim(),
                    restaurant_name: form.restaurantName.trim(),
                    city: location,
                    phone_number: form.phoneNumber.trim(),
                    marketing_consent: form.marketingConsent,
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
                state: "",
                city: "",
                phoneNumber: "",
                marketingConsent: false,
                companyWebsite: "",
            });
        }catch (err: unknown) {
        const message =
            err instanceof Error ? err.message : "Failed to submit. Please try again.";
        setError(message);
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
                            State <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={form.state}
                            onChange={(e) => {
                                onChange("state", e.target.value);
                                onChange("city", "");
                            }}
                            className="mt-1 w-full min-h-11 appearance-none rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-blue-400"
                            required
                        >
                            <option value="" disabled className="font-semibold text-white">
                                Select state
                            </option>
                            {Object.keys(INDIA_STATE_CITIES).map((state) => (
                                <option key={state} value={state}>
                                    {state}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-200">
                            City <span className="text-red-600">*</span>
                        </label>
                        <select
                            value={form.city}
                            onChange={(e) => onChange("city", e.target.value)}
                            className="mt-1 w-full min-h-11 appearance-none rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-slate-100 outline-none ring-0 focus:border-blue-400"
                            required
                            disabled={!form.state}
                        >
                            <option value="" disabled className="font-semibold text-white">
                                {form.state ? "Select city" : "Select a state first"}
                            </option>
                            {(INDIA_STATE_CITIES[form.state] || []).map((city) => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </select>
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

                    <div className="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-slate-200">
                        <label className="flex cursor-pointer items-start gap-2">
                            <input
                                type="checkbox"
                                checked={form.marketingConsent}
                                onChange={(e) =>
                                    onChange("marketingConsent", e.target.checked)
                                }
                                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-slate-900 text-blue-500 focus:ring-2 focus:ring-blue-400"
                            />
                            <span>
                                I agree to receive promotional offers and news from KostCart.
                                <span className="text-red-600"> *</span>
                            </span>
                        </label>
                    </div>

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
