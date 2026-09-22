import Link from 'next/link'

const liens = [
  { href: '/projets', label: 'Projets' },
  { href: '/#parcours', label: 'Parcours' },
]

export function Nav({ disponibilite }: { disponibilite: string }) {
  return (
    <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <Link href="/" className="text-[15px] font-semibold text-text">
        Noah Daën
      </Link>
      <nav aria-label="Navigation principale" className="flex items-center gap-5">
        {liens.map((l) => (
          <Link key={l.href} href={l.href} className="text-sm text-muted hover:text-text">
            {l.label}
          </Link>
        ))}
        <span className="hidden rounded-full bg-accent px-3.5 py-1.5 text-xs font-semibold text-bg sm:inline">
          {disponibilite}
        </span>
      </nav>
    </header>
  )
}
