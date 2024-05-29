'use client'

import { useMediaQuery } from '@/hooks/use-media-query'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, SyntheticEvent, useState } from 'react'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { submitProject } from '@/lib/actions/submit-project'
import { Input } from '../ui/input'

export default function SubmitProjectForm({
  setShowSubmitProjectModal,
}: {
  setShowSubmitProjectModal: Dispatch<SetStateAction<boolean>>
}) {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const { isMobile } = useMediaQuery()
  const router = useRouter()

  const onSubmit = async (inputUrl: string) => {
    try {
      setLoading(true)
      const result = await submitProject(inputUrl)
      router.push(result.redirect)
      setUrl('')
      toast.success('Successfully submitted project!')
      setShowSubmitProjectModal(false)
    } catch (error) {
      console.log(error)
      toast.error(`Unable to add bookmark, try again.`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={async (event: SyntheticEvent<HTMLFormElement>) => {
        event.preventDefault()
        await onSubmit(url)
      }}
      className='flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16'
    >
      <label htmlFor='github'>
        <span className='text-sm font-medium text-gray-900'>GitHub Repository</span>
        <div className='relative mt-1'>
          <Input
            autoComplete='off'
            inputMode='text'
            type='url'
            pattern='https://.*|http://.*'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUrl(event.target.value)
            }}
            value={url}
            data-1p-ignore
            name='github'
            id='github'
            autoFocus={!isMobile}
            required
            placeholder='https://github.com/dubinc/dub'
            className={
              'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500 w-full rounded-md focus:outline-none sm:text-sm'
            }
          />

          {/* <input
            name='github'
            id='github'
            autoFocus={!isMobile}
            required
            placeholder='https://github.com/dubinc/dub'
            className={`${
              state?.error
                ? 'border-red-300 pr-10 text-red-500 placeholder-red-300 focus:border-red-500 focus:ring-red-500'
                : 'border-gray-300 text-gray-900 placeholder-gray-400 focus:border-gray-500 focus:ring-gray-500'
            } w-full rounded-md focus:outline-none sm:text-sm`}
          />
          {state?.error && (
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
              <AlertCircle
                className='h-5 w-5 text-red-500'
                fill='currentColor'
                stroke='white'
                aria-hidden='true'
              />
            </div>
          )} */}
        </div>
        {/* {state?.error && (
          <p className='mt-1 text-sm text-red-600' id='form-error'>
            {state?.error}
          </p>
        )} */}
      </label>
      <Button text='Submit' disabled={loading} />
    </form>
  )
}
