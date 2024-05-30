'use server'

import { cache } from 'react'
import { unstable_noStore as noStore, revalidateTag } from 'next/cache'
import { User as AuthUser, currentUser } from '@clerk/nextjs/server'
import { getUserEmail, getUsernameFromEmail } from '../utils'
import prisma from '@/lib/prisma'
import { User } from '@prisma/client'

export const getCachedUser = cache(async () => {
  noStore()
  const user = await currentUser()
  if (!user) {
    return null
  }
  return prisma.user.findUnique({
    where: { id: user.id },
  })
})

export const getCachedAuthUser = cache(async () => {
  noStore()
  try {
    return await currentUser()
  } catch (err) {
    console.error(err)
    return null
  }
})

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })
  return user as User | null
}

export async function createUser() {
  const userAuth = await getCachedAuthUser()
  return prisma.user.create({
    data: {
      id: userAuth?.id as string,
      name: userAuth?.fullName,
      email: getUserEmail(userAuth),
      username: getUsernameFromEmail(getUserEmail(userAuth)),
      image: userAuth?.imageUrl,
    },
  })
}
