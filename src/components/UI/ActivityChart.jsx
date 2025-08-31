import React from 'react'

function ActivityChart({ data }) {
  const maxChallenges = Math.max(...data.map(d => d.challenges))
  
  return (
    <div className="activity-chart">
      <div className="flex items-end justify-between h-48 gap-2">
        {data.map((day, index) => {
          const height = (day.challenges / maxChallenges) * 100
          
          return (
            <div key={index} className="flex flex-col items-center flex-1">
              <div 
                className="w-full bg-primary-500 rounded-t-md transition-all duration-300 hover:opacity-80 cursor-pointer relative group"
                style={{ 
                  height: `${Math.max(height, 5)}%`,
                  background: 'linear-gradient(135deg, var(--primary-color), var(--primary-dark))'
                }}
                title={`${day.day}: ${day.challenges} challenges, ${day.minutes} minutes`}
              >
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {day.challenges} challenges
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2">{day.day}</span>
            </div>
          )
        })}
      </div>
      
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>Weekly Activity</span>
        <span>{data.reduce((sum, day) => sum + day.challenges, 0)} total challenges</span>
      </div>
    </div>
  )
}

export default ActivityChart