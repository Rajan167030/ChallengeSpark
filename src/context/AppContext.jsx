import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  theme: 'light',
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    avatar: 'AJ',
    streak: 12,
    completedChallenges: 47,
    minutesSaved: 285,
    badges: 18,
    level: 'Intermediate',
    joinDate: '2024-01-15'
  },
  preferences: {
    categories: {
      physical: true,
      mindfulness: true,
      learning: true,
      creativity: true,
      productivity: true,
      social: false
    },
    defaultDuration: 5,
    reminderTime: '9:00 AM',
    reminderEnabled: true,
    difficulty: 2,
    autoStart: false,
    soundEnabled: true
  },
  currentChallenge: null,
  selectedTime: 5,
  selectedCategory: 'all',
  achievements: {
    totalMinutes: 285,
    totalChallenges: 47,
    currentStreak: 12,
    longestStreak: 15,
    totalBadges: 18,
    weeklyGoal: 30,
    weeklyProgress: 18,
    unlockedBadges: [
      { id: 'first-spark', name: 'First Spark', icon: 'bolt', color: 'primary', description: 'Complete your first challenge' },
      { id: 'week-streak', name: 'Week Warrior', icon: 'calendar-check', color: 'success', description: '7-day streak achieved' },
      { id: 'mindful-master', name: 'Mindful Master', icon: 'brain', color: 'mindfulness', description: 'Complete 10 mindfulness challenges' },
      { id: 'active-achiever', name: 'Active Achiever', icon: 'running', color: 'physical', description: 'Complete 15 physical challenges' },
      { id: 'learning-legend', name: 'Learning Legend', icon: 'book', color: 'learning', description: 'Complete 12 learning challenges' },
      { id: 'creative-genius', name: 'Creative Genius', icon: 'lightbulb', color: 'creativity', description: 'Complete 8 creativity challenges' }
    ],
    lockedBadges: [
      { id: 'month-master', name: 'Month Master', icon: 'lock', description: '30-day streak' },
      { id: 'century-club', name: 'Century Club', icon: 'lock', description: '100 challenges completed' },
      { id: 'time-saver', name: 'Time Saver', icon: 'lock', description: 'Save 500 minutes' },
      { id: 'expert-level', name: 'Expert Level', icon: 'lock', description: 'Reach expert difficulty' }
    ]
  },
  activityData: generateActivityData(),
  recentActivity: generateRecentActivity(),
  weeklyStats: generateWeeklyStats()
}

function generateActivityData() {
  const data = []
  const today = new Date()
  
  for (let i = 83; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const challenges = Math.floor(Math.random() * 6)
    data.push({
      date: date.toISOString().split('T')[0],
      challenges,
      level: challenges === 0 ? 0 : Math.min(Math.ceil(challenges / 1.5), 4)
    })
  }
  
  return data
}

function generateRecentActivity() {
  const activities = [
    { type: 'challenge', title: 'Completed "Focus Breathing"', time: '2 hours ago', icon: 'brain', color: 'mindfulness' },
    { type: 'streak', title: 'Achieved 12-day streak!', time: '1 day ago', icon: 'fire', color: 'success' },
    { type: 'badge', title: 'Unlocked "Creative Genius" badge', time: '2 days ago', icon: 'award', color: 'creativity' },
    { type: 'challenge', title: 'Completed "Quick Desk Stretches"', time: '3 days ago', icon: 'running', color: 'physical' },
    { type: 'milestone', title: 'Reached 250 minutes saved!', time: '5 days ago', icon: 'clock', color: 'primary' }
  ]
  
  return activities
}

function generateWeeklyStats() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  return days.map(day => ({
    day,
    challenges: Math.floor(Math.random() * 8) + 1,
    minutes: Math.floor(Math.random() * 45) + 5
  }))
}

function appReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' }
    
    case 'SET_SELECTED_TIME':
      return { ...state, selectedTime: action.payload }
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    
    case 'START_CHALLENGE':
      return { ...state, currentChallenge: action.payload }
    
    case 'COMPLETE_CHALLENGE':
      const newStreak = state.user.streak + 1
      return {
        ...state,
        currentChallenge: null,
        user: {
          ...state.user,
          completedChallenges: state.user.completedChallenges + 1,
          minutesSaved: state.user.minutesSaved + action.payload.duration,
          streak: newStreak
        },
        achievements: {
          ...state.achievements,
          totalChallenges: state.achievements.totalChallenges + 1,
          totalMinutes: state.achievements.totalMinutes + action.payload.duration,
          currentStreak: newStreak,
          weeklyProgress: state.achievements.weeklyProgress + 1
        },
        recentActivity: [
          {
            type: 'challenge',
            title: `Completed "${action.payload.title}"`,
            time: 'Just now',
            icon: 'check-circle',
            color: 'success'
          },
          ...state.recentActivity.slice(0, 4)
        ]
      }
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      }
    
    case 'TOGGLE_CATEGORY_PREFERENCE':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          categories: {
            ...state.preferences.categories,
            [action.payload]: !state.preferences.categories[action.payload]
          }
        }
      }
    
    case 'UPDATE_USER_PROFILE':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      }
    
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('microspark-dashboard-state')
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        Object.keys(parsedState).forEach(key => {
          if (key === 'theme') {
            dispatch({ type: 'TOGGLE_THEME' })
          }
        })
      } catch (error) {
        console.error('Error loading saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('microspark-dashboard-state', JSON.stringify({
      theme: state.theme,
      preferences: state.preferences,
      user: state.user
    }))
  }, [state.theme, state.preferences, state.user])

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
  }, [state.theme])

  const value = {
    state,
    dispatch,
    actions: {
      toggleTheme: () => dispatch({ type: 'TOGGLE_THEME' }),
      setSelectedTime: (time) => dispatch({ type: 'SET_SELECTED_TIME', payload: time }),
      setSelectedCategory: (category) => dispatch({ type: 'SET_SELECTED_CATEGORY', payload: category }),
      startChallenge: (challenge) => dispatch({ type: 'START_CHALLENGE', payload: challenge }),
      completeChallenge: (challengeData) => dispatch({ type: 'COMPLETE_CHALLENGE', payload: challengeData }),
      updatePreferences: (preferences) => dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences }),
      toggleCategoryPreference: (category) => dispatch({ type: 'TOGGLE_CATEGORY_PREFERENCE', payload: category }),
      updateUserProfile: (userData) => dispatch({ type: 'UPDATE_USER_PROFILE', payload: userData })
    }
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}