import React, { createContext, useContext, useReducer, useEffect } from 'react'

const AppContext = createContext()

const initialState = {
  user: {
    name: 'Alex Johnson',
    email: 'alex.johnson@example.com',
    streak: 7,
    completedChallenges: 23,
    minutesSaved: 124,
    badges: 12
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
    difficulty: 2
  },
  currentChallenge: null,
  selectedTime: 5,
  selectedCategory: 'all',
  achievements: {
    totalMinutes: 124,
    totalChallenges: 23,
    currentStreak: 7,
    totalBadges: 12,
    unlockedBadges: [
      { id: 'first-spark', name: 'First Spark', icon: 'bolt', color: 'primary' },
      { id: 'week-streak', name: 'Week Streak', icon: 'calendar-check', color: 'success' },
      { id: 'mindful-1', name: 'Mindful I', icon: 'brain', color: 'mindfulness' },
      { id: 'active-1', name: 'Active I', icon: 'running', color: 'physical' }
    ],
    lockedBadges: [
      { id: '10-day-streak', name: '10-Day Streak', icon: 'lock' },
      { id: 'learning-3', name: 'Learning III', icon: 'lock' },
      { id: 'creative-2', name: 'Creative II', icon: 'lock' },
      { id: 'expert', name: 'Expert', icon: 'lock' }
    ]
  },
  activityData: generateActivityData()
}

function generateActivityData() {
  const data = []
  const today = new Date()
  
  for (let i = 27; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    
    const challenges = Math.floor(Math.random() * 5) // 0-4 challenges per day
    data.push({
      date: date.toISOString().split('T')[0],
      challenges,
      level: challenges === 0 ? 0 : Math.min(challenges, 4)
    })
  }
  
  return data
}

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_SELECTED_TIME':
      return { ...state, selectedTime: action.payload }
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload }
    
    case 'START_CHALLENGE':
      return { ...state, currentChallenge: action.payload }
    
    case 'COMPLETE_CHALLENGE':
      return {
        ...state,
        currentChallenge: null,
        user: {
          ...state.user,
          completedChallenges: state.user.completedChallenges + 1,
          minutesSaved: state.user.minutesSaved + action.payload.duration
        },
        achievements: {
          ...state.achievements,
          totalChallenges: state.achievements.totalChallenges + 1,
          totalMinutes: state.achievements.totalMinutes + action.payload.duration
        }
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
    const savedState = localStorage.getItem('microspark-state')
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState)
        // Merge with initial state to ensure all properties exist
        Object.keys(parsedState).forEach(key => {
          if (parsedState[key] && typeof parsedState[key] === 'object') {
            dispatch({ type: 'UPDATE_' + key.toUpperCase(), payload: parsedState[key] })
          }
        })
      } catch (error) {
        console.error('Error loading saved state:', error)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('microspark-state', JSON.stringify(state))
  }, [state])

  const value = {
    state,
    dispatch,
    actions: {
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