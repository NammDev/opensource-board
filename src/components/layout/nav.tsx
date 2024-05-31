import { getRepo } from '@/lib/github'
import { Suspense } from 'react'
import Navbar from './navbar'

export default function Nav() {
  return (
    <Suspense>
      <NavRSC />
    </Suspense>
  )
}

async function NavRSC() {
  const { stars } = (await getRepo('https://github.com/dubinc/oss-gallery')) as { stars: number }

  return <Navbar stars={stars} />
}
