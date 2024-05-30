import prisma from '@/lib/prisma'
import { Suspense } from 'react'
import ProjectGrid from './project-grid'
import { Project } from '@prisma/client'

export default function ProjectList() {
  return (
    <Suspense fallback={null}>
      <ProjectListRSC />
    </Suspense>
  )
}

async function ProjectListRSC() {
  const featured = ['oss-gallery', 'dub', 'ui']
  const projects = await prisma.project.findMany({
    where: {
      verified: true,
    },
    orderBy: {
      stars: 'desc',
    },
  })

  const featuredProjects = featured.map((slug) =>
    projects.find((project) => project.slug === slug)
  ) as Project[]

  return (
    <div className='mx-5 md:mx-0'>
      <div className='grid gap-4'>
        <h2 className='font-display text-2xl font-semibold'>Featured</h2>
        {featuredProjects.every((project) => project === undefined) ? (
          <h1>No feature Project</h1>
        ) : (
          <ProjectGrid projects={featuredProjects} />
        )}
      </div>

      <div className='mb-8 mt-12 border-t border-gray-200' />

      <div className='grid gap-4'>
        <h2 className='font-display text-2xl'>All Projects</h2>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  )
}
