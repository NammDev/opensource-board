import prisma from '../prisma'
import { getCachedAuthUser } from './users'

export async function authUser() {
  const user = await getCachedAuthUser()

  if (!user) {
    throw new Error('You need to be logged in to perform this action.')
  }

  return user
}

export async function authProject({ projectId }: { projectId: string }) {
  const user = await getCachedAuthUser()
  if (!user) throw new Error('You need to be logged in to perform this action.')

  if (user?.id === process.env.ADMIN_ID) {
    return true
  }

  const userIsProjectMember = await prisma.projectUser.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: user?.id,
      },
    },
  })

  if (!userIsProjectMember) {
    throw new Error('You need to be a member of this project to edit it')
  }
}
