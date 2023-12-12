import { useState } from 'react'

const useRequest = () => {
  const [reqSubject, setReqSubject] = useState('')
  const [reqCategory, setReqCategory] = useState('')
  const [reqDescription, setReqDescription] = useState('')
  const [reqSelectedCategory, setReqSelectedCategory] = useState(null)

  return {
    reqSubject,
    setReqSubject,
    reqCategory,
    setReqCategory,
    reqDescription,
    setReqDescription,
    reqSelectedCategory,
    setReqSelectedCategory
  }
}

export default useRequest
