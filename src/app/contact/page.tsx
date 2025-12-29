import ContactUsForm from "@/app/layouts/ContactUsForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">
                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Get in touch
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Tell us about your restaurant and we’ll contact you on the phone.
                        </p>

                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6">
                            <h3 className="font-semibold text-gray-900">What happens next?</h3>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-600">
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
        </main>
    );
}
