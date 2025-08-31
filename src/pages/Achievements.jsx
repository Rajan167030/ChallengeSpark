import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { challengeCategories } from '../data/challenges'
import StatCard from '../components/UI/StatCard'
import ActivityHeatmap from '../components/UI/ActivityHeatmap'
import CategoryChart from '../components/UI/CategoryChart'

function Achievements() {
  const { state } = useApp()
  const { achievements, activityData, user } = state
  const [activeTab, setActiveTab] = useState('overview')

  const categoryDistribution = [
    { name: 'Mindfulness', value: 35, color: 'var(--mindfulness-color)' },
    { name: 'Physical', value: 25, color: 'var(--physical-color)' },
    { name: 'Learning', value: 20, color: 'var(--learning-color)' },
    { name: 'Creativity', value: 15, color: 'var(--creativity-color)' },
    { name: 'Productivity', value: 5, color: 'var(--productivity-color)' }
  ]

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'chart-pie' },
    { key: 'badges', label: 'Badges', icon: 'award' },
    { key: 'activity', label: 'Activity', icon: 'calendar' },
    { key: 'milestones', label: 'Milestones', icon: 'flag' }
  ]

  const milestones = [
    { title: 'First Challenge', description: 'Complete your first challenge', completed: true, date: '2024-01-15' },
    { title: '7-Day Streak', description: 'Maintain a 7-day streak', completed: true, date: '2024-01-22' },
    { title: '25 Challenges', description: 'Complete 25 challenges', completed: true, date: '2024-02-10' },
    { title: '100 Minutes', description: 'Save 100 minutes', completed: true, date: '2024-02-15' },
    { title: '30-Day Streak', description: 'Maintain a 30-day streak', completed: false, progress: 40 },
    { title: '100 Challenges', description: 'Complete 100 challenges', completed: false, progress: 47 },
    { title: '500 Minutes', description: 'Save 500 minutes', completed: false, progress: 57 }
  ]

  const getBadgeColor = (badge) => {
    if (badge.color === 'primary') return 'var(--primary-color)'
    if (badge.color === 'success') return 'var(--success-color)'
    return `var(--${badge.color}-color)`
  }

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Achievements & Progress</h1>
          <p className="text-gray-500 mt-1">Track your journey and celebrate milestones</p>
        </div>
        <button className="btn btn-secondary">
          <i className="fas fa-download mr-2"></i>
          Export Report
        </button>
      </div>

      {/* Achievement Tabs */}
      <div className="card mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              <i className={`fas fa-${tab.icon}`}></i>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Overview */}
          <div className="stats-grid mb-6">
            <StatCard
              title="Total Minutes"
              value={achievements.totalMinutes}
              subtitle="lifetime saved"
              icon="clock"
              color="creativity"
              change="+18 this week"
              changeType="positive"
            />
            <StatCard
              title="Total Challenges"
              value={achievements.totalChallenges}
              subtitle="completed"
              icon="check-circle"
              color="primary"
              change="+5 this week"
              changeType="positive"
            />
            <StatCard
              title="Current Streak"
              value={achievements.currentStreak}
              subtitle="days"
              icon="fire"
              color="success"
              change="Personal best!"
              changeType="positive"
            />
            <StatCard
              title="Badges Earned"
              value={achievements.totalBadges}
              subtitle="achievements unlocked"
              icon="award"
              color="warning"
              change="+2 this month"
              changeType="positive"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Activity Heatmap */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Activity Heatmap</h2>
                <p className="card-subtitle">Last 12 weeks</p>
              </div>
              <ActivityHeatmap data={activityData} />
            </div>

            {/* Category Distribution */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Challenge Distribution</h2>
                <p className="card-subtitle">Your focus areas</p>
              </div>
              <CategoryChart data={categoryDistribution} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'badges' && (
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Unlocked Badges */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Unlocked Badges</h2>
                <p className="card-subtitle">{achievements.unlockedBadges.length} earned</p>
              </div>
              
              <div className="badges-grid">
                {achievements.unlockedBadges.map((badge) => (
                  <div key={badge.id} className="badge unlocked">
                    <div 
                      className="badge-icon"
                      style={{ background: getBadgeColor(badge) }}
                    >
                      <i className={`fas fa-${badge.icon}`}></i>
                    </div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="text-xs text-gray-500 text-center mt-1">
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Locked Badges */}
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Upcoming Badges</h2>
                <p className="card-subtitle">{achievements.lockedBadges.length} to unlock</p>
              </div>
              
              <div className="badges-grid">
                {achievements.lockedBadges.map((badge) => (
                  <div key={badge.id} className="badge">
                    <div className="badge-icon">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="badge-name">{badge.name}</div>
                    <div className="text-xs text-gray-500 text-center mt-1">
                      {badge.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Activity History</h2>
            <p className="card-subtitle">Detailed view of your progress</p>
          </div>
          <ActivityHeatmap data={activityData} />
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-primary-500">
                {activityData.filter(day => day.challenges > 0).length}
              </div>
              <div className="text-sm text-gray-500">Active Days</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-success-500">
                {Math.round((activityData.filter(day => day.challenges > 0).length / activityData.length) * 100)}%
              </div>
              <div className="text-sm text-gray-500">Consistency</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-warning-500">
                {Math.max(...activityData.map(day => day.challenges))}
              </div>
              <div className="text-sm text-gray-500">Best Day</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Milestones</h2>
            <p className="card-subtitle">Your journey progress</p>
          </div>
          
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  milestone.completed 
                    ? 'bg-success-500 text-white' 
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                }`}>
                  <i className={`fas fa-${milestone.completed ? 'check' : 'lock'}`}></i>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold">{milestone.title}</h3>
                  <p className="text-sm text-gray-500">{milestone.description}</p>
                  {milestone.completed && milestone.date && (
                    <p className="text-xs text-success-500 mt-1">
                      Completed on {new Date(milestone.date).toLocaleDateString()}
                    </p>
                  )}
                  {!milestone.completed && milestone.progress && (
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{milestone.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="h-2 bg-primary-500 rounded-full transition-all duration-300"
                          style={{ width: `${milestone.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {milestone.completed && (
                  <div className="text-success-500">
                    <i className="fas fa-medal text-xl"></i>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Achievements