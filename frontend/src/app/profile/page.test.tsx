import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useRouter } from 'next/navigation'
import ProfilePage from '@/app/profile/page'

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  auth: {
    onAuthStateChanged: jest.fn(),
  },
}))

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
  signOut: jest.fn(),
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('ProfilePage', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  const mockUser = {
    email: 'test@example.com',
    displayName: 'Test User',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    // Mock auth.onAuthStateChanged to return a mock user
    const { auth } = require('@/lib/firebase')
    auth.onAuthStateChanged.mockImplementation((callback: Function) => {
      callback(mockUser)
      return jest.fn() // Return unsubscribe function
    })
  })

  it('renders profile heading', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      const heading = screen.getByRole('heading', { name: /create your profile/i })
      expect(heading).toBeInTheDocument()
    })
  })

  it('displays full name input field', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      const input = screen.getByLabelText(/enter your full name/i)
      expect(input).toBeInTheDocument()
    })
  })

  it('populates name from user email', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
    })
  })

  it('shows error when submitting empty form', async () => {
    const { auth } = require('@/lib/firebase')
    auth.onAuthStateChanged.mockImplementation((callback: Function) => {
      callback({ email: 'test@example.com', displayName: '' })
      return jest.fn()
    })

    render(<ProfilePage />)
    await waitFor(() => {
      const button = screen.getByRole('button', { name: /complete profile/i })
      fireEvent.click(button)
    })

    await waitFor(() => {
      expect(screen.getByText(/please enter your name/i)).toBeInTheDocument()
    })
  })

  it('submits form with valid data', async () => {
    render(<ProfilePage />)

    await waitFor(() => {
      const input = screen.getByLabelText(/enter your full name/i)
      expect(input).toBeInTheDocument()
    })

    const button = screen.getByRole('button', { name: /complete profile/i })
    fireEvent.click(button)

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/chat')
    }, { timeout: 2000 })
  })

  it('renders logout button', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      const logoutButton = screen.getByRole('button', { name: /logout/i })
      expect(logoutButton).toBeInTheDocument()
    })
  })

  it('has proper accessibility attributes on form input', async () => {
    render(<ProfilePage />)
    await waitFor(() => {
      const input = screen.getByLabelText(/enter your full name/i)
      expect(input).toHaveAttribute('required')
      expect(input).toHaveAttribute('aria-required', 'true')
    })
  })
})
