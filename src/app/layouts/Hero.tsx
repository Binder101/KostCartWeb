// app/page.tsx or components/Hero.tsx
export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden  text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.55)_0,rgba(15,23,42,0)_70%)] blur-3xl" />
            </div>
            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl">
                    Costs down. Profits up.
                    <br />
                    Stress zero.
                </h1>
                <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg">
                    KostCart helps you take control of your restaurant with insight‑driven cost management.
                    Say goodbye to leakages and unlock your full potential effortlessly.
                </p>
                <div className="mt-8">
                    <button className="cursor-pointer rounded-full bg-[#2563ff] px-8 py-3 text-sm font-medium text-white shadow-[0_0_40px_rgba(37,99,255,0.55)] transition hover:bg-[#1d4fe0]">
                        Coming Soon !
                    </button>
                </div>
                <div className="mt-16 w-full max-w-3xl">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        Trusted by
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-10 text-2xl text-slate-200">
                        <span className="font-serif text-[#f4d27f]">Sirka</span>
                        <span className="font-serif">the velvet cup</span>
                        <span className="font-semibold">Logoipsum</span>
                    </div>
                </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-slate-600/0 via-slate-500/80 to-slate-600/0" />
        </section>
    );
}
