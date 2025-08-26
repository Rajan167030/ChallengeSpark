import React from 'react'
import StatusBar from './StatusBar'
import NavigationBar from './NavigationBar'

function AppLayout({ children, fullScreen = false }) {
  return (
    <>
      <StatusBar />
      <div className={`app-container ${fullScreen ? 'full-screen' : ''}`}>
        {children}
      </div>
      {!fullScreen && <NavigationBar />}
    </>
  )
}

export default AppLayout