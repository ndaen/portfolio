import path from 'node:path'
import { listerProjets } from '@/lib/projets'
import { Hero } from '@/components/Hero'
import { TuilesProduit } from '@/components/TuilesProduit'

export default function Accueil() {
  const projets = listerProjets(path.join(process.cwd(), 'content/projets'))
  const vedettes = projets.filter((p) => p.vedette)
  return (
    <>
      <Hero />
      <TuilesProduit projets={vedettes} />
    </>
  )
}
