'use client';

import { useRouter } from "next/navigation";
import { Roboto } from 'next/font/google';

const roboto = Roboto({
    weight: '900',
    subsets: ['latin'],
});

const Logo = () => {
    const router = useRouter();
    
    return (
        <div 
            onClick={() => router.push('/')}
            className="cursor-pointer"
        >
            <div 
                className={`${roboto.className} text-black text-[25px] flex items-baseline`}
            >
                Workhub <span className="text-[40px] text-[#170cab] leading-none ml-[2px]">.</span>
            </div>
        </div>
    );
}

export default Logo;            