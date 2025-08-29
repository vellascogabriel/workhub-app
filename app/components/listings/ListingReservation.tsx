'use client';

import { Range } from "react-date-range";
import Calendar from "@/app/components/ui/Calendar";
import Button from "@/app/components/ui/buttons/Button";
import { useState } from "react";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Formatar o preço como moeda brasileira
  const formattedPrice = `R$ ${(price / 100).toFixed(2).replace('.', ',')}`;
  const formattedTotalPrice = `R$ ${(totalPrice / 100).toFixed(2).replace('.', ',')}`;

  return ( 
    <div className="
      bg-white 
      rounded-xl 
      border-[1px]
      border-neutral-200 
      overflow-hidden
    ">
      <div className="
        flex flex-row items-center gap-1 p-4
      ">
        <div className="text-2xl font-semibold">
          {formattedPrice}
        </div>
        <div className="font-light text-neutral-600">
          / dia
        </div>
      </div>
      <hr />
      <div className="p-4">
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="
            w-full
            p-4
            border-[1px]
            border-neutral-200
            rounded-lg
            flex
            justify-between
            items-center
            cursor-pointer
            hover:border-neutral-300
            transition
          "
        >
          <span className="text-neutral-600">
            {dateRange.startDate ? dateRange.startDate.toLocaleDateString('pt-BR') : 'Selecione a data de início'}
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
        </button>
        
        {isCalendarOpen && (
          <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value.selection)}
          />
        )}
      </div>
      <hr />
      <div className="p-4">
        <Button 
          disabled={disabled} 
          label="Reservar"
          onClick={onSubmit}
        />
      </div>
      <hr />
      <div className="
        p-4 
        flex 
        flex-row 
        items-center 
        justify-between
        font-semibold
        text-lg
      ">
        <div>
          Total
        </div>
        <div>
          {formattedTotalPrice}
        </div>
      </div>
    </div>
   );
}
 
export default ListingReservation;
