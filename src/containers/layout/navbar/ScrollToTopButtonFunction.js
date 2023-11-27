export const scrollToTop = (element) => {
  element.current?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
