import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getChallengesByDuration, getRandomChallenges, challengeCategories } from '../data/challenges'
import ChallengeCard from '../components/UI/ChallengeCard'

function Discover() {
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const { selectedTime, selectedCategory, preferences } = state
  const [discoveryMode, setDiscoveryMode] = useState('smart')

  const handleChallengeClick = (challenge) => {
    actions.startChallenge(challenge)
    navigate(`/challenge/${challenge.id}`)
  }

  const handleTimeChange = (e) => {
    actions.setSelectedTime(parseInt(e.target.value))
  }

  const handleCategoryChange = (category) => {
    actions.setSelectedCategory(category)
  }

  const getSmartRecommendations = () => {
    // Get challenges based on user preferences
    const preferredCategories = Object.entries(preferences.categories)
      .filter(([_, enabled]) => enabled)
      .map(([category, _]) => category)
    
    let recommendations = []
    
    // Get challenges from preferred categories
    preferredCategories.forEach(category => {
      const categoryChallenges = getRandomChallenges(2, category, selectedTime)
      recommendations.push(...categoryChallenges)
    })
    
    // Remove duplicates and limit to 6
    const uniqueRecommendations = recommendations.filter((challenge, index, self) =>
      index === self.findIndex(c => c.id === challenge.id)
    ).slice(0, 6)
    
    return uniqueRecommendations
  }

  const getTimeBasedChallenges = () => {
    return getChallengesByDuration(selectedTime, 2).slice(0, 6)
  }

  const getCategoryBasedChallenges = () => {
    return getRandomChallenges(6, selectedCategory, selectedTime)
  }

  const getSuggestions = () => {
    switch (discoveryMode) {
      case 'smart':
        return getSmartRecommendations()
      case 'time':
        return getTimeBasedChallenges()
      case 'category':
        return getCategoryBasedChallenges()
      default:
        return getRandomChallenges(6)
    }
  }

  const suggestions = getSuggestions()

  const discoveryModes = [
    { key: 'smart', label: 'Smart Recommendations', icon: 'magic', description: 'Based on your preferences' },
    { key: 'time', label: 'Time-Based', icon: 'clock', description: 'Perfect for your available time' },
    { key: 'category', label: 'Category Focus', icon: 'th-large', description: 'Explore specific areas' },
    { key: 'random', label: 'Surprise Me', icon: 'dice', description: 'Random discoveries' }
  ]

  const categories = [
    { key: 'all', label: 'All', icon: 'th-large' },
    ...Object.entries(challengeCategories).map(([key, category]) => ({
      key,
      label: category.name,
      icon: category.icon
    }))
  ]

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Discover Challenges</h1>
          <p className="text-gray-500 mt-1">Find the perfect challenge for your time and mood</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/challenges')}
        >
          <i className="fas fa-th-large mr-2"></i>
          Browse All
        </button>
      </div>

      {/* Discovery Mode Selection */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Discovery Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {discoveryModes.map((mode) => (
            <div
              key={mode.key}
              className={`quick-action ${discoveryMode === mode.key ? 'ring-2 ring-primary-500' : ''}`}
              onClick={() => setDiscoveryMode(mode.key)}
            >
              <div 
                className="quick-action-icon"
                style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))' }}
              >
                <i className={`fas fa-${mode.icon}`}></i>
              </div>
              <h3 className="quick-action-title">{mode.label}</h3>
              <p className="quick-action-description">{mode.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4">Customize Your Discovery</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Available Time</label>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-gray-500">1 min</span>
              <input
                type="range"
                className="range-slider flex-1"
                min="1"
                max="15"
                value={selectedTime}
                onChange={handleTimeChange}
              />
              <span className="text-sm text-gray-500">15 min</span>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-primary-500">{selectedTime}</span>
              <span className="text-gray-500 ml-1">minute{selectedTime !== 1 ? 's' : ''}</span>
            </div>
          </div>
          
          <div>
            <label className="form-label">Category Focus</label>
            <div className="category-chips">
              {categories.map((category) => (
                <div
                  key={category.key}
                  className={`category-chip ${selectedCategory === category.key ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(category.key)}
                >
                  <i className={`fas fa-${category.icon}`}></i>
                  <span>{category.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {discoveryModes.find(m => m.key === discoveryMode)?.label}
        </h2>
        <button 
          className="btn btn-secondary btn-sm"
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-sync-alt mr-2"></i>
          Refresh
        </button>
      </div>

      {suggestions.length > 0 ? (
        <div className="challenge-grid">
          {suggestions.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={handleChallengeClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="fas fa-compass text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No suggestions found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your time or category preferences</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setDiscoveryMode('smart')
              actions.setSelectedCategory('all')
            }}
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Discover