import React, { useEffect } from 'react'
import { useNavigate } from '@tanstack/react-router'

// Replace with your actual user check
const isAuthenticated = () => {
  return localStorage.getItem('user') !== null
}

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: '/login' })
    }
  }, [navigate])

  // Return null while redirecting to avoid rendering children during navigation
  if (!isAuthenticated()) {
    return null
  }

  return <>{children}</> // Render the children if authenticated
}

export default ProtectedRoute
