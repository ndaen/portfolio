import type { Metadata } from 'next'
import path from 'node:path'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { lireProfil } from '@/lib/profile'
import { pastilleDisponibilite } from '@/lib/disponibilite'
import { avecSchema } from '@/lib/url'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://ndaen.xyz'),
  title: 'Noah Daën, développeur full stack',
  description:
    'Développeur full stack Symfony et React Native. Deux ans et demi en alternance chez Webedia.',
}

const racine = process.cwd()
const profil = lireProfil(
  path.join(racine, 'content/source/cv.md'),
  path.join(racine, 'content/source/profile.yml'),
)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: profil.nomComplet,
              jobTitle: 'Développeur full stack',
              email: `mailto:${profil.email}`,
              url: 'https://ndaen.xyz',
              sameAs: [avecSchema(profil.github), avecSchema(profil.linkedin)],
              address: { '@type': 'PostalAddress', addressLocality: profil.localisation },
            }),
          }}
        />
        <Nav disponibilite={pastilleDisponibilite(profil.disponibilite)} />
        <main>{children}</main>
        <Footer profil={profil} />
      </body>
    </html>
  )
}
