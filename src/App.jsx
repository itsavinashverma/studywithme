import React from 'react'
import Clock from './components/Clock/Clock'
import Pomodoro from './components/Pomodoro/Pomodoro'
import Todo from './components/Todo/Todo'
import MusicPlayer from './components/MusicPlayer/MusicPlayer'
import './App.css'

function App() {
  return (
    <div className="dashboard-container">
      <div className="top-section">
        <Clock />
      </div>
      
      <div className="middle-section">
        <div className="left-panel">
          <Pomodoro />
        </div>
        <div className="right-panel">
          <Todo />
        </div>
      </div>

      <div className="bottom-section">
        <MusicPlayer />
      </div>
    </div>
  )
}

export default App
