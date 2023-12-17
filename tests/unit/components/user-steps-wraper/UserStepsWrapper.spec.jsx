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
vi.mock('~/components/step-wrapper/StepWrapper', () => ({
  __esModule: true,
  default: ({ children }) => (
    <div data-testid='mocked-step-wrapper'>{children}</div>
  )
}))

vi.mock('~/redux/reducer', () => ({
  markFirstLoginComplete: vi.fn()
}))

vi.mock('~/context/step-context', () => ({
  StepProvider: ({ children }) => <div>{children}</div>
}))

vi.mock('~/containers/tutor-home-page/add-photo-step/AddPhotoStep', () => ({
  __esModule: true,
  default: () => <div data-testid='AddPhotoStep' />
}))
vi.mock(
  '~/containers/tutor-home-page/general-info-step/GeneralInfoStep',
  () => ({
    __esModule: true,
    default: () => <div data-testid='GeneralInfoStep' />
  })
)
vi.mock('~/containers/tutor-home-page/language-step/LanguageStep', () => ({
  __esModule: true,
  default: () => <div data-testid='LanguageStep' />
}))
vi.mock('~/containers/tutor-home-page/subjects-step/SubjectsStep', () => ({
  __esModule: true,
  default: () => <div data-testid='SubjectsStep' />
}))

describe('UserStepsWrapper Component', () => {
  it('renders UserStepsWrapper component', () => {
    render(<UserStepsWrapper userRole='student' />)

    expect(screen.getByTestId('GeneralInfoStep')).toBeInTheDocument()
  })
})
