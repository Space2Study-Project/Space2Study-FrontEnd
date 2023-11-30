import { screen, render } from '@testing-library/react'
import GeneralInfoStep from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep'

describe('GeneralInfoStep', () => {
  it('should render container component', () => {
    render(<GeneralInfoStep />)
    const container = screen.getByText('GeneralInfo step')
    expect(container).toBeInTheDocument()
  })

  it('should check the btn, passed in props, is in the document', () => {
    const mockBtnsBox = <div data-testid='btn'>MockBtnsBox</div>
    render(<GeneralInfoStep btnsBox={mockBtnsBox} />)
    const btn = screen.getByTestId('btn')
    expect(btn).toBeInTheDocument()
  })
})
