'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
  value,
  onChange,
  disabledDates
}) => {
  const [currentDate, setCurrentDate] = useState<Date | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setCurrentDate(new Date());
  }, []);

  if (!isMounted || !currentDate) {
    return (
      <div className="w-full h-[400px] bg-gray-50 rounded-lg flex items-center justify-center">
        <div className="text-gray-500">Carregando calendário...</div>
      </div>
    );
  }

  return ( 
    <DateRange
      rangeColors={['#262626']}
      ranges={[value]}
      date={currentDate}
      onChange={onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={currentDate}
      disabledDates={disabledDates}
    />
   );
}
 
export default Calendar;
