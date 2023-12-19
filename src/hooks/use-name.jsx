import { useState, useEffect } from 'react'
import { userService } from '~/services/user-service'

import { useSnackBarContext } from '~/context/snackbar-context'

const useName = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const { setAlert } = useSnackBarContext()
  const [userId, setUserId] = useState()
  const [userRole, setUserRole] = useState()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedToken = localStorage.getItem('s2s')
        if (storedToken) {
          const [, payload] = storedToken.split('.')
          const decodedPayload = JSON.parse(atob(payload))
          const userId = decodedPayload.id
          setUserId(userId)
          const userRole = decodedPayload.role
          setUserRole(userRole)
          const response = await userService.getUserById(userId, userRole)
          const firstName = response.data.firstName
          setName(firstName)
          const surName = response.data.lastName
          setLastName(surName)
        }
      } catch (e) {
        console.log(`Error message: ${e.message}`)
        setAlert({
          severity: 'error',
          message: 'common.errorMessages.fetchingData'
        })
      }
    }
    fetchUser()
  }, [setAlert])

  return { name, setName, lastName, setLastName, userId, userRole }
}

export default useName
