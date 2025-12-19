// app/page.tsx or components/Hero.tsx
import InfiniteScrollAnimation from "@/app/layouts/InfiniteScrollAnimation";

export default function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden  text-slate-100">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-120 w-120 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.55)_0,rgba(15,23,42,0)_70%)] blur-3xl" />
            </div>
            <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-4 text-center ">
                <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-50 sm:text-5xl md:text-6xl animate-fade-in-up">
                    Costs down. Profits up.
                    <br />
                    Stress zero.
                </h1>
                <p className="mt-6 max-w-2xl text-base text-slate-300 sm:text-lg animate-fade-in-up [animation-delay:120ms]">
                    KostCart helps you take control of your business with insight‑driven cost management.
                    Say goodbye to leakages and unlock your full potential effortlessly.
                </p>
                <div className="mt-8">
                    <button className="cursor-pointer rounded-full bg-[#2563ff] px-8 py-3 text-sm font-medium text-white shadow-[0_0_40px_rgba(37,99,255,0.55)] transition hover:bg-[#1d4fe0] animate-fade-in-up [animation-delay:240ms]">
                        Want to try KostCart ?
                    </button>
                </div>
                <div className="mt-16 w-full max-w-3xl animate-fade-in-up [animation-delay:240ms]">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
                        Trusted by
                    </p>
                </div>
                <div className="relative mt-6 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-3xl animate-fade-in-up [animation-delay:360ms]">
                    <InfiniteScrollAnimation/>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16
                  bg-linear-to-r from-black via-black/90 to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16
                  bg-linear-to-l from-black via-black/90 to-transparent"/>
                </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-linear-to-r from-slate-600/0 via-slate-500/80 to-slate-600/0" />
        </section>
    );
}
