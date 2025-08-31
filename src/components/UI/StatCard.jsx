import React from 'react'

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'primary', 
  change, 
  changeType,
  progress 
}) {
  const getIconBackground = () => {
    const colors = {
      primary: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))',
      success: 'linear-gradient(135deg, var(--success-color), #059669)',
      warning: 'linear-gradient(135deg, var(--warning-color), #d97706)',
      creativity: 'linear-gradient(135deg, var(--creativity-color), #0891b2)',
      physical: 'linear-gradient(135deg, var(--physical-color), #dc2626)',
      mindfulness: 'linear-gradient(135deg, var(--mindfulness-color), #7c3aed)'
    }
    return colors[color] || colors.primary
  }

  return (
    <div className="stat-card">
      <div className="stat-header">
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">{title}</h3>
          <p className="stat-value">{value}</p>
          {subtitle && <p className="stat-label">{subtitle}</p>}
        </div>
        <div 
          className="stat-icon"
          style={{ background: getIconBackground() }}
        >
          <i className={`fas fa-${icon}`}></i>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                background: getIconBackground()
              }}
            />
          </div>
        </div>
      )}
      
      {change && (
        <div className={`stat-change ${changeType}`}>
          <i className={`fas fa-${changeType === 'positive' ? 'arrow-up' : 'arrow-down'} mr-1`}></i>
          {change}
        </div>
      )}
    </div>
  )
}

export default StatCard