export const goToTop = (element) => {
  element?.current?.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
