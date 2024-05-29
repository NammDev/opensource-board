import { Project } from '@prisma/client'
import Typesense from 'typesense'
import { SearchResponseHit } from 'typesense/lib/Typesense/Documents'

export type ProjectHit = SearchResponseHit<
  Pick<Project, 'id' | 'name' | 'description' | 'slug' | 'logo'>
>

const typesense = ({ client }: { client?: boolean } = {}) => {
  return new Typesense.Client({
    apiKey: 'izVnm7SfKpQtOkFKOrUrDvmU4LIdbmQq',
    nodes: [
      {
        host: 'o4b6gfuzpa13yi98p-1.a1.typesense.net',
        port: 443,
        protocol: 'https',
      },
    ],
    connectionTimeoutSeconds: 5,
  })
}

export default typesense
