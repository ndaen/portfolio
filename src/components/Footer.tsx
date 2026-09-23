import type { Profil } from '@/lib/profile'
import { avecSchema } from '@/lib/url'

export function Footer({ profil }: { profil: Profil }) {
  return (
    <footer id="contact" className="mx-auto max-w-6xl px-4 sm:px-6">
      <div className="border-t border-line py-(--espace-section)">
        <h2 className="text-2xl font-bold tracking-tight">Me contacter</h2>
        <p className="mt-3 max-w-prose text-muted">{profil.disponibilite}</p>
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
          <li>
            <a className="text-accent underline underline-offset-4" href={`mailto:${profil.email}`}>
              {profil.email}
            </a>
          </li>
          <li>
            <a className="text-accent underline underline-offset-4" href={avecSchema(profil.linkedin)}>
              Profil LinkedIn de Noah Daën
            </a>
          </li>
          <li>
            <a className="text-accent underline underline-offset-4" href={avecSchema(profil.github)}>
              Profil GitHub de Noah Daën
            </a>
          </li>
        </ul>
      </div>
    </footer>
  )
}
