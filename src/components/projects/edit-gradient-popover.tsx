import { EnrichedProjectProps } from '@/lib/types'
import { EditGradientPopoverClient } from './edit-gradient-popover-client'
import { getCachedAuthUser } from '@/lib/actions/users'
import { use } from 'react'

export default async function EditGradientPopover({ project }: { project: EnrichedProjectProps }) {
  const auth = await getCachedAuthUser()
  if (!auth) return null

  const { users } = project

  if (auth.id === process.env.ADMIN_ID || users.some((user) => user.id === auth.id)) {
    return (
      <div className='absolute bottom-2 right-2 z-10'>
        <EditGradientPopoverClient project={project} />
      </div>
    )
  }
}
