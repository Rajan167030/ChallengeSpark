import React from 'react'
import { challengeCategories } from '../../data/challenges'

function SuggestionCard({ challenge, onStart }) {
  const category = challengeCategories[challenge.category]

  const renderDifficulty = (level) => {
    return (
      <span>
        {[1, 2, 3].map((dot) => (
          <i
            key={dot}
            className={`${dot <= level ? 'fas' : 'far'} fa-circle text-xs ${
              dot <= level ? 'text-blue-500' : 'text-gray-300'
            }`}
          />
        ))}
      </span>
    )
  }

  return (
    <div className={`suggestion-card ${challenge.category}`}>
      <div className="card-header">
        <h2 className="card-title">{challenge.title}</h2>
        <span className="card-time">{challenge.duration} min</span>
      </div>
      <p className="card-description">{challenge.description}</p>
      <div className="card-footer">
        <div className="card-meta">
          <span>
            <i className={`fas fa-${category.icon}`}></i> {category.name}
          </span>
          {renderDifficulty(challenge.difficulty)}
        </div>
        <button 
          className="btn btn-primary start-challenge-btn"
          onClick={() => onStart && onStart(challenge)}
        >
          Start Now
        </button>
      </div>
    </div>
  )
}

export default SuggestionCard