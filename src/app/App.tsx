import { useState } from 'react';
import { Calendar } from './components/Calendar';
import logoImage from 'figma:asset/219e0d6e6035261cd00d38604806d503ed6c7fa7.png';

export default function App() {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = January 2026

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <Calendar 
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        logo={logoImage}
      />
    </div>
  );
}
