'use client';

import { useCallback, useEffect, useMemo, useState } from "react";
// Define SafeUser type to match the one in HeartButton
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

import { categories } from "@/app/components/categories/Categories";
import Container from "@/app/components/container/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

interface ListingClientProps {
  listing: any;
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listing,
  currentUser
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // Buscar a categoria do workspace
  const category = useMemo(() => {
    return categories.find((item) => 
      item.label === listing.category);
  }, [listing.category]);

  // Calcular datas já reservadas
  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    // Aqui você pode adicionar lógica para buscar datas já reservadas
    // Por exemplo, se o listing tiver uma propriedade reservations:
    // listing.reservations?.forEach((reservation: any) => {
    //   const range = eachDayOfInterval({
    //     start: new Date(reservation.startDate),
    //     end: new Date(reservation.endDate)
    //   });
    //   dates = [...dates, ...range];
    // });

    return dates;
  }, []);

  // Atualizar o preço total quando as datas mudam
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return router.push('/login');
    }
    
    setIsLoading(true);

    axios.post('/api/reservations', {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId: listing?.id
    })
    .then(() => {
      toast.success('Reserva realizada com sucesso!');
      setDateRange(initialDateRange);
      router.push('/trips');
    })
    .catch(() => {
      toast.error('Algo deu errado.');
    })
    .finally(() => {
      setIsLoading(false);
    })
  }, [
    totalPrice, 
    dateRange, 
    listing?.id,
    router,
    currentUser
  ]);

  // Calcular o preço total quando as datas mudam
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      ) + 1;
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return ( 
    <Container>
      <div 
        className="
          max-w-screen-lg 
          mx-auto
          pt-8
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.address}
            id={listing.id}
            currentUser={currentUser}
          />
          <div 
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              user={listing.user}
              category={listing.category}
              description={listing.description}
              deskCount={listing.deskCount}
              meetingRoomCount={listing.meetingRoomCount}
              privateOfficeCount={listing.privateOfficeCount}
              capacity={listing.capacity}
              amenities={listing.amenities}
              has24HourAccess={listing.has24HourAccess}
              address={listing.address}
            />
            <div 
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
   );
}
 
export default ListingClient;
