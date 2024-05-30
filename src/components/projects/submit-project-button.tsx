'use client'

import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { buttonLinkVariants } from '../app-ui/button-link'
import { AppContext } from '../layout/providers'

export function SubmitProjectButton({ text = 'Submit' }: { text?: string }) {
  // const { data: session, status } = useSession()
  const session = false
  const { setShowSignInModal, setShowSubmitProjectModal } = useContext(AppContext)

  return (
    <button
      className={cn(buttonLinkVariants(), 'px-3 py-1.5')}
      // disabled={status === 'loading'}
      onClick={() => {
        if (session) {
          setShowSubmitProjectModal(true)
        } else {
          setShowSignInModal(true)
        }
      }}
    >
      {text}
    </button>
  )
}
