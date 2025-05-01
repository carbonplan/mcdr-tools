import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Custom404() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/research/ocean-cdr')
  })

  return null
}
