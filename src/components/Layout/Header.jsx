import React from 'react'
import { useApp } from '../../context/AppContext'

function Header({ onMenuToggle }) {
  const { state, actions } = useApp()
  const { theme, user } = state

  const handleThemeToggle = () => {
    actions.toggleTheme()
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <header className="header">
      <div className="header-left">
        <button 
          className="menu-toggle lg:hidden"
          onClick={onMenuToggle}
        >
          <i className="fas fa-bars"></i>
        </button>
        <div>
          <h1>{getGreeting()}, {user.name.split(' ')[0]}!</h1>
          <p className="header-subtitle">Ready for your next challenge?</p>
        </div>
      </div>
      
      <div className="header-right">
        <button 
          className="theme-toggle"
          onClick={handleThemeToggle}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          <i className={`fas fa-${theme === 'light' ? 'moon' : 'sun'}`}></i>
        </button>
        
        <div className="user-menu">
          <div className="user-avatar">
            {user.avatar}
          </div>
          <div className="hidden md:block">
            <div className="text-sm font-medium">{user.name}</div>
            <div className="text-xs text-gray-500">{user.level}</div>
          </div>
          <i className="fas fa-chevron-down text-xs"></i>
        </div>
      </div>
    </header>
  )
}

export default Header