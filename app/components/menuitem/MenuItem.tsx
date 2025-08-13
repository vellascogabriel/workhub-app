'use client';

import { IconType } from 'react-icons';

interface MenuItemProps {
    label: string,
    onClick: () => void;
    icon?: IconType;
}


const MenuItem: React.FC<MenuItemProps> = ({
    label,
    onClick,
    icon: Icon
}) => {
    return(
        <div
            className="
            px-4
            py-3
            hover:bg-neutral-100
            transition
            cursor-pointer
            flex
            flex-row
            items-center"
            onClick={onClick}
        >
            {Icon && (
                <Icon size={20} className="mr-3" />
            )}
            {label}
        </div>
    )
}

export default MenuItem;