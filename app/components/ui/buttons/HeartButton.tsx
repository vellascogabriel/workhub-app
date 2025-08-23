'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
// Tipo modificado para compatibilidade com os dados retornados por getCurrentUser
type SafeUser = {
  id: string;
  name: string | null;
  email: string | null;
  emailVerified: string | null;
  image: string | null;
  hashedPassword: string | null;
  createdAt: string;
  updatedAt: string;
  favoriteIds: string[];
};
import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ listingId, currentUser }) => {
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(() => {
    return currentUser?.favoriteIds?.includes(listingId) || false;
  });

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return toast.error('Faça login para favoritar workspaces');
      }

      try {
        setIsFavorite((prev: boolean) => !prev);

        // Aqui você pode implementar a chamada para a API para atualizar os favoritos
        // await axios.post(`/api/favorites/${listingId}`);

        router.refresh();
      } catch {
        // Capturando erro sem variável para evitar avisos do ESLint
        toast.error('Algo deu errado');
        setIsFavorite((prev: boolean) => !prev); // Reverter em caso de erro
      }
    },
    [currentUser, router] // listingId removido pois é uma dependência desnecessária segundo o ESLint
  );

  return (
    <div
      onClick={toggleFavorite}
      className="
        relative
        hover:opacity-80
        transition
        cursor-pointer
      "
    >
      <AiOutlineHeart
        size={28}
        className="
          fill-white
          absolute
          -top-[2px]
          -right-[2px]
        "
      />
      <AiFillHeart size={24} className={isFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  );
};

export default HeartButton;
