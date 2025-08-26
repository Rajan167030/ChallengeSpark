import React, { useState, useEffect } from 'react'

function StatusBar() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: false
    })
  }

  return (
    <div className="status-bar">
      <span className="status-bar-time">{formatTime(currentTime)}</span>
      <div className="status-bar-icons">
        <i className="fas fa-wifi"></i>
        <i className="fas fa-signal"></i>
        <i className="fas fa-battery-full"></i>
      </div>
    </div>
  )
}

export default StatusBar