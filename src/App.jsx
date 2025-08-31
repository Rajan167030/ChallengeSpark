import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import DashboardLayout from './components/Layout/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Challenges from './pages/Challenges'
import Discover from './pages/Discover'
import Challenge from './pages/Challenge'
import Achievements from './pages/Achievements'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />
          <Route path="/challenges" element={
            <DashboardLayout>
              <Challenges />
            </DashboardLayout>
          } />
          <Route path="/discover" element={
            <DashboardLayout>
              <Discover />
            </DashboardLayout>
          } />
          <Route path="/challenge/:id" element={
            <DashboardLayout>
              <Challenge />
            </DashboardLayout>
          } />
          <Route path="/achievements" element={
            <DashboardLayout>
              <Achievements />
            </DashboardLayout>
          } />
          <Route path="/analytics" element={
            <DashboardLayout>
              <Analytics />
            </DashboardLayout>
          } />
          <Route path="/profile" element={
            <DashboardLayout>
              <Profile />
            </DashboardLayout>
          } />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App