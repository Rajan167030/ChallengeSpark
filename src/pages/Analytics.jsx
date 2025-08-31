import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { challengeCategories } from '../data/challenges'
import StatCard from '../components/UI/StatCard'
import ActivityHeatmap from '../components/UI/ActivityHeatmap'
import CategoryChart from '../components/UI/CategoryChart'

function Analytics() {
  const { state } = useApp()
  const { achievements, activityData, weeklyStats } = state
  const [timeRange, setTimeRange] = useState('week')

  const categoryDistribution = [
    { name: 'Mindfulness', value: 35, color: 'var(--mindfulness-color)' },
    { name: 'Physical', value: 25, color: 'var(--physical-color)' },
    { name: 'Learning', value: 20, color: 'var(--learning-color)' },
    { name: 'Creativity', value: 15, color: 'var(--creativity-color)' },
    { name: 'Productivity', value: 5, color: 'var(--productivity-color)' }
  ]

  const timeRangeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ]

  const getInsights = () => {
    const totalDays = activityData.length
    const activeDays = activityData.filter(day => day.challenges > 0).length
    const consistency = Math.round((activeDays / totalDays) * 100)
    
    const avgChallengesPerDay = activityData.reduce((sum, day) => sum + day.challenges, 0) / totalDays
    const bestStreak = Math.max(...activityData.map(day => day.challenges))
    
    return {
      consistency,
      avgChallengesPerDay: avgChallengesPerDay.toFixed(1),
      bestStreak,
      activeDays
    }
  }

  const insights = getInsights()

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Insights</h1>
          <p className="text-gray-500 mt-1">Track your progress and discover patterns</p>
        </div>
        <div className="flex gap-3">
          <select
            className="form-select w-auto"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="btn btn-secondary">
            <i className="fas fa-download mr-2"></i>
            Export Data
          </button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="stats-grid">
        <StatCard
          title="Consistency Rate"
          value={`${insights.consistency}%`}
          subtitle="of days active"
          icon="calendar-check"
          color="success"
          change="Great consistency!"
          changeType="positive"
        />
        <StatCard
          title="Daily Average"
          value={insights.avgChallengesPerDay}
          subtitle="challenges per day"
          icon="chart-line"
          color="primary"
          change="+0.3 from last period"
          changeType="positive"
        />
        <StatCard
          title="Best Day"
          value={insights.bestStreak}
          subtitle="challenges in one day"
          icon="star"
          color="warning"
          change="Personal record!"
          changeType="positive"
        />
        <StatCard
          title="Active Days"
          value={insights.activeDays}
          subtitle={`out of ${activityData.length} days`}
          icon="fire"
          color="creativity"
          change="Keep it up!"
          changeType="positive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Heatmap */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Activity Heatmap</h2>
            <p className="card-subtitle">Last 12 weeks of activity</p>
          </div>
          <ActivityHeatmap data={activityData} />
        </div>

        {/* Category Distribution */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Challenge Categories</h2>
            <p className="card-subtitle">Your focus areas</p>
          </div>
          <CategoryChart data={categoryDistribution} />
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="card mt-6">
        <div className="card-header">
          <h2 className="card-title">Detailed Statistics</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(challengeCategories).map(([key, category]) => {
            const categoryCount = Math.floor(Math.random() * 15) + 3
            const categoryMinutes = categoryCount * 5
            
            return (
              <div key={key} className="text-center">
                <div 
                  className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-xl"
                  style={{ background: `linear-gradient(135deg, var(--${key}-color), var(--${key}-color))` }}
                >
                  <i className={`fas fa-${category.icon}`}></i>
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-2xl font-bold text-primary mt-1">{categoryCount}</p>
                <p className="text-sm text-gray-500">challenges • {categoryMinutes} min</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Analytics