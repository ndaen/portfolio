import path from 'node:path'
import { listerProjets } from '@/lib/projets'
import { lireProfil } from '@/lib/profile'
import { Hero } from '@/components/Hero'
import { TuilesProduit } from '@/components/TuilesProduit'
import { Parcours } from '@/components/Parcours'
import { CartesProjets } from '@/components/CartesProjets'
import { Competences } from '@/components/Competences'

export default function Accueil() {
  const racine = process.cwd()
  const projets = listerProjets(path.join(racine, 'content/projets'))
  const profil = lireProfil(
    path.join(racine, 'content/source/cv.md'),
    path.join(racine, 'content/source/profile.yml'),
  )
  return (
    <>
      <Hero />
      <TuilesProduit projets={projets.filter((p) => p.vedette)} />
      <Parcours />
      <CartesProjets projets={projets} repere="02" />
      <Competences groupes={profil.competences} />
    </>
  )
}
