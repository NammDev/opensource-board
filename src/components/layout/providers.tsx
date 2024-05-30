'use client'

import { Analytics } from '@vercel/analytics/react'
import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'
import { Toaster } from 'sonner'
import { TooltipProvider } from '../ui/tooltip'
import { useSubmitProjectModal } from '../projects/submit-project-modal'
import { useSignInModal } from './sign-in-modal'

export const AppContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
  setShowSubmitProjectModal: Dispatch<SetStateAction<boolean>>
}>({
  setShowSignInModal: () => {},
  setShowSubmitProjectModal: () => {},
})

export default function Providers({ children }: { children: ReactNode }) {
  const { SignInModal, setShowSignInModal } = useSignInModal()
  const { SubmitProjectModal, setShowSubmitProjectModal } = useSubmitProjectModal()

  return (
    <AppContext.Provider
      value={{
        setShowSignInModal,
        setShowSubmitProjectModal,
      }}
    >
      <TooltipProvider>
        <SignInModal />
        <SubmitProjectModal />
        <Toaster closeButton />
        {children}
        <Analytics />
      </TooltipProvider>
    </AppContext.Provider>
  )
}
