import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react'
import { Modal } from '../ui/modal'
import { Button } from '../ui/button'
import Github from '../icons/github'
import { useSignIn } from '@clerk/nextjs'
import { type OAuthStrategy } from '@clerk/types'

const SignInModal = ({
  showSignInModal,
  setShowSignInModal,
}: {
  showSignInModal: boolean
  setShowSignInModal: Dispatch<SetStateAction<boolean>>
}) => {
  const { isLoaded, signIn } = useSignIn()
  const [signInClicked, setSignInClicked] = useState(false)

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!isLoaded) return null
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/auth-callback',
      })
    } catch (err) {
      console.log(err)
    } finally {
      setSignInClicked(true)
    }
  }

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className='flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16'>
        <a href='https://oss.gallery'>
          <Image
            src='/logo.jpg'
            alt='Logo'
            className='h-10 w-10 rounded-full'
            width={20}
            height={20}
            unoptimized
          />
        </a>
        <h3 className='font-display text-2xl font-bold'>Sign In</h3>
        <p className='text-sm text-gray-500'>
          To submit your project to the OSS Gallery, create a free account by signing in with
          GitHub.
        </p>
      </div>

      <div className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16'>
        <Button
          text='Sign in with GitHub'
          icon={<Github />}
          variant='secondary'
          loading={signInClicked}
          onClick={() => {
            oauthSignIn('oauth_google')
          }}
        />
      </div>
    </Modal>
  )
}

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false)

  const SignInModalCallback = useCallback(() => {
    return <SignInModal showSignInModal={showSignInModal} setShowSignInModal={setShowSignInModal} />
  }, [showSignInModal, setShowSignInModal])

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  )
}
