"use client"

import {FormEvent, useEffect, useRef, useState} from "react";
import {usePathname, useRouter} from "next/navigation";

const AUTH_STORAGE_KEY = "kostcart-authenticated";

export default function Header(){
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isScroll, setIsScroll] = useState<boolean>(false);
    const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
    const [identifier, setIdentifier] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        if (typeof window === "undefined") {
            return false;
        }
        return window.localStorage.getItem(AUTH_STORAGE_KEY) === "true";
    });
    const desktopLoginContainerRef = useRef<HTMLDivElement>(null);
    const mobileLoginContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const isDashboardPage = pathname === "/dashboard";

    const handleToggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const handleNavItemClick = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const onScroll = () => setIsScroll(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            const clickedNode = event.target as Node;
            const clickedInsideDesktop = desktopLoginContainerRef.current?.contains(clickedNode);
            const clickedInsideMobile = mobileLoginContainerRef.current?.contains(clickedNode);

            if (!clickedInsideDesktop && !clickedInsideMobile) {
                setIsLoginOpen(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleLogin = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!identifier.trim() || !password.trim()) {
            setErrorMessage("Please enter your credentials.");
            return;
        }

        window.localStorage.setItem(AUTH_STORAGE_KEY, "true");
        setIsAuthenticated(true);
        setErrorMessage("");
        setIsLoginOpen(false);
        setIdentifier("");
        setPassword("");
        setIsMenuOpen(false);
        router.push("/dashboard");
    };

    const handleLogout = () => {
        window.localStorage.removeItem(AUTH_STORAGE_KEY);
        setIsAuthenticated(false);
        setIsLoginOpen(false);
        setIsMenuOpen(false);
        router.push("/");
    };

    return(
        <header className={`fixed isolate before:absolute before:inset-0 before:-z-10 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-slate-950/35 inset-x-0 top-0 z-30 ${isScroll ? `bg-slate-950/35 backdrop-blur-xl border-b border-white/10` : `bg-transparent`}`}>
            <div className="flex relative top-0 right-0 items-center justify-between h-16 px-4 sm:h-20 sm:px-8 lg:h-24 lg:px-32 w-full text-[#F6F7D7]">
                <div className="flex items-center">
                    <div className="bg-[url('/drawables/kc_logo_light.svg')] bg-cover bg-no-repeat w-8 h-8 me-3 sm:w-10 sm:h-10 lg:h-12 lg:w-12"></div>
                    <div className="bg-[url('/drawables/kc_light_name.svg')] bg-cover bg-no-repeat w-23 h-5 sm:w-22 sm:h-5 lg:w-30 lg:h-7"></div>
                </div>
                {!isDashboardPage &&
                    <nav className="hidden items-center space-x-6 font-semibold md:flex lg:space-x-10">
                        <a className="p-2 hover:text-amber-100 cursor-pointer" href="#home">Home</a>
                        <a className="p-2 hover:text-amber-100 cursor-pointer" href="#blog">Blog</a>
                        <a className="p-2 hover:text-amber-100 cursor-pointer" href="#features">Products</a>
                        <a className="p-2 hover:text-amber-100 cursor-pointer" href="#about-us">About Us</a>
                        <a className="p-2 hover:text-amber-100 cursor-pointer" href="#contact">Contact Us</a>
                        {!isAuthenticated &&
                            <div className="relative" ref={desktopLoginContainerRef}>
                                <button
                                    className="px-4 py-2 border border-[#F6F7D7]/60 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                                    onClick={() => setIsLoginOpen((prev) => !prev)}
                                    aria-expanded={isLoginOpen}
                                >
                                    LOGIN
                                </button>
                                {isLoginOpen &&
                                    <form onSubmit={handleLogin} className="absolute top-full right-0 mt-2 w-72 rounded-xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3">
                                        <input
                                            type="text"
                                            placeholder="Username / Email / Phone"
                                            value={identifier}
                                            onChange={(event) => setIdentifier(event.target.value)}
                                            className="w-full rounded-md border border-white/20 bg-slate-950/80 px-3 py-2 text-sm text-[#F6F7D7] placeholder:text-[#F6F7D7]/60 outline-none focus:border-amber-100"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}
                                            className="w-full rounded-md border border-white/20 bg-slate-950/80 px-3 py-2 text-sm text-[#F6F7D7] placeholder:text-[#F6F7D7]/60 outline-none focus:border-amber-100"
                                        />
                                        {errorMessage && <p className="text-xs text-red-300">{errorMessage}</p>}
                                        <button type="submit" className="w-full rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-200 transition-colors cursor-pointer">LOGIN</button>
                                    </form>
                                }
                            </div>
                        }
                    </nav>
                }

                {isDashboardPage && (
                    <button className="px-4 py-2 border border-[#F6F7D7]/60 rounded-md hover:bg-white/10 transition-colors cursor-pointer" onClick={handleLogout}>
                        LOGOUT
                    </button>
                )}

                {!isDashboardPage && (
                    <div className="md:hidden flex items-center gap-2 relative" ref={mobileLoginContainerRef}>
                        {!isAuthenticated && (
                            <button
                                className="px-3 py-2 text-xs border border-[#F6F7D7]/60 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
                                onClick={() => setIsLoginOpen((prev) => !prev)}
                                aria-expanded={isLoginOpen}
                            >
                                LOGIN
                            </button>
                        )}
                        <button className={`p-3 cursor-pointer items-center group ${isMenuOpen ? 'isMenuOpen' : ''}`} onClick = {handleToggleMenu} aria-label="Toggle Menu" aria-expanded={isMenuOpen}>
                            <span className="block h-0.5 w-5 bg-[#F6F7D7] mb-1 transition-transform duration-300 origin-center group-[.isMenuOpen]:translate-y-1.5 group-[.isMenuOpen]:rotate-45 group-[.isMenuOpen]:mb-0" />
                            <span className="block h-0.5 w-5 bg-[#F6F7D7] mb-1 transition-opacity duration-300 group-[.isMenuOpen]:opacity-0" />
                            <span className="block h-0.5 w-5 bg-[#F6F7D7] transition-transform duration-300 group-[.isMenuOpen]:-translate-y-0.5 group-[.isMenuOpen]:-rotate-45" />
                        </button>
                        {isLoginOpen && !isAuthenticated &&
                            <form onSubmit={handleLogin} className="absolute top-full right-0 mt-2 w-72 rounded-xl border border-white/20 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Username / Email / Phone"
                                    value={identifier}
                                    onChange={(event) => setIdentifier(event.target.value)}
                                    className="w-full rounded-md border border-white/20 bg-slate-950/80 px-3 py-2 text-sm text-[#F6F7D7] placeholder:text-[#F6F7D7]/60 outline-none focus:border-amber-100"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    className="w-full rounded-md border border-white/20 bg-slate-950/80 px-3 py-2 text-sm text-[#F6F7D7] placeholder:text-[#F6F7D7]/60 outline-none focus:border-amber-100"
                                />
                                {errorMessage && <p className="text-xs text-red-300">{errorMessage}</p>}
                                <button type="submit" className="w-full rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-200 transition-colors cursor-pointer">LOGIN</button>
                            </form>
                        }
                    </div>
                )}
            </div>
            {isMenuOpen && !isDashboardPage &&
                <nav className="md:hidden absolute top-full left-0 right-0 z-10 backdrop-blur-lg bg-linear-to-r from-indigo-900 via-slate-500 to-blue-900 border-t border-[linear-gradient(135deg,#ffffff_0%,#e5e7eb_33%,#ffffff_66%,#e5e7eb_100%)] animate-in slide-in-from-top-2">
                    <div className="flex flex-col space-y-0 px-4 py-4">
                        <a onClick={handleNavItemClick} href="#home" className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all">Home</a>
                        <a onClick={handleNavItemClick} href="#blog" className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all">Blog</a>
                        <a onClick={handleNavItemClick} href="#features" className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all">Products</a>
                        <a onClick={handleNavItemClick} href="#about-us" className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all">About Us</a>
                        <a onClick={handleNavItemClick} href="#contact" className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all">Contact Us</a>
                    </div>
                </nav>
            }
        </header>
    )
}
