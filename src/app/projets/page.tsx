import path from 'node:path'
import type { Metadata } from 'next'
import { listerProjets } from '@/lib/projets'
import { CartesProjets } from '@/components/CartesProjets'

export const metadata: Metadata = { title: 'Projets | Noah Daën' }

export default function IndexProjets() {
  const projets = listerProjets(path.join(process.cwd(), 'content/projets'))
  return <CartesProjets projets={projets} niveauTitre="h1" />
}
