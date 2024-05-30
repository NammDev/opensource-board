import { EnrichedProjectProps } from '@/lib/types'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export default async function ProjectTeam({ project }: { project: EnrichedProjectProps }) {
  const { users } = project

  return (
    <>
      <div className='absolute right-4 top-4'>
        {/* <EditTeamButton project={project} /> */}
        <p>Edit team Button</p>
      </div>
      <div
        className={cn(
          'mx-auto grid max-w-md grid-cols-1 gap-4',
          users.length > 1 && 'sm:grid-cols-2'
        )}
      >
        {users.map((user) => (
          <div key={user.username} className='flex items-center space-x-4'>
            <Link href={`/${user.username}`} className='flex-none'>
              <Image
                width={56}
                height={56}
                src={user.image}
                alt='avatar'
                className='h-14 w-14 rounded-full'
              />
            </Link>
            <div className='flex flex-col space-y-0.5'>
              <Link
                href={`/${user.username}`}
                className='font-medium text-gray-700 underline-offset-4 hover:underline'
              >
                {user.name}
              </Link>
              <p className='text-sm text-gray-500'>{user.role}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
