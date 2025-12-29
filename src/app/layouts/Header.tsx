"use client"
import {useEffect, useState} from "react";

export default function Header(){
    const[isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const[isScroll, setIsScroll] = useState<boolean>(false);
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

    return(
        <header className={`fixed isolate before:absolute before:inset-0 before:-z-10 before:backdrop-blur-xl before:backdrop-saturate-150 before:bg-slate-950/35 inset-x-0 top-0 z-30 ${isScroll ? `bg-slate-950/35 backdrop-blur-xl border-b border-white/10` : `bg-transparent`}`}>
            <div className="flex relative top-0 right-0 items-center justify-between h-16 px-4 sm:h-20 sm:px-8 lg:h-24 lg:px-32 w-full text-[#F6F7D7]">
                <div className="flex items-center">
                    <div className="bg-[url('/drawables/kc_logo_light.svg')] bg-cover bg-no-repeat w-8 h-8 me-3 sm:w-10 sm:h-10 lg:h-12 lg:w-12"></div>
                    <div className="bg-[url('/drawables/kc_light_name.svg')] bg-cover bg-no-repeat w-23 h-5 sm:w-22 sm:h-5 lg:w-30 lg:h-7"></div>
                </div>
                <nav className="hidden  items-center space-x-6 font-semibold md:flex lg:space-x-10">
                    <button className="p-2 hover:text-amber-100 cursor-pointer">Home</button>
                    <button className="p-2 hover:text-amber-100 cursor-pointer">Blog</button>
                    <button className="p-2 hover:text-amber-100 cursor-pointer">Products</button>
                    <button className="p-2 hover:text-amber-100 cursor-pointer">About Us</button>
                    <button className="p-2 hover:text-amber-100 cursor-pointer">Contact Us</button>
                </nav>
                <button className={`md:hidden p-3 cursor-pointer items-center group ${isMenuOpen ? 'isMenuOpen' : ''}`} onClick = {handleToggleMenu} aria-label="Toggle Menu" aria-expanded={isMenuOpen}>
                    <span className="block h-0.5 w-5 bg-[#F6F7D7] mb-1 transition-transform duration-300 origin-center group-[.isMenuOpen]:translate-y-1.5 group-[.isMenuOpen]:rotate-45 group-[.isMenuOpen]:mb-0" />
                    <span className="block h-0.5 w-5 bg-[#F6F7D7] mb-1 transition-opacity duration-300 group-[.isMenuOpen]:opacity-0" />
                    <span className="block h-0.5 w-5 bg-[#F6F7D7] transition-transform duration-300 group-[.isMenuOpen]:-translate-y-0.5 group-[.isMenuOpen]:-rotate-45" />
                </button>
            </div>
                {isMenuOpen &&
                    <nav className="md:hidden absolute top-full left-0 right-0 z-10 backdrop-blur-lg bg-linear-to-r from-indigo-900 via-slate-500 to-blue-900  border-t border-[linear-gradient(135deg,#ffffff_0%,#e5e7eb_33%,#ffffff_66%,#e5e7eb_100%)] animate-in slide-in-from-top-2">
                        <div className="flex flex-col space-y-0 px-4 py-4">
                            <button
                                onClick={handleNavItemClick}
                                className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all"
                            >
                                Home
                            </button>
                            <button
                                onClick={handleNavItemClick}
                                className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all"
                            >
                                Blog
                            </button>
                            <button
                                onClick={handleNavItemClick}
                                className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all"
                            >
                                Products
                            </button>
                            <button
                                onClick={handleNavItemClick}
                                className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all"
                            >
                                About Us
                            </button>
                            <button
                                onClick={handleNavItemClick}
                                className="text-center py-3 px-2 text-[#F6F7D7] hover:text-amber-100 hover:bg-white/10 rounded transition-all"
                            >
                                Contact Us
                            </button>
                        </div>
                    </nav>
                }
        </header>
    )
}