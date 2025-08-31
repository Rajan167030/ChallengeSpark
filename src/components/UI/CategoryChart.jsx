import React from 'react'

function CategoryChart({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="category-chart">
      {/* Progress Bar */}
      <div className="flex h-4 mb-4 rounded-lg overflow-hidden">
        {data.map((category, index) => (
          <div
            key={index}
            style={{
              width: `${(category.value / total) * 100}%`,
              backgroundColor: category.color
            }}
            title={`${category.name}: ${category.value}%`}
          />
        ))}
      </div>
      
      {/* Legend */}
      <div className="space-y-2">
        {data.map((category, index) => (
          <div key={index} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm">{category.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{category.value}%</span>
              <span className="text-xs text-gray-500">
                ({Math.round((category.value / 100) * total)} challenges)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryChart