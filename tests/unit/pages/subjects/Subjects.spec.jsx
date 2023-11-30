import { screen, render } from '@testing-library/react'
import Subjects from '~/pages/subjects/Subjects'

describe('Subjects component', () => {
  beforeEach(() => {
    render(<Subjects />)
  })

  it('should contain Text', () => {
    const subjects = screen.getByText('Subjects')
    expect(subjects).toBeInTheDocument()
  })
})
