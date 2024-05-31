import { EnrichedProjectProps } from '@/lib/types'
import { getCachedAuthUser } from '@/lib/actions/users'
import { EditProjectButtonClient } from './edit-project-button-client'

export default async function EditProjectButton({ project }: { project: EnrichedProjectProps }) {
  const auth = await getCachedAuthUser()
  if (!auth) return null

  const { users } = project

  if (auth.id === process.env.ADMIN_ID || users.some((user) => user.id === auth.id)) {
    return (
      <div className='bottom-2 right-2 z-10'>
        <EditProjectButtonClient />
      </div>
    )
  }
}
