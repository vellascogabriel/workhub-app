'use client';

import { AiOutlineMenu } from 'react-icons/ai';
import Avatar from '../avatar/Avatar';
import { useState } from 'react';
import MenuItem from '../menuitem/MenuItem';

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
        setIsOpen((value) => !value);
    }
    return (
        <div className="relative flex flex-row">
            <div
                onClick={() => { }}
                className="
                    hidden
                    md:block
                    text-sm
                    font-semibold
                    py-3
                    px-4
                    hover: bg-neutral-100
                    transition
                    cursor-pointer
                ">
                Workhub your workspace
            </div>
            <div
                onClick={toggleOpen}
                className="
                    p-4
                    md:py-1
                    md: px-2
                    border-[1px]
                    border-neutral-200
                    flex
                    flex-row
                    items-center
                    gap-3
                    rounded-full
                    transition
                    cursor-pointer
                    hover: shadow-md          
                "
            >
                <AiOutlineMenu/>
                <div className="hidden md:block">
                    <Avatar />
                </div>
            </div>
            { isOpen && (
                <div
                    className="
                    absolute
                    roudend-xl
                    shadow-md
                    w-[40w]
                    md:w-3/4
                    bg-white
                    overflow-hidden
                    right-0
                    top-12
                    text-sm"
                >
                    <div className="flex flex-col cursor-pointer">
                        <>
                        <MenuItem label="Login" onClick={() => {}}/>
                        <MenuItem label="Sign Up" onClick={() => {}}/>
                        </>
                    </div>

                </div>
            )}
        </div>
    )
}

export default UserMenu;