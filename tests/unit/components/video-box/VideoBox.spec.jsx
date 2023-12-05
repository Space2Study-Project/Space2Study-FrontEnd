import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import VideoBox from '~/components/video-box/VideoBox'

describe('VideoBox component', () => {
  it('renders the video component', () => {
    const videoUrl = '~/assets/img/guest-home-page/videoImg.png'
    render(<VideoBox video={videoUrl} />)
    const videoBoxElement = screen.getByTestId('videoBox')
    const videoElement = screen.getByAltText('Video')
    expect(videoBoxElement).toBeInTheDocument()
    expect(videoElement).toBeInTheDocument()
  })
})
