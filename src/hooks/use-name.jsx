import { useState, useEffect } from 'react'
import { userService } from '~/services/user-service'

const useName = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem('s2s')
        if (storedToken) {
          const [, payload] = storedToken.split('.')
          const decodedPayload = JSON.parse(atob(payload))
          const userId = decodedPayload.id
          const userRole = decodedPayload.role
          const response = await userService.getUserById(userId, userRole)
          const firstName = response.data.firstName
          setName(firstName)
          const surName = response.data.lastName
          setLastName(surName)
        }
      } catch (e) {
        console.log(`Error message: ${e.message}`)
      }
    }
    fetchUser()
  }, [])

  return { name, setName, lastName, setLastName }
}

export default useName
