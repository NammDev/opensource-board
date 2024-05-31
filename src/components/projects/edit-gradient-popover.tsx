import { EnrichedProjectProps } from '@/lib/types'
import { EditGradientPopoverClient } from './edit-gradient-popover-client'
import { getCachedAuthUser } from '@/lib/actions/users'
import { getUserEmail } from '@/lib/utils'

export default async function EditGradientPopover({ project }: { project: EnrichedProjectProps }) {
  const auth = await getCachedAuthUser()
  if (!auth) return null

  const email = getUserEmail(auth)

  const { users } = project

  if (email === process.env.ADMIN_EMAIL || users.some((user) => user.id === auth.id)) {
    return (
      <div className='absolute bottom-2 right-2 z-10'>
        <EditGradientPopoverClient project={project} />
      </div>
    )
  }
}
