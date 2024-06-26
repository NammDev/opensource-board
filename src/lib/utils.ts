import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { Metadata } from 'next'
import ms from 'ms'
import { customAlphabet } from 'nanoid'
import { User } from '@clerk/nextjs/dist/types/server'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'OSS Gallery',
  description = 'A collection of open-source projects built with Dub.',
  image = 'https://oss.gallery/thumbnail.jpg',
}: {
  title?: string
  description?: string
  image?: string | null
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(image && {
        images: [
          {
            url: image,
          },
        ],
      }),
    },
    twitter: {
      title,
      description,
      ...(image && {
        card: 'summary_large_image',
        images: [image],
      }),
      creator: '@dubdotco',
    },
    metadataBase: new URL('https://oss.gallery'),
  }
}

export const getUrlWithRef = (url: string) => {
  const urlWithRef = new URL(url)
  urlWithRef.searchParams.set('ref', 'nammdev')
  return urlWithRef.toString()
}

export function nFormatter(
  num?: number,
  opts: { digits?: number; full?: boolean } = {
    digits: 1,
  }
) {
  if (!num) return '0'
  if (opts.full) {
    return Intl.NumberFormat('en-US').format(num)
  }
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value
    })
  return item ? (num / item.value).toFixed(opts.digits).replace(rx, '$1') + item.symbol : '0'
}

export const timeAgo = (
  timestamp: Date | null,
  {
    withAgo,
  }: {
    withAgo?: boolean
  } = {}
): string => {
  if (!timestamp) return 'Never'
  const diff = Date.now() - new Date(timestamp).getTime()
  if (diff < 1000) {
    // less than 1 second
    return 'Just now'
  } else if (diff > 82800000) {
    // more than 23 hours – similar to how Twitter displays timestamps
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: new Date(timestamp).getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined,
    })
  }
  return `${ms(diff)}${withAgo ? ' ago' : ''}`
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}

export const getUrlFromString = (str: string) => {
  if (isValidUrl(str)) return str
  try {
    if (str.includes('.') && !str.includes(' ')) {
      return new URL(`https://${str}`).toString()
    }
  } catch (_) {}
  return ''
}

export const nanoid = (chars?: number) => {
  return customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    chars || 7 // 7-character random string by default
  )()
}

export function getUserEmail(user: any | null) {
  const email =
    user?.emailAddresses?.find((e) => e.id === user.primaryEmailAddressId)?.emailAddress ?? ''
  return email
}

export function getUsernameFromEmail(email: string) {
  const atIndex = email.indexOf('@')
  if (atIndex !== -1) {
    return email.substring(0, atIndex)
  }
  return ''
}

export const trim = (u: unknown) => (typeof u === 'string' ? u.trim() : u)
