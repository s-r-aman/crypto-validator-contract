import React, { useLayoutEffect } from 'react'
import { useRouter } from 'next/router'

export default function RegisterPage() {
  const router = useRouter();
  useLayoutEffect(() => {
    router.push('/register/1')
  }, []);
  return null;   
}
