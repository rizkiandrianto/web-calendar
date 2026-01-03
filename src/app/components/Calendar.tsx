import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CalendarGrid, HOLIDAYS } from './CalendarGrid';
import { PhotoFrame } from './PhotoFrame';

interface CalendarProps {
  month: number; // 0-11
  onMonthChange: (month: number) => void;
  logo: string;
}

const MONTH_NAMES = [
  'JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI',
  'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'
];

const PLACEHOLDER_IMAGES = [
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // January - mountain
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // February
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // March
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // April
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // May
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // June
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // July
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // August
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // September
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // October
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // November
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', // December
];

function getMonthHolidays(month: number, year: number): Array<{ day: number; name: string }> {
  const holidays: Array<{ day: number; name: string }> = [];
  
  Object.entries(HOLIDAYS).forEach(([dateStr, name]) => {
    const [holYear, holMonth, holDay] = dateStr.split('-').map(Number);
    if (holYear === year && holMonth === month + 1) {
      holidays.push({ day: holDay, name });
    }
  });
  
  return holidays.sort((a, b) => a.day - b.day);
}

export function Calendar({ month, onMonthChange, logo }: CalendarProps) {
  const isPhotoLeft = month % 2 === 0;
  const monthHolidays = getMonthHolidays(month, 2026);

  const handlePrevMonth = () => {
    if (month > 0) onMonthChange(month - 1);
  };

  const handleNextMonth = () => {
    if (month < 11) onMonthChange(month + 1);
  };

  return (
    <div className="relative">
      {/* Navigation buttons */}
      <div className="absolute -top-12 left-0 right-0 flex justify-center gap-4 z-10">
        <button
          onClick={handlePrevMonth}
          disabled={month === 0}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Bulan sebelumnya"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={handleNextMonth}
          disabled={month === 11}
          className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          aria-label="Bulan berikutnya"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Calendar container - 21cm x 15cm */}
      <div 
        className="bg-white shadow-2xl overflow-hidden"
        style={{
          width: '21cm',
          height: '15cm',
          display: 'flex',
          flexDirection: isPhotoLeft ? 'row' : 'row-reverse',
        }}
      >
        {/* Photo section */}
        <div className="relative" style={{ width: '45%', height: '100%' }}>
          <PhotoFrame
            src={PLACEHOLDER_IMAGES[month]}
            alt={`Foto ${MONTH_NAMES[month]}`}
            isPhotoLeft={isPhotoLeft}
          />
        </div>

        {/* Calendar section */}
        <div className="flex-1 p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 border-b pb-4">
            <img src={logo} alt="Logo" className="h-12 object-contain hidden" />
            <h1 className="font-extrabold text-slate-700 text-4xl">2026</h1>
          </div>

          {/* Month name */}
          <div className="mb-6">
            <h2 className="text-4xl">
              <span className="text-orange-500" style={{ fontWeight: 700 }}>
                {String(month + 1).padStart(2, '0')}
              </span>{' '}
              <span style={{ fontWeight: 700 }}>{MONTH_NAMES[month]}</span>
            </h2>
          </div>

          {/* Calendar grid */}
          <CalendarGrid month={month} year={2026} />

          {/* Holiday list */}
          {monthHolidays.length > 0 && (
            <div className="mt-4 pt-3 border-t border-gray-200">
              <div className="space-y-1">
                {monthHolidays.map((holiday, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs">
                    <span className="text-red-500 capitalize" style={{ fontWeight: 600 }}>
                      {holiday.day} {MONTH_NAMES[month].toLowerCase()}:
                    </span>
                    <span className="text-gray-700">{holiday.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom logo */}
          <div className="mt-auto pt-4 hidden">
            <img src={logo} alt="Logo" className="h-8 object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}