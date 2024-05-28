'use client'

// import { SessionProvider } from 'next-auth/react'
// import { useSubmitProjectModal } from '@/components/projects/submit-project-modal'
// import { useSignInModal } from '@/components/layout/sign-in-modal'
import { Analytics } from '@vercel/analytics/react'
import { Dispatch, ReactNode, SetStateAction, createContext } from 'react'
import { Toaster } from 'sonner'
import { TooltipProvider } from '../ui/tooltip'

export const AppContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
  setShowSubmitProjectModal: Dispatch<SetStateAction<boolean>>
}>({
  setShowSignInModal: () => {},
  setShowSubmitProjectModal: () => {},
})

export default function Providers({ children }: { children: ReactNode }) {
  // const { SignInModal, setShowSignInModal } = useSignInModal()
  // const { SubmitProjectModal, setShowSubmitProjectModal } = useSubmitProjectModal()

  return (
    // <SessionProvider>
    //   <AppContext.Provider
    //     value={{
    //       setShowSignInModal,
    //       setShowSubmitProjectModal,
    //     }}
    //   >
    <TooltipProvider>
      {/* <SignInModal />
      <SubmitProjectModal /> */}
      <Toaster closeButton />
      {children}
      <Analytics />
    </TooltipProvider>
    //   </AppContext.Provider>
    // </SessionProvider>
  )
}
