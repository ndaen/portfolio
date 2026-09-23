import path from 'node:path'
import type { Metadata } from 'next'
import { listerProjets } from '@/lib/projets'
import { ListeProjets } from '@/components/ListeProjets'

export const metadata: Metadata = { title: 'Projets | Noah Daën' }

export default function IndexProjets() {
  const projets = listerProjets(path.join(process.cwd(), 'content/projets'))
  return <ListeProjets projets={projets} />
}
