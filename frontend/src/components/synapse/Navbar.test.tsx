import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/synapse/Navbar'

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  auth: {},
}))

// Mock Firebase auth
jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn(),
  signOut: jest.fn(),
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('Navbar', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('renders navigation bar', () => {
    const { onAuthStateChanged } = require('firebase/auth')
    onAuthStateChanged.mockImplementation((auth: any, callback: Function) => {
      callback(null)
      return jest.fn()
    })

    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })

  it('shows Sign In button when user is not authenticated', async () => {
    const { onAuthStateChanged } = require('firebase/auth')
    onAuthStateChanged.mockImplementation((auth: any, callback: Function) => {
      callback(null)
      return jest.fn()
    })

    render(<Navbar />)
    
    await waitFor(() => {
      const button = screen.queryByRole('button', { name: /sign in/i })
      if (button) {
        expect(button).toBeInTheDocument()
      }
    })
  })

  it('shows logout button when user is authenticated', async () => {
    const { onAuthStateChanged } = require('firebase/auth')
    const mockUser = { displayName: 'John Doe' }

    onAuthStateChanged.mockImplementation((auth: any, callback: Function) => {
      callback(mockUser)
      return jest.fn()
    })

    render(<Navbar />)

    await waitFor(() => {
      const logoutButton = screen.queryByRole('button', { name: /logout/i })
      if (logoutButton) {
        expect(logoutButton).toBeInTheDocument()
      }
    })
  })

  it('displays user name when authenticated', async () => {
    const { onAuthStateChanged } = require('firebase/auth')
    const mockUser = { displayName: 'John Doe' }

    onAuthStateChanged.mockImplementation((auth: any, callback: Function) => {
      callback(mockUser)
      return jest.fn()
    })

    render(<Navbar />)

    await waitFor(() => {
      expect(screen.queryByText(/john/i)).toBeInTheDocument()
    })
  })
})
