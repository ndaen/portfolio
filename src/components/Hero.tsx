import Link from 'next/link'

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 pt-16 sm:px-6 sm:pt-24">
      <h1 className="entree max-w-[17ch] text-4xl font-bold leading-[0.97] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
        Full stack. Je livre en <span className="text-accent">production</span>.
      </h1>
      <p className="entree [--delai:0.08s] mt-5 max-w-[42ch] text-base leading-relaxed text-muted">
        Symfony, React Native, TypeScript. Deux ans et demi chez Webedia et trois
        applications à moi, publiées et utilisables.
      </p>
      <div className="entree [--delai:0.16s] mt-7 flex flex-wrap gap-3">
        <Link href="/projets" className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-bg">
          Voir les projets
        </Link>
        <Link href="#contact" className="rounded-full border border-line px-5 py-3 text-sm font-semibold text-text">
          Me contacter
        </Link>
      </div>
    </section>
  )
}
