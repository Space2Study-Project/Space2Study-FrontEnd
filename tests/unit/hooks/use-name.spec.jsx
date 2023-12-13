import { vi } from 'vitest'
import { act, renderHook } from '@testing-library/react-hooks'
import useName from '~/hooks/use-name'

vi.mock('~/context/snackbar-context', () => ({
  useSnackBarContext: vi.fn(() => ({ setAlert: vi.fn() }))
}))

vi.mock('~/services/user-service', () => ({
  userService: {
    getUserById: vi.fn(() =>
      Promise.resolve({ data: { firstName: 'John', lastName: 'Doe' } })
    )
  }
}))

describe('useName hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('should handle errors during data fetching', async () => {
    vi.mock('~/services/user-service', () => ({
      userService: {
        getUserById: vi.fn(() =>
          Promise.reject(new Error('Error fetching user data'))
        )
      }
    }))

    const { result, waitForNextUpdate } = renderHook(() => useName())

    waitForNextUpdate()

    expect(result.current.name).toBe('')
    expect(result.current.lastName).toBe('')
  })

  it('should fetch user data for a logged-in user', async () => {
    const tokenPayload = {
      id: 'user123',
      role: 'user'
    }
    const token = `fakeToken.${btoa(JSON.stringify(tokenPayload))}`
    localStorage.setItem('s2s', token)

    let result
    await act(async () => {
      ;({ result } = renderHook(() => useName()))
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    expect(result.current.name).toBe('John')
    expect(result.current.lastName).toBe('Doe')
  })
})
