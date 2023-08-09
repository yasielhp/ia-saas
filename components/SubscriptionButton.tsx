'use client'

import axios from 'axios'
import { useState } from 'react'
import { Zap } from 'lucide-react'

import { Button } from '@/components/ui/button'

export const SubscriptionButton = ({
  isPro = false
}: {
  isPro: boolean;
}) => {
  const [loading, setLoading] = useState(false)

  const onClick = async () => {
    try {
      setLoading(true)

      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant={isPro ? 'default' : 'premium'} disabled={loading} onClick={onClick}>
      {loading ? 'Loading...' : isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && !loading && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}