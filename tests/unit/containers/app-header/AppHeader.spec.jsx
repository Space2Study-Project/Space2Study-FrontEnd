import { render, screen } from '@testing-library/react'
import AppHeader from '~/containers/layout/app-header/AppHeader'

vi.mock('~/containers/layout/navbar/NavBar', () => ({
  __esModule: true,
  default: function () {
    return <div>NavBar</div>
  }
}))

describe('Checking AppHeader for rendering Toolbar', () => {
  it('should render toolbaer component', () => {
    const mainWithFooter = 'prop'

    render(<AppHeader mainWithFooter={mainWithFooter} />)

    const toolbar = screen.getByTestId('toolbar')
    expect(toolbar).toBeInTheDocument()
  })
})
