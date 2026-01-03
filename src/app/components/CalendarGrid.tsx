interface CalendarGridProps {
  month: number; // 0-11
  year: number;
}

const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

// Holiday data for 2026
export const HOLIDAYS: Record<string, string> = {
  '2026-01-01': "Tahun Baru",
  '2026-01-16': "Isra Mi'raj",
  '2026-02-16': "Libur Imlek",
  '2026-02-17': "Tahun Baru Imlek",
  '2026-03-18': "Libur Nyepi",
  '2026-03-19': "Nyepi",
  '2026-03-20': "Cuti Lebaran",
  '2026-03-21': "Hari Raya Idul Fitri",
  '2026-03-22': "Hari Raya Idul Fitri",
  '2026-03-23': "Cuti Lebaran",
  '2026-03-24': "Cuti Lebaran",
  '2026-04-03': "Jumat Agung",
  '2026-04-05': "Paskah",
  '2026-05-01': "Hari Buruh Internasional",
  '2026-05-14': "Kenaikan Isa Almasih",
  '2026-05-15': "Cuti Kenaikan Isa Almasih",
  '2026-05-27': "Idul Adha",
  '2026-05-28': "Cuti Idul Adha",
  '2026-05-31': "Hari Raya Waisak",
  '2026-06-01': "Hari Lahir Pancasila",
  '2026-06-16': "Tahun Baru Islam",
  '2026-08-17': "Hari Kemerdekaan",
  '2026-08-25': "Maulid Nabi Muhammad",
  '2026-12-24': "Cuti Natal",
  '2026-12-25': "Hari Raya Natal",
};

function getDaysInMonth(month: number, year: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(month: number, year: number): number {
  // Get day of week (0 = Sunday, 1 = Monday, etc.)
  const day = new Date(year, month, 1).getDay();
  // Convert to Monday-based (0 = Monday, 6 = Sunday)
  return day === 0 ? 6 : day - 1;
}

function isHoliday(date: string): boolean {
  return date in HOLIDAYS;
}

function isSaturday(dayOfWeek: number): boolean {
  return dayOfWeek === 5; // Saturday is index 5 in Monday-based week
}

function isSunday(dayOfWeek: number): boolean {
  return dayOfWeek === 6; // Sunday is index 6 in Monday-based week
}

export function CalendarGrid({ month, year }: CalendarGridProps) {
  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const daysInPrevMonth = getDaysInMonth(month - 1, year);

  const days: Array<{
    day: number;
    isCurrentMonth: boolean;
    date: string;
    dayOfWeek: number;
  }> = [];

  // Previous month days
  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i;
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    days.push({
      day,
      isCurrentMonth: false,
      date: `${prevYear}-${String(prevMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      dayOfWeek: days.length % 7,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push({
      day,
      isCurrentMonth: true,
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      dayOfWeek: days.length % 7,
    });
  }

  // Next month days to fill the grid
  const remainingDays = 42 - days.length; // 6 rows * 7 days
  const nextMonth = month === 11 ? 0 : month + 1;
  const nextYear = month === 11 ? year + 1 : year;
  for (let day = 1; day <= remainingDays; day++) {
    days.push({
      day,
      isCurrentMonth: false,
      date: `${nextYear}-${String(nextMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      dayOfWeek: days.length % 7,
    });
  }

  const isNeedSixRows = days.slice(-7).some(day => day.isCurrentMonth);

  return (
    <div className="flex-1">
      {/* Day names */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAY_NAMES.map((dayName, index) => (
          <div
            key={dayName}
            className="text-center px-1 py-1 rounded text-white text-xs"
            style={{
              backgroundColor: index === 6 || index === 5 ? '#10b981' : '#374151',
              fontWeight: 600,
            }}
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1">
        {days.slice(0, isNeedSixRows ? 42 : 35).map((dayData, index) => {
          const isHol = isHoliday(dayData.date);
          const isSat = isSaturday(dayData.dayOfWeek);
          const isSun = isSunday(dayData.dayOfWeek);
          
          // Determine color: red for holidays, green for weekend (if not holiday), black otherwise
          let color = '#1f2937'; // default black
          if (isHol) {
            color = '#ef4444'; // red for holidays
          } else if ((isSat || isSun) && dayData.isCurrentMonth) {
            color = '#10b981'; // green for weekends
          }

          return (
            <div
              key={index}
              className="text-center py-1"
              style={{
                opacity: dayData.isCurrentMonth ? 1 : 0.3,
              }}
            >
              <div
                style={{
                  color: color,
                  fontWeight: dayData.isCurrentMonth ? 600 : 400,
                }}
              >
                {dayData.day}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}