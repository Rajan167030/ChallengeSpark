import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import AppLayout from './components/Layout/AppLayout'
import Onboarding from './pages/Onboarding'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Challenge from './pages/Challenge'
import Achievements from './pages/Achievements'
import Profile from './pages/Profile'

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="iphone-frame">
            <Routes>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="/home" element={
                <AppLayout>
                  <Home />
                </AppLayout>
              } />
              <Route path="/discover" element={
                <AppLayout>
                  <Discover />
                </AppLayout>
              } />
              <Route path="/challenge/:id" element={
                <AppLayout>
                  <Challenge />
                </AppLayout>
              } />
              <Route path="/achievements" element={
                <AppLayout>
                  <Achievements />
                </AppLayout>
              } />
              <Route path="/profile" element={
                <AppLayout>
                  <Profile />
                </AppLayout>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AppProvider>
  )
}

export default App