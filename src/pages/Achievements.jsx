import React from 'react'
import { useApp } from '../context/AppContext'
import StatCard from '../components/UI/StatCard'

function Achievements() {
  const { state } = useApp()
  const { achievements, activityData } = state

  const getHeatmapColor = (level) => {
    const colors = ['bg-gray-100', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400']
    return colors[level] || 'bg-gray-100'
  }

  const categoryDistribution = [
    { name: 'Mindfulness', percentage: 35, color: 'var(--mindfulness-color)' },
    { name: 'Physical', percentage: 25, color: 'var(--physical-color)' },
    { name: 'Learning', percentage: 20, color: 'var(--learning-color)' },
    { name: 'Creativity', percentage: 15, color: 'var(--creativity-color)' },
    { name: 'Productivity', percentage: 5, color: 'var(--productivity-color)' }
  ]

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Achievements</h1>
      
      {/* Stats Cards */}
      <div className="stats-container">
        <StatCard value={achievements.totalMinutes} label="Minutes Saved" />
        <StatCard value={achievements.totalChallenges} label="Challenges" />
        <StatCard value={achievements.currentStreak} label="Day Streak" />
        <StatCard value={achievements.totalBadges} label="Badges" />
      </div>
      
      {/* Activity Calendar */}
      <div className="heatmap">
        <h2 className="text-lg font-semibold mb-3">Activity Calendar</h2>
        <div className="mb-2 flex justify-between text-xs text-gray-500">
          <span>Mon</span>
          <span>Wed</span>
          <span>Fri</span>
          <span>Sun</span>
        </div>
        <div className="heatmap-grid">
          {activityData.map((day, index) => (
            <div
              key={index}
              className={`heatmap-day ${getHeatmapColor(day.level)}`}
              title={`${day.date}: ${day.challenges} challenge${day.challenges !== 1 ? 's' : ''}`}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs">
          <span className="text-gray-500">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-100 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-200 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-300 rounded-sm"></div>
            <div className="w-3 h-3 bg-blue-400 rounded-sm"></div>
          </div>
          <span className="text-gray-500">More</span>
        </div>
      </div>
      
      {/* Badges Section */}
      <h2 className="text-lg font-semibold mt-6 mb-3">Your Badges</h2>
      <div className="badge-grid">
        {/* Unlocked Badges */}
        {achievements.unlockedBadges.map((badge) => (
          <div key={badge.id} className="badge badge-unlocked">
            <div 
              className="badge-icon text-white"
              style={{ backgroundColor: `var(--${badge.color}-color)` }}
            >
              <i className={`fas fa-${badge.icon}`}></i>
            </div>
            <div className="badge-name">{badge.name}</div>
          </div>
        ))}
        
        {/* Locked Badges */}
        {achievements.lockedBadges.map((badge) => (
          <div key={badge.id} className="badge">
            <div className="badge-icon">
              <i className={`fas fa-${badge.icon} text-gray-400`}></i>
            </div>
            <div className="badge-name">{badge.name}</div>
          </div>
        ))}
      </div>
      
      {/* Challenge Category Distribution */}
      <div className="bg-white rounded-2xl p-4 my-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Challenge Distribution</h2>
        <div className="flex gap-1 h-6 mb-3 rounded-md overflow-hidden">
          {categoryDistribution.map((category, index) => (
            <div
              key={index}
              style={{
                width: `${category.percentage}%`,
                backgroundColor: category.color
              }}
            />
          ))}
        </div>
        <div className="text-sm">
          {categoryDistribution.map((category, index) => (
            <div key={index} className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-sm mr-2"
                  style={{ backgroundColor: category.color }}
                />
                <span>{category.name}</span>
              </div>
              <span className="font-medium">{category.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Achievements