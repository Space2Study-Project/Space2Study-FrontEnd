import { screen, render } from '@testing-library/react'
import Subjects from '~/pages/subjects/Subjects'

vi.mock('~/components/page-wrapper/PageWrapper', () => ({
  default: ({ children }) => <div data-testid='test-element'>{children}</div>
}))

describe('Subjects component', () => {
  it('should render page', () => {
    render(<Subjects />)
    const subjects = screen.getByTestId('test-element')
    expect(subjects).toBeInTheDocument()
  })

  it('should contain Text', () => {
    render(<Subjects />)
    const subjects = screen.getByText('Subjects')
    expect(subjects).toBeInTheDocument()
  })
})
