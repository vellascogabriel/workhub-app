'use client';

// Importação removida pois não é utilizada

interface CategoryInputProps {
  label: string;
  selected?: boolean;
  Icon: React.FC<{ size?: number }>;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  Icon,
  label,
  selected,
  onClick
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-4
        border
        rounded-xl
        hover:border-black
        transition
        cursor-pointer
        bg-white
        ${selected ? 'border-black' : 'border-neutral-200'}
      `}
    >
      <Icon size={36} />
      <div className="font-medium text-sm mt-1">
        {label}
      </div>
    </div>
  );
}

export default CategoryInput;
