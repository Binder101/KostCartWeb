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
                            Tell us about your restaurant and we’ll contact you on the
                            phone.
                        </p>

                        <div className="mt-8 rounded-2xl border border-white/10 bg-[#171717] p-6 text-slate-200 shadow-[0_0_0_1px_rgba(255,255,255,0.04)]">
                            <h3 className="font-semibold text-white">
                                What happens next?
                            </h3>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                                <li>We receive your details in our mailbox.</li>
                                <li>Our team reviews and calls you back.</li>
                                <li>No spam—just a direct follow-up.</li>
                            </ul>
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
