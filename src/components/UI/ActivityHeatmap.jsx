import React from 'react'

function ActivityHeatmap({ data }) {
  const getTooltipText = (day) => {
    const date = new Date(day.date)
    const formattedDate = date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
    return `${formattedDate}: ${day.challenges} challenge${day.challenges !== 1 ? 's' : ''}`
  }

  const weekdays = ['Mon', 'Wed', 'Fri', 'Sun']
  const months = []
  
  // Generate month labels
  for (let i = 0; i < data.length; i += 7) {
    const date = new Date(data[i].date)
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    months.push({ index: i, month })
  }

  return (
    <div className="heatmap-container">
      <div className="flex justify-between text-xs text-gray-500 mb-2">
        {months.slice(0, 4).map((month, index) => (
          <span key={index}>{month.month}</span>
        ))}
      </div>
      
      <div className="flex gap-1 mb-2">
        <div className="flex flex-col gap-1 text-xs text-gray-500 mr-2">
          {weekdays.map((day, index) => (
            <div key={day} className="h-3 flex items-center">
              {index % 2 === 0 && <span>{day}</span>}
            </div>
          ))}
        </div>
        
        <div className="heatmap-grid">
          {data.map((day, index) => (
            <div
              key={index}
              className={`heatmap-day level-${day.level}`}
              title={getTooltipText(day)}
            />
          ))}
        </div>
      </div>
      
      <div className="heatmap-legend">
        <span>Less</span>
        <div className="heatmap-legend-scale">
          {[0, 1, 2, 3, 4].map(level => (
            <div
              key={level}
              className={`heatmap-legend-item level-${level}`}
            />
          ))}
        </div>
        <span>More</span>
      </div>
    </div>
  )
}

export default ActivityHeatmap