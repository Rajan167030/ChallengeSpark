import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function NavigationBar() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/home', icon: 'home', label: 'Home' },
    { path: '/discover', icon: 'bolt', label: 'Discover' },
    { path: '/achievements', icon: 'trophy', label: 'Achievements' },
    { path: '/profile', icon: 'user', label: 'Profile' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
  }

  return (
    <div className="nav-bar">
      {navItems.map((item) => (
        <div
          key={item.path}
          className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          onClick={() => handleNavClick(item.path)}
        >
          <i className={`nav-icon fas fa-${item.icon}`}></i>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  )
}

export default NavigationBar