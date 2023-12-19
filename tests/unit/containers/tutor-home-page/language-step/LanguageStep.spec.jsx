// import { render, fireEvent, screen, waitFor } from '@testing-library/react'
// import { beforeEach, vi } from 'vitest'

// import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'

// vi.mock('react-i18next', () => ({
//   useTranslation: () => {
//     return {
//       t: (str) => str
//     }
//   }
// }))

// describe('LanguageStep Container', () => {
//   beforeEach(() => {
//     render(<LanguageStep btnsBox={<div data-testid='mockedBtnsBox' />} />)
//   })
//   afterEach(() => {
//     vi.restoreAllMocks()
//   })

//   it('displays the language category image', () => {
//     const languageImage = screen.getByAltText('language img')

//     expect(languageImage).toBeInTheDocument()
//     expect(languageImage).toHaveAttribute(
//       'src',
//       expect.stringContaining('languages.svg')
//     )
//   })

//   it('should render the container', () => {
//     const containerElement = screen.getByText(/becomeTutor.languages.title/i)
//     expect(containerElement).toBeInTheDocument()
//   })

//   it('should check if the buttons passed in props are in the document', () => {
//     const mockBtnsBox = (
//       <div>
//         <button data-testid='button-1'>Button 1</button>
//         <button data-testid='button-2'>Button 2</button>
//       </div>
//     )
//     render(<LanguageStep btnsBox={mockBtnsBox} />)
//     const button1Element = screen.getByTestId('button-1')
//     expect(button1Element).toBeInTheDocument()
//     const button2Element = screen.getByTestId('button-2')
//     expect(button2Element).toBeInTheDocument()
//   })

//   it('should render input box', () => {
//     const inputContainer = screen.getByTestId('inputContainer')
//     expect(inputContainer).toBeInTheDocument()
//   })

//   it('should render Autocomplete input', () => {
//     expect(
//       screen.getByLabelText(/becomeTutor.languages.autocompleteLabel/i)
//     ).toBeInTheDocument()
//   })

//   it('handles language change', () => {
//     fireEvent.click(
//       screen.getByLabelText(/becomeTutor.languages.autocompleteLabel/i)
//     )

//     waitFor(() => {
//       const languageName = screen.getByText('English')
//       expect(languageName).toBeInTheDocument()
//     })
//   })
// })
