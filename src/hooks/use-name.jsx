import { useState } from 'react'

const useName = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  return { name, setName, lastName, setLastName }
}

export default useName
