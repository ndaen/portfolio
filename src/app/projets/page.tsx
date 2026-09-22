import path from 'node:path'
import type { Metadata } from 'next'
import { listerProjets } from '@/lib/projets'
import { CartesProjets } from '@/components/CartesProjets'

export const metadata: Metadata = { title: 'Projets | Noah Daën' }

export default function IndexProjets() {
  const projets = listerProjets(path.join(process.cwd(), 'content/projets'))
  return (
    <>
      <h1 className="mx-auto max-w-6xl px-4 pt-16 text-3xl font-bold tracking-tight sm:px-6 sm:text-4xl">
        Projets
      </h1>
      <CartesProjets projets={projets} />
    </>
  )
}
