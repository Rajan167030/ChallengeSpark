import React from 'react'

function StatCard({ value, label, color = 'primary' }) {
  return (
    <div className="stat-card">
      <div className={`stat-value text-${color}-500`}>{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default StatCard