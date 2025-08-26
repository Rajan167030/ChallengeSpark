import React from 'react'
import { useNavigate } from 'react-router-dom'
import StatusBar from '../components/Layout/StatusBar'

function Onboarding() {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/home')
  }

  return (
    <>
      <StatusBar />
      <div className="app-container full-screen">
        <div className="flex flex-col items-center justify-center h-full p-4">
          <div className="w-20 h-20 bg-blue-500 rounded-2xl mb-6 flex items-center justify-center">
            <i className="fas fa-bolt text-white text-3xl"></i>
          </div>
          
          <h1 className="text-3xl font-bold mb-2 text-center">MicroSpark</h1>
          <p className="text-gray-500 mb-8 text-center">Make the most of your small moments</p>
          
          <div className="w-full max-w-md">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-4">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Time-Based Challenges</h3>
                <p className="text-gray-500 text-sm">Activities perfect for 1-15 minute breaks</p>
              </div>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white mr-4">
                <i className="fas fa-brain"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Personalized For You</h3>
                <p className="text-gray-500 text-sm">Suggestions based on your interests</p>
              </div>
            </div>
            
            <div className="flex items-center mb-10">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-4">
                <i className="fas fa-award"></i>
              </div>
              <div>
                <h3 className="font-semibold text-lg">Track Your Progress</h3>
                <p className="text-gray-500 text-sm">Build habits and earn achievements</p>
              </div>
            </div>
          </div>
          
          <button 
            className="btn btn-primary btn-full btn-rounded mb-4"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
          
          <p className="text-xs text-gray-400 text-center">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  )
}

export default Onboarding