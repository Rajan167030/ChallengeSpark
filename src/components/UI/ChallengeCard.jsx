import React from 'react'
import { challengeCategories } from '../../data/challenges'

function ChallengeCard({ challenge, onClick, compact = false }) {
  const category = challengeCategories[challenge.category]

  const renderDifficulty = (level) => {
    return (
      <div className="difficulty-stars">
        {[1, 2, 3].map((star) => (
          <i
            key={star}
            className={`fas fa-star difficulty-star ${star <= level ? 'filled' : 'empty'}`}
          />
        ))}
      </div>
    )
  }

  if (compact) {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
           onClick={() => onClick && onClick(challenge)}>
        <div className={`challenge-icon ${challenge.category} w-10 h-10 text-sm`}>
          <i className={`fas fa-${category.icon}`}></i>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{challenge.title}</h3>
          <p className="text-xs text-gray-500">{challenge.description}</p>
        </div>
        <div className="text-right">
          <div className="time-badge text-xs">{challenge.duration} min</div>
          <div className="mt-1">{renderDifficulty(challenge.difficulty)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="challenge-card" onClick={() => onClick && onClick(challenge)}>
      <div className="challenge-header">
        <div className={`challenge-icon ${challenge.category}`}>
          <i className={`fas fa-${category.icon}`}></i>
        </div>
        <div className="challenge-info">
          <h3 className="challenge-title">{challenge.title}</h3>
          <p className="challenge-description">{challenge.description}</p>
          
          <div className="challenge-meta">
            <div className="flex items-center gap-2">
              <span className="time-badge">{challenge.duration} min</span>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-gray-500 capitalize">{category.name}</span>
            </div>
            {renderDifficulty(challenge.difficulty)}
          </div>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
        <button className="btn btn-primary btn-sm w-full">
          <i className="fas fa-play mr-2"></i>
          Start Challenge
        </button>
      </div>
    </div>
  )
}

export default ChallengeCard