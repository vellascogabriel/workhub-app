'use client';
import Image from "next/image";

interface AvatarProps {
    src?: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
    return (
        <Image 
            alt="Avatar"
            className="rounded-full"
            src={src || "/images/placeholder.png"}
            width={30}
            height={30}
        />
    )
}

export default Avatar;
