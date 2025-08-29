'use client';

import Image from "next/image";
// Import the same SafeUser type used by HeartButton
import { useState } from "react";
import Heading from "@/app/components/ui/Heading";
import HeartButton from "@/app/components/ui/buttons/HeartButton";

// Use the same SafeUser type as in HeartButton
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

interface ListingHeadProps {
  title: string;
  imageSrc: string[];
  locationValue: string;
  id: string;
  currentUser?: SafeUser | null;
}

const ListingHead: React.FC<ListingHeadProps> = ({
  title,
  imageSrc,
  locationValue,
  id,
  currentUser
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageSrc.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageSrc.length) % imageSrc.length);
  };

  return (
    <>
      <Heading
        title={title}
        subtitle={`${locationValue}`}
      />
      <div className="
        mt-6
        
        w-full
        h-[60vh]
        overflow-hidden 
        rounded-xl
        relative
      ">
        <Image
          src={imageSrc[currentImageIndex]}
          fill
          className="object-cover w-full"
          alt="Workspace"
        />
        <div className="absolute top-5 right-5">
          <HeartButton 
            listingId={id}
            currentUser={currentUser}
          />
        </div>
        
        {imageSrc.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="
                absolute 
                left-5 
                top-1/2 
                -translate-y-1/2
                bg-white
                rounded-full
                p-2
                shadow-md
                hover:shadow-lg
                transition
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button 
              onClick={nextImage}
              className="
                absolute 
                right-5 
                top-1/2 
                -translate-y-1/2
                bg-white
                rounded-full
                p-2
                shadow-md
                hover:shadow-lg
                transition
              "
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {imageSrc.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`
                    w-2 
                    h-2 
                    rounded-full 
                    ${currentImageIndex === index ? 'bg-white' : 'bg-white/50'}
                  `}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
 
export default ListingHead;
