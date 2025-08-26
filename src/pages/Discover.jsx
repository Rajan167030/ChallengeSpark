import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getChallengesByDuration, getRandomChallenges } from '../data/challenges'
import SuggestionCard from '../components/UI/SuggestionCard'

function Discover() {
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const { selectedTime, selectedCategory } = state

  const handleBack = () => {
    navigate('/home')
  }

  const handleStartChallenge = (challenge) => {
    actions.startChallenge(challenge)
    navigate(`/challenge/${challenge.id}`)
  }

  // Get challenges based on selected time and category
  let suggestions = []
  if (selectedCategory === 'all') {
    suggestions = getChallengesByDuration(selectedTime, 2)
  } else {
    suggestions = getRandomChallenges(5, selectedCategory, selectedTime)
  }

  // If no exact matches, get random challenges
  if (suggestions.length === 0) {
    suggestions = getRandomChallenges(5, selectedCategory)
  }

  return (
    <>
      <div className="recommendation-header">
        <button 
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-800"
        >
          <i className="fas fa-arrow-left text-lg"></i>
        </button>
        
        <h1 className="recommendation-title">{selectedTime}-minute activities</h1>
        <p className="recommendation-subtitle">Perfect for your short break</p>
      </div>
      
      <div className="recommendation-cards">
        {suggestions.map((challenge) => (
          <SuggestionCard
            key={challenge.id}
            challenge={challenge}
            onStart={handleStartChallenge}
          />
        ))}
        
        {suggestions.length === 0 && (
          <div className="text-center py-8">
            <i className="fas fa-search text-4xl text-gray-300 mb-4"></i>
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No challenges found</h3>
            <p className="text-gray-500">Try adjusting your time or category preferences</p>
          </div>
        )}
      </div>
    </>
  )
}

export default Discover