'use client'
import { Crisp } from 'crisp-sdk-web'
import { useEffect } from 'react'

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure('3f89cc40-a6bb-4512-860c-4e6babcea7e4')
  }, [])
  return null
}
