import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { challengeCategories } from '../data/challenges'

function Profile() {
  const { state, actions } = useApp()
  const { user, preferences, theme } = state
  const [activeSection, setActiveSection] = useState('profile')

  const handleCategoryToggle = (category) => {
    actions.toggleCategoryPreference(category)
  }

  const handlePreferenceChange = (key, value) => {
    actions.updatePreferences({ [key]: value })
  }

  const handleToggleSwitch = (key) => {
    actions.updatePreferences({ [key]: !preferences[key] })
  }

  const handleProfileUpdate = (field, value) => {
    actions.updateUserProfile({ [field]: value })
  }

  const sections = [
    { key: 'profile', label: 'Profile', icon: 'user' },
    { key: 'preferences', label: 'Preferences', icon: 'cog' },
    { key: 'notifications', label: 'Notifications', icon: 'bell' },
    { key: 'privacy', label: 'Privacy', icon: 'shield-alt' },
    { key: 'account', label: 'Account', icon: 'user-cog' }
  ]

  return (
    <div className="fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Settings & Profile</h1>
          <p className="text-gray-500 mt-1">Manage your account and preferences</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="card">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.key}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.key
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveSection(section.key)}
                >
                  <i className={`fas fa-${section.icon} w-4`}></i>
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          {activeSection === 'profile' && (
            <div className="space-y-6">
              {/* Profile Info */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Profile Information</h2>
                </div>
                
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl font-bold">
                      {user.avatar}
                    </div>
                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-md border border-gray-200 dark:border-gray-600">
                      <i className="fas fa-camera text-xs"></i>
                    </button>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{user.name}</h3>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Member since {new Date(user.joinDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      className="form-input"
                      value={user.name}
                      onChange={(e) => handleProfileUpdate('name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      value={user.email}
                      onChange={(e) => handleProfileUpdate('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="stats-grid">
                <StatCard
                  title="Current Level"
                  value={user.level}
                  subtitle="skill level"
                  icon="star"
                  color="warning"
                />
                <StatCard
                  title="Join Date"
                  value={new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  subtitle="member since"
                  icon="calendar"
                  color="creativity"
                />
              </div>
            </div>
          )}

          {activeSection === 'preferences' && (
            <div className="space-y-6">
              {/* Challenge Preferences */}
              <div className="settings-section">
                <h2 className="text-lg font-semibold mb-4">Challenge Preferences</h2>
                
                <div className="settings-item">
                  <div className="settings-item-info">
                    <h3 className="settings-item-title">Preferred Categories</h3>
                    <p className="settings-item-description">Choose which types of challenges you enjoy</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
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

              {/* Time Preferences */}
              <div className="settings-section">
                <h2 className="text-lg font-semibold mb-4">Time Preferences</h2>
                
                <div className="settings-item">
                  <div className="settings-item-info">
                    <h3 className="settings-item-title">Default Duration</h3>
                    <p className="settings-item-description">Your preferred challenge length</p>
                  </div>
                  <select 
                    className="form-select w-auto"
                    value={preferences.defaultDuration}
                    onChange={(e) => handlePreferenceChange('defaultDuration', parseInt(e.target.value))}
                  >
                    <option value={3}>3 minutes</option>
                    <option value={5}>5 minutes</option>
                    <option value={10}>10 minutes</option>
                    <option value={15}>15 minutes</option>
                  </select>
                </div>
                
                <div className="settings-item">
                  <div className="settings-item-info">
                    <h3 className="settings-item-title">Auto-start Challenges</h3>
                    <p className="settings-item-description">Automatically start timer when opening challenges</p>
                  </div>
                  <div 
                    className={`toggle-switch ${preferences.autoStart ? 'active' : ''}`}
                    onClick={() => handleToggleSwitch('autoStart')}
                  >
                    <div className="toggle-knob"></div>
                  </div>
                </div>
              </div>

              {/* Difficulty Preferences */}
              <div className="settings-section">
                <h2 className="text-lg font-semibold mb-4">Challenge Difficulty</h2>
                
                <div className="settings-item">
                  <div className="settings-item-info">
                    <h3 className="settings-item-title">Preferred Difficulty</h3>
                    <p className="settings-item-description">Choose your challenge level</p>
                  </div>
                  <select 
                    className="form-select w-auto"
                    value={preferences.difficulty}
                    onChange={(e) => handlePreferenceChange('difficulty', parseInt(e.target.value))}
                  >
                    <option value={1}>Beginner</option>
                    <option value={2}>Intermediate</option>
                    <option value={3}>Advanced</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="settings-section">
              <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3 className="settings-item-title">Daily Reminders</h3>
                  <p className="settings-item-description">Get reminded to complete challenges</p>
                </div>
                <div 
                  className={`toggle-switch ${preferences.reminderEnabled ? 'active' : ''}`}
                  onClick={() => handleToggleSwitch('reminderEnabled')}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3 className="settings-item-title">Reminder Time</h3>
                  <p className="settings-item-description">When to send daily reminders</p>
                </div>
                <select 
                  className="form-select w-auto"
                  value={preferences.reminderTime}
                  onChange={(e) => handlePreferenceChange('reminderTime', e.target.value)}
                  disabled={!preferences.reminderEnabled}
                >
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="6:00 PM">6:00 PM</option>
                </select>
              </div>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3 className="settings-item-title">Sound Effects</h3>
                  <p className="settings-item-description">Play sounds for timers and completions</p>
                </div>
                <div 
                  className={`toggle-switch ${preferences.soundEnabled ? 'active' : ''}`}
                  onClick={() => handleToggleSwitch('soundEnabled')}
                >
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="settings-section">
              <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3 className="settings-item-title">Data Collection</h3>
                  <p className="settings-item-description">Allow anonymous usage analytics</p>
                </div>
                <div className="toggle-switch active">
                  <div className="toggle-knob"></div>
                </div>
              </div>
              
              <div className="settings-item">
                <div className="settings-item-info">
                  <h3 className="settings-item-title">Activity Sharing</h3>
                  <p className="settings-item-description">Share achievements with friends</p>
                </div>
                <div className="toggle-switch">
                  <div className="toggle-knob"></div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'account' && (
            <div className="space-y-6">
              <div className="settings-section">
                <h2 className="text-lg font-semibold mb-4">Account Management</h2>
                
                <div className="space-y-4">
                  <button className="btn btn-secondary w-full justify-start">
                    <i className="fas fa-key mr-3"></i>
                    Change Password
                  </button>
                  
                  <button className="btn btn-secondary w-full justify-start">
                    <i className="fas fa-download mr-3"></i>
                    Export Data
                  </button>
                  
                  <button className="btn btn-secondary w-full justify-start">
                    <i className="fas fa-trash-restore mr-3"></i>
                    Reset Progress
                  </button>
                </div>
              </div>
              
              <div className="settings-section">
                <h2 className="text-lg font-semibold mb-4 text-red-600">Danger Zone</h2>
                
                <div className="space-y-4">
                  <button className="btn btn-danger w-full justify-start">
                    <i className="fas fa-sign-out-alt mr-3"></i>
                    Sign Out
                  </button>
                  
                  <button className="btn btn-danger w-full justify-start">
                    <i className="fas fa-trash mr-3"></i>
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile