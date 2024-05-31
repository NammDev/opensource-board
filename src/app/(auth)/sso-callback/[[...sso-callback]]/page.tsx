import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { Loader2 } from 'lucide-react'

export default async function SSOCallbackPage() {
  return (
    <div className='max-w-lg place-items-center'>
      <Loader2 className='size-16 animate-spin' aria-hidden='true' />
      <AuthenticateWithRedirectCallback
        signInForceRedirectUrl={'/auth-callback'}
        signUpForceRedirectUrl={'/auth-callback'}
      />
    </div>
  )
}
