import { useState } from 'react';
import { Calendar } from './components/Calendar';

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January 2026

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Calendar 
        month={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  );
}
