import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: 'home', label: 'Dashboard' },
    { path: '/challenges', icon: 'bolt', label: 'Challenges' },
    { path: '/discover', icon: 'compass', label: 'Discover' },
    { path: '/achievements', icon: 'trophy', label: 'Achievements' },
    { path: '/analytics', icon: 'chart-line', label: 'Analytics' },
    { path: '/profile', icon: 'user-cog', label: 'Settings' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    if (onClose) onClose()
  }

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <a href="/dashboard" className="logo">
          <div className="logo-icon">
            <i className="fas fa-bolt"></i>
          </div>
          <span>MicroSpark</span>
        </a>
      </div>
      
      <nav>
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.path} className="nav-item">
              <a
                href="#"
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  handleNavClick(item.path)
                }}
              >
                <i className={`nav-icon fas fa-${item.icon}`}></i>
                <span>{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar