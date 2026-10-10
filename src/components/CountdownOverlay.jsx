import { useState, useEffect } from 'react';

const TARGET_DATE = new Date('2026-10-13T00:00:00').getTime();

export default function CountdownOverlay({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = TARGET_DATE - now;

      if (difference <= 0) {
        setIsCompleted(true);
        onComplete();
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setTimeLeft({ hours, minutes, seconds });
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  if (isCompleted) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-[#F5F5DC] flex flex-col items-center justify-center font-departure">
      <div className="text-2xl md:text-4xl text-black font-bold mb-4 text-center px-4">
        {timeLeft.hours} hours {timeLeft.minutes} minutes {timeLeft.seconds} seconds
      </div>
      <div className="text-xl md:text-2xl text-black lowercase">
        coming soon
      </div>
    </div>
  );
}
