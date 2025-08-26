import React from 'react'

function ToggleButton({ 
  children, 
  active = false, 
  onClick, 
  icon = null,
  className = '' 
}) {
  return (
    <button
      className={`toggle-btn ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
    >
      {icon && <i className={`fas fa-${icon} mr-1`}></i>}
      {children}
    </button>
  )
}

export default ToggleButton