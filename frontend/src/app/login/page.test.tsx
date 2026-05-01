import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useRouter } from 'next/navigation'
import LoginPage from '@/app/login/page'

// Mock Firebase
jest.mock('@/lib/firebase', () => ({
  auth: {},
}))

// Mock Firebase auth functions
jest.mock('firebase/auth', () => ({
  GoogleAuthProvider: jest.fn(),
  signInWithPopup: jest.fn(),
}))

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

describe('LoginPage', () => {
  const mockRouter = {
    push: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('renders login heading', () => {
    render(<LoginPage />)
    const heading = screen.getByRole('heading', { name: /welcome to voteagent/i })
    expect(heading).toBeInTheDocument()
  })

  it('renders Google sign-in button', () => {
    render(<LoginPage />)
    const button = screen.getByRole('button', { name: /sign in with google/i })
    expect(button).toBeInTheDocument()
  })

  it('renders security and verification info cards', () => {
    render(<LoginPage />)
    expect(screen.getByText('Secure')).toBeInTheDocument()
    expect(screen.getByText('Verified')).toBeInTheDocument()
  })

  it('displays error message when login fails', async () => {
    const { signInWithPopup } = require('firebase/auth')
    signInWithPopup.mockRejectedValueOnce({
      code: 'auth/popup-closed-by-user',
    })

    render(<LoginPage />)
    const button = screen.getByRole('button', { name: /sign in with google/i })

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText(/login popup was closed/i)).toBeInTheDocument()
    })
  })

  it('has proper accessibility attributes', () => {
    render(<LoginPage />)
    const button = screen.getByRole('button', { name: /sign in with google/i })
    expect(button).toHaveAttribute('aria-label')
    expect(button).toHaveAttribute('aria-busy')
  })
})
