export default function ThankYouPage() {
    return (
        <main className="min-h-screen bg-gray-50 px-4 py-16">
            <div className="mx-auto max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
                <h1 className="text-2xl font-semibold text-gray-900">Thank you!</h1>
                <p className="mt-2 text-gray-600">
                    We’ve received your details and sent them to our mailbox. We’ll reach out soon.
                </p>
                <a
                    href="/contact"
                    className="mt-6 inline-flex rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
                >
                    Submit another response
                </a>
            </div>
        </main>
    );
}
