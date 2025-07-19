'use client';

import Container from "../container/Container";
import Logo from "./Logo";
import Search from "../search/Search";
import UserMenu from "../usermenu/UserMenu";

const NavBar =() => {
    return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
        <div className="py-4 border-b-[0.2px]">
            <Container>
                <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                    {/* Desktop view */}
                    <div className="hidden md:block">
                        <Logo/>
                    </div>
                    
                    {/* Search is shown in both views but takes more space in mobile */}
                    <div className="flex-1 md:flex-initial">
                        <Search/>
                    </div>
                    
                    <div className="flex items-center">
                        <UserMenu/>
                    </div>
                </div>
            </Container>
        </div>
    </div>
    );
}
export default NavBar;
        