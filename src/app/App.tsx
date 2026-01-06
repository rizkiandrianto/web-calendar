import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Calendar } from './components/figma/Calendar/Calendar';
import { CoverWithSlider } from './components/cover/CoverWithSlider';

function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January 2026

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Calendar
        month={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<CalendarPage />} />
      <Route path="/cover" element={<CoverWithSlider />} />
    </Routes>
  );
}
