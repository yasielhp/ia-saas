import { useUser } from '@clerk/nextjs'
import React from 'react'
import { AvatarImage, Avatar, AvatarFallback } from '@/components/ui/avatar'

const USerAvatar = () => {
  const { user } = useUser()
  return (
    <Avatar className='h-8 w-8'>
      <AvatarImage src={user?.imageUrl} />
      <AvatarFallback>
        {user?.firstName?.charAt(0)}
        {user?.lastName?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}

export default USerAvatar
