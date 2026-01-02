import ContactUsForm from "@/app/layouts/ContactUsForm";

type ContactSectionProps = {
    id?: string;
};

export default function ContactSection({ id = "contact" }: ContactSectionProps) {
    return (
        <section id={id} className="bg-black py-16 sm:py-20 lg:py-24 scroll-mt-28">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
                    <div>
                        <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                            Get in touch
                        </h2>
                        <p className="mt-4 text-base text-slate-300">
                            Tell us about your restaurant and we’ll contact you on the phone.
                        </p>

                        <div className="mt-8 space-y-4">
                            {/* What happens next */}
                            <div className="rounded-2xl border border-white/10 bg-[#171717] p-6 text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                                <h3 className="font-semibold text-white">What happens next?</h3>
                                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                                    <li>We receive your details in our mailbox.</li>
                                    <li>Our team reviews and calls you back.</li>
                                    <li>No spam—just a direct follow-up.</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-[#171717] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                                    Prefer calling?
                                </p>

                                <h3 className="mt-2 text-base font-semibold text-white">
                                    Call our team directly
                                </h3>

                                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-slate-300">Phone</p>
                                        <a
                                            href="tel:+917448199700"
                                            className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-white hover:text-white/90"
                                        >
                                            +91 74481 99700
                                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-white/70">
                    Tap to call
                  </span>
                                        </a>
                                    </div>

                                    <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
                                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                                            Availability
                                        </p>
                                        <p className="mt-1 text-sm text-slate-300">Mon–Sat, 10am–7pm</p>
                                    </div>
                                </div>

                                <p className="mt-4 text-sm text-slate-300">
                                    For urgent queries, calling is the fastest way to reach us.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="lg:justify-self-end">
                        <ContactUsForm />
                    </div>
                </div>
            </div>
        </section>

    );
}
