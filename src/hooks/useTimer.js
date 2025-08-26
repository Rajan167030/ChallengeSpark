import { useState, useEffect, useRef } from 'react'

export function useTimer(initialTime = 0, onComplete = null) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning && !isPaused && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            if (onComplete) {
              onComplete()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, isPaused, timeLeft, onComplete])

  const start = () => {
    setIsRunning(true)
    setIsPaused(false)
  }

  const pause = () => {
    setIsPaused(true)
  }

  const resume = () => {
    setIsPaused(false)
  }

  const stop = () => {
    setIsRunning(false)
    setIsPaused(false)
    setTimeLeft(initialTime)
  }

  const reset = (newTime = initialTime) => {
    setTimeLeft(newTime)
    setIsRunning(false)
    setIsPaused(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getProgress = () => {
    if (initialTime === 0) return 0
    return ((initialTime - timeLeft) / initialTime) * 100
  }

  return {
    timeLeft,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    reset,
    formatTime: () => formatTime(timeLeft),
    progress: getProgress()
  }
}