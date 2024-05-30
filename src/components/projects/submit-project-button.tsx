'use client'

import { cn } from '@/lib/utils'
import { useContext } from 'react'
import { buttonLinkVariants } from '../app-ui/button-link'
import { AppContext } from '../layout/providers'
import { useAuth } from '@clerk/clerk-react'

export function SubmitProjectButton({ text = 'Submit' }: { text?: string }) {
  const { isLoaded, isSignedIn } = useAuth()
  const { setShowSignInModal, setShowSubmitProjectModal } = useContext(AppContext)

  return (
    <button
      className={cn(buttonLinkVariants(), 'px-3 py-1.5')}
      disabled={!isLoaded}
      onClick={() => {
        if (isSignedIn) {
          setShowSubmitProjectModal(true)
        } else {
          setShowSignInModal(true)
        }
      }}
    >
      {isSignedIn ? 'Submit' : 'Sign in'}
    </button>
  )
}
