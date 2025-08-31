import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { getRandomChallenges, challengeCategories } from '../data/challenges'
import StatCard from '../components/UI/StatCard'
import ChallengeCard from '../components/UI/ChallengeCard'
import ActivityChart from '../components/UI/ActivityChart'

function Dashboard() {
  const navigate = useNavigate()
  const { state, actions } = useApp()
  const { user, achievements, recentActivity, weeklyStats } = state

  const handleChallengeClick = (challenge) => {
    actions.startChallenge(challenge)
    navigate(`/challenge/${challenge.id}`)
  }

  const handleQuickAction = (action) => {
    switch (action) {
      case 'quick-challenge':
        const quickChallenge = getRandomChallenges(1)[0]
        handleChallengeClick(quickChallenge)
        break
      case 'discover':
        navigate('/discover')
        break
      case 'achievements':
        navigate('/achievements')
        break
      case 'analytics':
        navigate('/analytics')
        break
    }
  }

  const recentChallenges = getRandomChallenges(4)
  const weeklyGoalProgress = (achievements.weeklyProgress / achievements.weeklyGoal) * 100

  return (
    <div className="fade-in">
      {/* Welcome Section */}
      <div className="dashboard-welcome">
        <div className="welcome-content">
          <h1 className="welcome-title">Welcome back, {user.name.split(' ')[0]}!</h1>
          <p className="welcome-subtitle">
            You're on a {user.streak}-day streak. Keep the momentum going!
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-grid">
        <StatCard
          title="Current Streak"
          value={user.streak}
          subtitle="days"
          icon="fire"
          color="success"
          change="+2 from last week"
          changeType="positive"
        />
        <StatCard
          title="Challenges Completed"
          value={user.completedChallenges}
          subtitle="total"
          icon="check-circle"
          color="primary"
          change="+5 this week"
          changeType="positive"
        />
        <StatCard
          title="Minutes Saved"
          value={user.minutesSaved}
          subtitle="lifetime"
          icon="clock"
          color="creativity"
          change="+18 this week"
          changeType="positive"
        />
        <StatCard
          title="Weekly Goal"
          value={`${achievements.weeklyProgress}/${achievements.weeklyGoal}`}
          subtitle={`${Math.round(weeklyGoalProgress)}% complete`}
          icon="target"
          color="warning"
          progress={weeklyGoalProgress}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Quick Actions</h2>
            </div>
            
            <div className="quick-actions">
              <div 
                className="quick-action"
                onClick={() => handleQuickAction('quick-challenge')}
              >
                <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))' }}>
                  <i className="fas fa-bolt"></i>
                </div>
                <h3 className="quick-action-title">Quick Challenge</h3>
                <p className="quick-action-description">Start a random 5-minute challenge</p>
              </div>
              
              <div 
                className="quick-action"
                onClick={() => handleQuickAction('discover')}
              >
                <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, var(--creativity-color), #0891b2)' }}>
                  <i className="fas fa-compass"></i>
                </div>
                <h3 className="quick-action-title">Discover</h3>
                <p className="quick-action-description">Find new challenges</p>
              </div>
              
              <div 
                className="quick-action"
                onClick={() => handleQuickAction('achievements')}
              >
                <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, var(--warning-color), #d97706)' }}>
                  <i className="fas fa-trophy"></i>
                </div>
                <h3 className="quick-action-title">Achievements</h3>
                <p className="quick-action-description">View your progress</p>
              </div>
              
              <div 
                className="quick-action"
                onClick={() => handleQuickAction('analytics')}
              >
                <div className="quick-action-icon" style={{ background: 'linear-gradient(135deg, var(--mindfulness-color), #7c3aed)' }}>
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3 className="quick-action-title">Analytics</h3>
                <p className="quick-action-description">Track your habits</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">This Week's Activity</h2>
              <span className="text-sm text-gray-500">Challenges completed per day</span>
            </div>
            <ActivityChart data={weeklyStats} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Recent Challenges */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recommended Challenges</h2>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => navigate('/discover')}
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3">
            {recentChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onClick={handleChallengeClick}
                compact
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Activity</h2>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm`}
                     style={{ background: `linear-gradient(135deg, var(--${activity.color}-color), var(--${activity.color}-color))` }}>
                  <i className={`fas fa-${activity.icon}`}></i>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard