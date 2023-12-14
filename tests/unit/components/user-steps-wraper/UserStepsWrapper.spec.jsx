import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import UserStepsWrapper from '~/components/user-steps-wrapper/UserStepsWrapper'

const mockDispatch = vi.fn()
const mockSelector = vi.fn()

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux')
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: () => mockSelector
  }
})
describe('UserStepsWrapper Component', () => {
  it('renders UserStepsWrapper component', () => {
    render(<UserStepsWrapper userRole='student' />)
    expect(screen.getByTestId('nameInputs')).toBeInTheDocument()
  })
})
