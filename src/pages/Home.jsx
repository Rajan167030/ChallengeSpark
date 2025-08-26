import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { challengeCategories, getRandomChallenges } from '../data/challenges'
import ChallengeCard from '../components/UI/ChallengeCard'
import ToggleButton from '../components/UI/ToggleButton'

function Home() {
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const { selectedTime, selectedCategory, user } = state

  const handleTimeChange = (e) => {
    actions.setSelectedTime(parseInt(e.target.value))
  }

  const handleCategoryChange = (category) => {
    actions.setSelectedCategory(category)
  }

  const handleFindChallenges = () => {
    navigate('/discover')
  }

  const handleChallengeClick = (challenge) => {
    actions.startChallenge(challenge)
    navigate(`/challenge/${challenge.id}`)
  }

  const recentChallenges = getRandomChallenges(3, 'all')

  const categories = [
    { key: 'all', label: 'All', icon: null },
    ...Object.entries(challengeCategories).map(([key, category]) => ({
      key,
      label: category.name,
      icon: category.icon
    }))
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hello, {user.name.split(' ')[0]}</h1>
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <i className="fas fa-user text-gray-500"></i>
        </div>
      </div>
      
      <div className="time-selector mb-6">
        <h2 className="section-title">How much time do you have?</h2>
        <div className="flex items-center gap-4 mb-4">
          <span className="text-gray-500">1 min</span>
          <input 
            type="range" 
            className="w-full h-2 bg-gray-200 rounded-md appearance-none cursor-pointer" 
            min="1" 
            max="15" 
            value={selectedTime}
            onChange={handleTimeChange}
          />
          <span className="text-gray-500">15 min</span>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">{selectedTime} min</span>
          </div>
          <button className="btn btn-primary" onClick={handleFindChallenges}>
            <i className="fas fa-bolt mr-2"></i> Find Challenges
          </button>
        </div>
      </div>
      
      {/* Category filters */}
      <div className="toggle-container mb-4">
        {categories.map((category) => (
          <ToggleButton
            key={category.key}
            active={selectedCategory === category.key}
            onClick={() => handleCategoryChange(category.key)}
            icon={category.icon}
          >
            {category.label}
          </ToggleButton>
        ))}
      </div>
      
      {/* Your Streak */}
      <div className="bg-white rounded-2xl p-4 mb-6 shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="font-semibold text-lg">Your Streak</h2>
          <span className="text-gray-500 text-sm">View all</span>
        </div>
        <div className="flex justify-between">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500">{user.streak}</div>
            <div className="text-xs text-gray-500">Day Streak</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500">{user.completedChallenges}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500">{user.minutesSaved}</div>
            <div className="text-xs text-gray-500">Minutes Saved</div>
          </div>
        </div>
      </div>
      
      {/* Recent Challenges */}
      <h2 className="section-title mb-4">Recent Challenges</h2>
      
      {recentChallenges.map((challenge) => (
        <ChallengeCard
          key={challenge.id}
          challenge={challenge}
          onClick={handleChallengeClick}
        />
      ))}
    </div>
  )
}

export default Home