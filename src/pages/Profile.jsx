import React from 'react'
import { useApp } from '../context/AppContext'
import { challengeCategories } from '../data/challenges'

function Profile() {
  const { state, actions } = useApp()
  const { user, preferences } = state

  const handleCategoryToggle = (category) => {
    actions.toggleCategoryPreference(category)
  }

  const handlePreferenceChange = (key, value) => {
    actions.updatePreferences({ [key]: value })
  }

  const handleToggleSwitch = (key) => {
    actions.updatePreferences({ [key]: !preferences[key] })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Profile & Settings</h1>
      
      {/* Profile Section */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <i className="fas fa-user text-gray-400 text-2xl"></i>
        </div>
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <button className="text-blue-500 text-sm mt-1">
            <i className="fas fa-edit mr-1"></i> Edit Profile
          </button>
        </div>
      </div>
      
      {/* Preferences Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Your Preferences</h2>
        
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="font-medium mb-3">Challenge Categories</h3>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(challengeCategories).map(([key, category]) => (
              <div
                key={key}
                className={`preference-chip ${preferences.categories[key] ? `active ${key}` : ''}`}
                onClick={() => handleCategoryToggle(key)}
              >
                <i className={`fas fa-${category.icon}`}></i>
                <span>{category.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <h3 className="font-medium mb-2">Time Preferences</h3>
          <div className="flex items-center justify-between mb-2">
            <span>Default duration</span>
            <div className="flex items-center gap-2">
              <select 
                className="bg-gray-100 rounded-md py-1 px-2"
                value={preferences.defaultDuration}
                onChange={(e) => handlePreferenceChange('defaultDuration', parseInt(e.target.value))}
              >
                <option value={3}>3 minutes</option>
                <option value={5}>5 minutes</option>
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span>Daily reminder</span>
            <div className="flex items-center gap-2">
              <select 
                className="bg-gray-100 rounded-md py-1 px-2"
                value={preferences.reminderTime}
                onChange={(e) => handlePreferenceChange('reminderTime', e.target.value)}
              >
                <option value="9:00 AM">9:00 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="5:00 PM">5:00 PM</option>
              </select>
              <div 
                className={`toggle-switch ${preferences.reminderEnabled ? 'active' : ''}`}
                onClick={() => handleToggleSwitch('reminderEnabled')}
              >
                <div className="toggle-knob"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-medium mb-2">Challenge Difficulty</h3>
          <div className="difficulty-slider">
            <div className="flex justify-between text-sm text-gray-500 mb-1">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="3" 
              value={preferences.difficulty}
              onChange={(e) => handlePreferenceChange('difficulty', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
      
      {/* Settings Menu */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <ul className="settings-menu">
          <li className="settings-item">
            <div className="settings-icon">
              <i className="fas fa-bell"></i>
            </div>
            <div className="settings-item-text">Notifications</div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </li>
          <li className="settings-item">
            <div className="settings-icon">
              <i className="fas fa-user-friends"></i>
            </div>
            <div className="settings-item-text">Connected Accounts</div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </li>
          <li className="settings-item">
            <div className="settings-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div className="settings-item-text">Privacy Settings</div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </li>
          <li className="settings-item">
            <div className="settings-icon">
              <i className="fas fa-question-circle"></i>
            </div>
            <div className="settings-item-text">Help & Support</div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </li>
          <li className="settings-item">
            <div className="settings-icon">
              <i className="fas fa-info-circle"></i>
            </div>
            <div className="settings-item-text">About MicroSpark</div>
            <i className="fas fa-chevron-right text-gray-400"></i>
          </li>
          <li className="settings-item">
            <div className="settings-icon text-red-500">
              <i className="fas fa-sign-out-alt"></i>
            </div>
            <div className="settings-item-text text-red-500">Log Out</div>
          </li>
        </ul>
      </div>
      
      <div className="text-center text-xs text-gray-400">
        <p>MicroSpark v1.0.1</p>
        <p>© 2023 MicroSpark Inc.</p>
      </div>
    </div>
  )
}

export default Profile