import { EnrichedProjectProps } from '@/lib/types'
import { getCachedAuthUser } from '@/lib/actions/users'
import { EditTeamButtonClient } from './edit-team-button-client'

export default async function EditTeamButton({ project }: { project: EnrichedProjectProps }) {
  const auth = await getCachedAuthUser()
  if (!auth) return null

  const { users } = project

  if (auth.id === process.env.ADMIN_ID || users.some((user) => user.id === auth.id)) {
    return <EditTeamButtonClient />
  }
}
