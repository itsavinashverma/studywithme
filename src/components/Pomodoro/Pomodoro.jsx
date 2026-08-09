import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, SkipForward } from 'lucide-react';
import './Pomodoro.css';

const initialModes = {
  WORK: { name: 'Work', time: 25 * 60 },
  SHORT_BREAK: { name: 'Short Break', time: 5 * 60 },
  LONG_BREAK: { name: 'Long Break', time: 15 * 60 },
};

const Pomodoro = () => {
  const [modes, setModes] = useState(initialModes);
  const [mode, setMode] = useState('WORK');
  const [timeLeft, setTimeLeft] = useState(modes.WORK.time);
  const [isRunning, setIsRunning] = useState(false);
  
  const [isEditing, setIsEditing] = useState(false);
  const [editMinutes, setEditMinutes] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isRunning && timeLeft === 0) {
      handleSkip();
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (isRunning) {
      document.title = `(${formatTime(timeLeft)})`;
    } else {
      document.title = 'Avinash';
    }
  }, [timeLeft, isRunning, mode]);
  
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(modes[mode].time);
  };

  const handleSkip = () => {
    setIsRunning(false);
    let nextMode = 'WORK';
    if (mode === 'WORK') nextMode = 'SHORT_BREAK';
    else if (mode === 'SHORT_BREAK') nextMode = 'WORK';

    setMode(nextMode);
    setTimeLeft(modes[nextMode].time);
  };

  const changeMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modes[newMode].time);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleTimerClick = () => {
    if (!isRunning) {
      setIsEditing(true);
      setEditMinutes(Math.floor(timeLeft / 60).toString());
    }
  };

  const handleEditChange = (e) => {
    setEditMinutes(e.target.value);
  };

  const handleEditSubmit = () => {
    const mins = parseInt(editMinutes, 10);
    if (!isNaN(mins) && mins > 0) {
      const newTime = mins * 60;
      setTimeLeft(newTime);
      setModes({
        ...modes,
        [mode]: { ...modes[mode], time: newTime }
      });
    }
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEditSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <div className="glass-panel pomodoro-container">
      <div className="mode-selector">
        {Object.entries(modes).map(([key, value]) => (
          <button
            key={key}
            className={`mode-btn ${mode === key ? 'active' : ''}`}
            onClick={() => changeMode(key)}
          >
            {value.name}
          </button>
        ))}
      </div>

      <div className="timer-display-container">
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            className="timer-edit-input"
            value={editMinutes}
            onChange={handleEditChange}
            onBlur={handleEditSubmit}
            onKeyDown={handleEditKeyDown}
            min="1"
          />
        ) : (
          <div className="timer-display" onClick={handleTimerClick} title="Click to edit minutes">
            {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="controls">
        <button className="control-btn main" onClick={toggleTimer}>
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button className="control-btn" onClick={handleReset}>
          <Square size={16} />
        </button>
        <button className="control-btn" onClick={handleSkip}>
          <SkipForward size={16} />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
