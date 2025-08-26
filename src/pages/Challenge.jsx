import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getChallengeById } from '../data/challenges'
import { useTimer } from '../hooks/useTimer'
import ProgressRing from '../components/UI/ProgressRing'

function Challenge() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const [currentStep, setCurrentStep] = useState(0)
  const [isCompleted, setIsCompleted] = useState(false)

  const challenge = getChallengeById(id)
  
  const {
    timeLeft,
    isRunning,
    isPaused,
    start,
    pause,
    resume,
    formatTime,
    progress
  } = useTimer(challenge ? challenge.duration * 60 : 300, () => {
    handleComplete()
  })

  useEffect(() => {
    if (challenge) {
      start()
    }
  }, [challenge])

  const handleComplete = () => {
    if (challenge) {
      actions.completeChallenge({
        challengeId: challenge.id,
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

  const handleBackToHome = () => {
    navigate('/home')
  }

  const handleShare = () => {
    // In a real app, this would open share dialog
    alert('Share functionality would be implemented here!')
  }

  if (!challenge) {
    return (
      <div className="active-challenge">
        <h2 className="text-2xl font-bold mb-4">Challenge not found</h2>
        <button className="btn btn-primary" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    )
  }

  if (isCompleted) {
    return (
      <div className="active-challenge">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <i className="fas fa-check text-white text-4xl"></i>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Challenge Complete!</h2>
        <p className="text-gray-500 mb-8">You've completed {challenge.title}</p>
        
        <div className="bg-indigo-50 rounded-xl p-4 mb-8 w-full max-w-xs mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">Stats</span>
            <span className="text-indigo-600 text-sm">Today</span>
          </div>
          <div className="flex justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{challenge.duration}</div>
              <div className="text-xs text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{state.user.streak}</div>
              <div className="text-xs text-gray-500">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{state.user.completedChallenges}</div>
              <div className="text-xs text-gray-500">Total</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-4 mb-8 w-full max-w-xs mx-auto shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-yellow-100 rounded-full p-2">
              <i className="fas fa-medal text-yellow-600"></i>
            </div>
            <div>
              <h3 className="font-semibold">Great Job!</h3>
              <p className="text-xs text-gray-500">Challenge completed successfully</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4 mb-4 w-full max-w-xs mx-auto">
          <button className="flex-1 btn btn-primary" onClick={handleBackToHome}>
            <i className="fas fa-home mr-2"></i> Home
          </button>
          <button className="flex-1 btn" style={{backgroundColor: '#f2f2f7'}} onClick={handleShare}>
            <i className="fas fa-share-alt mr-2"></i> Share
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="active-challenge">
      <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
      <p className="text-gray-500 mb-8">{challenge.description}</p>
      
      <ProgressRing progress={progress} color="#8338ec">
        <div className="timer">{formatTime()}</div>
        <div className="text-gray-500">remaining</div>
      </ProgressRing>
      
      <div className="instructions mt-8 mb-8 text-left w-full max-w-md">
        <h3 className="font-semibold text-lg mb-2">Instructions:</h3>
        <div className="bg-gray-100 p-4 rounded-xl">
          {challenge.instructions.map((instruction, index) => (
            <p key={index} className="mb-2 last:mb-0">
              <strong>{index + 1}.</strong> {instruction}
            </p>
          ))}
        </div>
      </div>
      
      <div className="flex gap-4 mb-4">
        <button className="flex-1 btn btn-primary" onClick={handleComplete}>
          <i className="fas fa-check mr-2"></i> Complete
        </button>
      </div>
      
      <button className="text-gray-500" onClick={handlePause}>
        <i className={`fas fa-${isPaused ? 'play' : 'pause'} mr-1`}></i> 
        {isPaused ? 'Resume' : 'Pause'}
      </button>
    </div>
  )
}

export default Challenge