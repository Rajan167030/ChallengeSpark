import React from 'react'
import { challengeCategories } from '../../data/challenges'

function ChallengeCard({ challenge, onClick }) {
  const category = challengeCategories[challenge.category]

  const renderDifficulty = (level) => {
    return (
      <div className="difficulty">
        {[1, 2, 3].map((dot) => (
          <i
            key={dot}
            className={`${dot <= level ? 'fas' : 'far'} fa-circle ${
              dot <= level ? 'text-blue-500' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="challenge-card" onClick={() => onClick && onClick(challenge)}>
      <div className={`challenge-icon ${challenge.category}`}>
        <i className={`fas fa-${category.icon}`}></i>
      </div>
      <div className="challenge-info">
        <h3 className="challenge-title">{challenge.title}</h3>
        <p className="challenge-description">{challenge.description}</p>
        <div className="challenge-meta">
          <span className="time-badge">{challenge.duration} min</span>
          {renderDifficulty(challenge.difficulty)}
        </div>
      </div>
    </div>
  )
}

export default ChallengeCard