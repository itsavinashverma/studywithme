import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
  const dateString = time.toLocaleDateString(undefined, dateOptions);

  return (
    <div className="clock-container">
      <h1 className="time">{timeString}</h1>
      <p className="date">{dateString}</p>
    </div>
  );
};

export default Clock;
