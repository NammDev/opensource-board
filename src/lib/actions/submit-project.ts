'use server'

import slugify from '@sindresorhus/slugify'
import { getRepo } from '../github'
import { getUrlFromString, nanoid } from '../utils'
import prisma from '@/lib/prisma'
import { PROJECT_GRADIENTS } from '@/components/projects/project-constants'
import { shortenAndCreateLink } from '../dub'
import typesense from '../typesense'

export async function submitProject(url: string) {
  const github = getUrlFromString(url)
  if (!github) throw new Error('Please provide a GitHub repository')

  const githubExists = await prisma.link.findUnique({
    where: { url: github },
  })
  if (githubExists) throw new Error('This GitHub repository is already submitted')

  const githubData = await getRepo(github)
  if (!githubData.name) throw new Error('Invalid GitHub repository')

  const slugExists = await prisma.project.findUnique({
    where: { slug: slugify(githubData.name) },
  })

  const project = await prisma.project.create({
    data: {
      name: githubData.name,
      description: githubData.description || '',
      slug: slugExists ? `${slugify(githubData.name)}-${nanoid(3)}` : slugify(githubData.name),
      logo: githubData.logo,
      gradient: PROJECT_GRADIENTS[Math.floor(Math.random() * PROJECT_GRADIENTS.length)],
      stars: githubData.stars,
      verified: githubData.stars > 500, // automatically verify projects with > 1000 stars
      users: {
        create: {
          userId: 'test',
          role: 'Submitter',
        },
      },
    },
  })

  await Promise.all([
    shortenAndCreateLink({
      url: github,
      type: 'GITHUB',
      projectId: project.id,
    }),
    githubData.homepage &&
      shortenAndCreateLink({
        url: githubData.homepage,
        type: 'WEBSITE',
        projectId: project.id,
      }),
    typesense().collections('projects').documents().create({
      id: project.id,
      name: project.name,
      description: project.description,
      slug: project.slug,
      stars: project.stars,
      logo: project.logo,
    }),
  ])

  return { redirect: `/projects/${project.slug}` }
}
