import { render } from '@testing-library/react'
import PageWrapper from '~/components/page-wrapper/PageWrapper'

describe('PageWrapper component', () => {
  it('renders children correctly', () => {
    const childText = 'Test Child'
    const { getByText } = render(
      <PageWrapper>
        <div>{childText}</div>
      </PageWrapper>
    )

    const childElement = getByText(childText)

    expect(childElement).toBeInTheDocument()
  })
})
