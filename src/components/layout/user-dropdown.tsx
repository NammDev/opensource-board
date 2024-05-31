'use client'

import { LayoutDashboard, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Popover } from '../ui/popover'
import { getUserEmail, getUsernameFromEmail } from '@/lib/utils'
import { useClerk, useUser } from '@clerk/nextjs'

export default function UserDropdown() {
  const { user } = useUser()
  const { signOut } = useClerk()

  const [openPopover, setOpenPopover] = useState(false)
  const email = getUserEmail(user)
  const username = getUsernameFromEmail(email)

  if (!email) return null

  return (
    <Popover
      content={
        <div className='w-full rounded-md bg-white p-2 sm:w-56'>
          <div className='p-2'>
            {username && <p className='truncate text-sm font-medium text-gray-900'>{username}</p>}
            <p className='truncate text-sm text-gray-500'>{email}</p>
          </div>
          <Link
            href={`/${username}`}
            className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
          >
            <LayoutDashboard className='h-4 w-4' />
            <p className='text-sm'>My Profile</p>
          </Link>
          <button
            className='relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100'
            onClick={() => signOut({ redirectUrl: '/' })}
          >
            <LogOut className='h-4 w-4' />
            <p className='text-sm'>Logout</p>
          </button>
        </div>
      }
      align='end'
      openPopover={openPopover}
      setOpenPopover={setOpenPopover}
    >
      <button
        onClick={() => setOpenPopover(!openPopover)}
        className='flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9'
      >
        <Image
          alt={email}
          src={user?.imageUrl || `https://avatars.dicebear.com/api/micah/${email}.svg`}
          width={40}
          height={40}
          unoptimized
        />
      </button>
    </Popover>
  )
}
