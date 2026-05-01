import { auth } from '@/lib/firebase'

describe('Firebase Configuration', () => {
  it('should export auth object', () => {
    expect(auth).toBeDefined()
  })

  it('should have app initialized', () => {
    expect(auth.app).toBeDefined()
  })

  it('should have correct config structure', () => {
    // Verify that required Firebase config is in place
    expect(process.env.NEXT_PUBLIC_FIREBASE_API_KEY).toBeDefined()
    expect(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN).toBeDefined()
    expect(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID).toBeDefined()
  })
})
