import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getChallengeById, challengeCategories } from '../data/challenges'
import { useTimer } from '../hooks/useTimer'
import ProgressRing from '../components/UI/ProgressRing'

function Challenge() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const [isCompleted, setIsCompleted] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const challenge = getChallengeById(id)
  const category = challenge ? challengeCategories[challenge.category] : null
  
  const {
    timeLeft,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    stop,
    formatTime,
    progress
  } = useTimer(challenge ? challenge.duration * 60 : 300, () => {
    handleComplete()
  })

  useEffect(() => {
    if (challenge && !isCompleted) {
      start()
    }
  }, [challenge, isCompleted])

  const handleComplete = () => {
    if (challenge) {
      actions.completeChallenge({
        challengeId: challenge.id,
        title: challenge.title,
        duration: challenge.duration
      })
      setIsCompleted(true)
    }
  }

  const handlePause = () => {
    if (isPaused) {
      resume()
    } else {
      pause()
    }
  }

  const handleStop = () => {
    stop()
    navigate('/dashboard')
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard')
  }

  const handleStartAnother = () => {
    navigate('/discover')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'MicroSpark Challenge Completed!',
        text: `I just completed "${challenge.title}" in ${challenge.duration} minutes!`,
        url: window.location.href
      })
    } else {
      // Fallback for browsers without Web Share API
      const text = `I just completed "${challenge.title}" in ${challenge.duration} minutes on MicroSpark!`
      navigator.clipboard.writeText(text)
      alert('Challenge details copied to clipboard!')
    }
  }

  if (!challenge) {
    return (
      <div className="text-center py-12">
        <i className="fas fa-exclamation-triangle text-6xl text-gray-300 mb-4"></i>
        <h2 className="text-2xl font-bold mb-4">Challenge not found</h2>
        <button className="btn btn-primary" onClick={handleBackToDashboard}>
          <i className="fas fa-home mr-2"></i>
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="completion-screen">
        <div className="completion-icon">
          <i className="fas fa-check"></i>
        </div>
        
        <h1 className="completion-title">Challenge Complete!</h1>
        <p className="completion-subtitle">
          Congratulations on completing "{challenge.title}"
        </p>
        
        <div className="completion-stats">
          <div className="completion-stat">
            <p className="completion-stat-value">{challenge.duration}</p>
            <p className="completion-stat-label">Minutes</p>
          </div>
          <div className="completion-stat">
            <p className="completion-stat-value">{state.user.streak}</p>
            <p className="completion-stat-label">Day Streak</p>
          </div>
          <div className="completion-stat">
            <p className="completion-stat-value">{state.user.completedChallenges}</p>
            <p className="completion-stat-label">Total Completed</p>
          </div>
        </div>
        
        <div className="card mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
              <i className="fas fa-medal text-yellow-600 text-xl"></i>
            </div>
            <div>
              <h3 className="font-semibold">Excellent Work!</h3>
              <p className="text-sm text-gray-500">You've successfully completed this challenge</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <button className="btn btn-primary" onClick={handleBackToDashboard}>
            <i className="fas fa-home mr-2"></i>
            Dashboard
          </button>
          <button className="btn btn-secondary" onClick={handleStartAnother}>
            <i className="fas fa-plus mr-2"></i>
            Another Challenge
          </button>
          <button className="btn btn-secondary" onClick={handleShare}>
            <i className="fas fa-share-alt mr-2"></i>
            Share
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <button 
            className="btn btn-secondary"
            onClick={handleStop}
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back
          </button>
          <div>
            <h1 className="text-2xl font-bold">{challenge.title}</h1>
            <p className="text-gray-500">{challenge.description}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div 
            className={`challenge-icon ${challenge.category} w-12 h-12`}
          >
            <i className={`fas fa-${category.icon}`}></i>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium capitalize">{category.name}</div>
            <div className="text-xs text-gray-500">{challenge.duration} minutes</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Timer Section */}
        <div className="challenge-timer">
          <ProgressRing 
            size={300} 
            strokeWidth={12} 
            progress={progress}
            color="var(--primary-color)"
          >
            <div className="timer-display">{formatTime()}</div>
            <div className="timer-label">remaining</div>
          </ProgressRing>
          
          <div className="timer-controls">
            <button 
              className="btn btn-secondary"
              onClick={handlePause}
            >
              <i className={`fas fa-${isPaused ? 'play' : 'pause'} mr-2`}></i>
              {isPaused ? 'Resume' : 'Pause'}
            </button>
            <button 
              className="btn btn-success"
              onClick={handleComplete}
            >
              <i className="fas fa-check mr-2"></i>
              Complete
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleStop}
            >
              <i className="fas fa-stop mr-2"></i>
              Stop
            </button>
          </div>
        </div>

        {/* Instructions Section */}
        <div className="challenge-instructions">
          <h2 className="instructions-title">
            <i className={`fas fa-${category.icon} mr-2`}></i>
            Instructions
          </h2>
          
          <div className="space-y-3">
            {challenge.instructions.map((instruction, index) => (
              <div 
                key={index} 
                className={`instruction-step ${currentStep === index ? 'ring-2 ring-primary-500' : ''}`}
              >
                <div className="step-number">{index + 1}</div>
                <div className="step-text">{instruction}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <i className="fas fa-lightbulb text-blue-500"></i>
              <span className="font-medium text-blue-700 dark:text-blue-300">Pro Tip</span>
            </div>
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Focus on quality over speed. Take your time with each step and be present in the moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Challenge