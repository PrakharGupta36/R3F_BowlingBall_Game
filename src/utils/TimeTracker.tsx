import { useState, useEffect, memo } from "react";

interface TimeTrackerProps {
  onTimeChange: (minutes: number, seconds: number) => void;
}

const TimeTracker = memo(({ onTimeChange }: TimeTrackerProps) => {
  const [secondsSpent, setSecondsSpent] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsSpent((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const minutes = Math.floor(secondsSpent / 60);
    const seconds = secondsSpent % 60;
    onTimeChange(minutes, seconds);
  }, [secondsSpent, onTimeChange]);

  return null; // No visual output, just tracking time
});

export default TimeTracker;
