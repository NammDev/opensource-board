import { Project } from '@prisma/client'
import { cn } from '@/lib/utils'
import ProjectCard from './project-card'

export default function ProjectGrid({
  projects,
  className,
}: {
  projects: Project[]
  className?: string
}) {
  return (
    <div className={cn('grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
      {projects.map((project, index) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  )
}
