import prisma from '@/lib/prisma'
import { Link } from '@prisma/client'
import { Dub } from 'dub'
import { getUrlWithRef, nanoid } from './utils'

export const dub = new Dub({
  token: process.env.DUB_API_KEY,
  workspaceId: process.env.DUB_WORKSPACE_ID,
})

export async function shortenAndCreateLink({
  url,
  type,
  projectId,
}: {
  url: string
  type: 'GITHUB' | 'WEBSITE'
  projectId: string
}) {
  const linkId = nanoid(24)

  const { shortLink } = await dub.links.create({
    url: getUrlWithRef(url),
    externalId: linkId,
  })
  return await prisma.link.create({
    data: {
      id: linkId,
      type,
      url,
      shortLink,
      projectId,
    },
  })
}

export async function editShortLink({ link, newUrl }: { link: Link; newUrl: string }) {
  return await Promise.all([
    dub.links.update(`ext_${link.id}`, {
      url: getUrlWithRef(newUrl),
    }),
    prisma.link.update({
      where: {
        id: link.id,
      },
      data: {
        url: newUrl,
      },
    }),
  ])
}
