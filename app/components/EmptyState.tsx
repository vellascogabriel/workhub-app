'use client';

import { useRouter } from "next/navigation";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Nenhum resultado encontrado",
  subtitle = "Tente ajustar ou remover alguns dos seus filtros.",
  showReset
}) => {
  const router = useRouter();

  return ( 
    <div 
      className="
        h-[60vh]
        flex 
        flex-col 
        gap-2 
        justify-center 
        items-center 
      "
    >
      <div className="text-center">
        <div className="text-2xl font-bold">
          {title}
        </div>
        <div className="font-light text-neutral-500 mt-2">
          {subtitle}
        </div>
      </div>
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remover todos os filtros"
            onClick={() => router.push('/')}
          />
        )}
      </div>
    </div>
   );
}
 
export default EmptyState;
