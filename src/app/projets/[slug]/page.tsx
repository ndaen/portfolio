import path from 'node:path'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { listerProjets, lireProjet } from '@/lib/projets'
import { icones, captures } from '@/lib/visuels'

const dossier = path.join(process.cwd(), 'content/projets')

export const dynamicParams = false

export function generateStaticParams() {
  return listerProjets(dossier).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const projet = lireProjet(dossier, slug)
  if (!projet) return {}
  return { title: `${projet.titre} | Noah Daën`, description: projet.resume }
}

export default async function PageProjet({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const projet = lireProjet(dossier, slug)
  if (!projet) notFound()

  const icone = icones[slug]
  const capture = captures[slug]

  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="flex items-center gap-4">
        {icone && (
          <Image
            src={icone}
            alt=""
            width={64}
            height={64}
            className="rounded-2xl"
          />
        )}
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{projet.titre}</h1>
      </div>
      <p className="mt-3 text-muted">{projet.resume}</p>

      <p className="mt-5 text-[13px] text-meta">
        {projet.stack.join(', ')}. {projet.etat}.
      </p>

      {projet.liens.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-4">
          {projet.liens.map((l) => (
            <li key={l.href}>
              <a className="text-accent underline underline-offset-4" href={l.href}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-10 max-w-prose space-y-5 text-[15.5px] leading-relaxed text-muted">
        <MDXRemote source={projet.corps} />
      </div>

      {capture && (
        <Image
          src={capture.src}
          alt={capture.alt}
          width={capture.width}
          height={capture.height}
          className="mt-8 h-auto w-full max-w-[320px] rounded-2xl border border-line"
        />
      )}
    </article>
  )
}
