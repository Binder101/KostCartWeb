export default function Header(){
    return(
        <div>
            <div className="flex items-center justify-between h-16 px-32 w-full text-[#F6F7D7]">
                <div className="text-2xl  font-[Outfit]">KostCart</div>
                <div className="flex items-center justify-between space-x-10 font-semibold">
                    <div className="p-2 hover:text-amber-100">Home</div>
                    <div className="p-2 hover:text-amber-100">Blog</div>
                    <div className="p-2 hover:text-amber-100">Solutions</div>
                    <div className="p-2 hover:text-amber-100">About Us</div>
                    <div className="p-2 hover:text-amber-100">Contact Us</div>
                </div>
            </div>
            <div
                className="w-full h-[0.1px] bg-[linear-gradient(135deg,#ffffff_0%,#e5e7eb_33%,#ffffff_66%,#e5e7eb_100%)]">
            </div>
        </div>
    )
}