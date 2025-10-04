import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { challenges, challengeCategories, getChallengesByCategory } from '../data/challenges'
import ChallengeCard from '../components/UI/ChallengeCard'
import ToggleButton from '../components/UI/ToggleButton'

function Challenges() {
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const { selectedCategory, selectedTime } = state
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('duration')

  const handleChallengeClick = (challenge) => {
    actions.startChallenge(challenge)
    navigate(`/challenge/${challenge.id}`)
  }

  const handleCategoryChange = (category) => {
    actions.setSelectedCategory(category)
  }

  const handleTimeChange = (e) => {
    actions.setSelectedTime(parseInt(e.target.value))
  }

  // Filter and sort challenges
  let filteredChallenges = getChallengesByCategory(selectedCategory)
  
  if (searchTerm) {
    filteredChallenges = filteredChallenges.filter(challenge =>
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Sort challenges
  filteredChallenges.sort((a, b) => {
    switch (sortBy) {
      case 'duration':
        return a.duration - b.duration
      case 'difficulty':
        return a.difficulty - b.difficulty
      case 'title':
        return a.title.localeCompare(b.title)
      default:
        return 0
    }
  })

  const categories = [
    { key: 'all', label: 'All Categories', icon: 'th-large' },
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
          <h1 className="text-3xl font-bold">Challenge Library</h1>
          <p className="text-gray-500 mt-1">Discover and start new challenges</p>
        </div>
        <div className="flex gap-3">
          <button className="btn btn-secondary">
            <i className="fas fa-filter mr-2"></i>
            Filters
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/discover')}
          >
            <i className="fas fa-magic mr-2"></i>
            Smart Discover
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="form-group">
            <label className="form-label">Search Challenges</label>
            <div className="relative">
              <input
                type="text"
                className="form-input pl-10"
                placeholder="Search by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Duration (minutes)</label>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">1</span>
              <input
                type="range"
                className="range-slider flex-1"
                min="1"
                max="15"
                value={selectedTime}
                onChange={handleTimeChange}
              />
              <span className="text-sm text-gray-500">15</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-lg font-semibold">{selectedTime} min</span>
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label">Sort By</label>
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="duration">Duration</option>
              <option value="difficulty">Difficulty</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filters */}
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

      {/* Challenge Results */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">
          {filteredChallenges.length} Challenge{filteredChallenges.length !== 1 ? 's' : ''} Found
        </h2>
        <div className="text-sm text-gray-500">
          {selectedCategory !== 'all' && `${challengeCategories[selectedCategory]?.name} • `}
          {selectedTime} minute{selectedTime !== 1 ? 's' : ''}
        </div>
      </div>

      {filteredChallenges.length > 0 ? (
        <div className="challenge-grid">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onClick={handleChallengeClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No challenges found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setSearchTerm('')
              actions.setSelectedCategory('all')
            }}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default Challenges