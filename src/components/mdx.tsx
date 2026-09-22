import type { MDXComponents } from 'mdx/types'

/**
 * Composants passés à `<MDXRemote components={composantsMdx} />` pour que le
 * corps MDX des fiches projet reste habillé avec les jetons du thème (aucune
 * couleur ou style par défaut du navigateur) même quand un futur `.mdx`
 * ajoute un lien, un titre, une liste ou du gras.
 *
 * Les liens (y compris externes) n'ont pas de `target` : ils s'ouvrent dans
 * le même onglet, comme le reste du site.
 */
export const composantsMdx: MDXComponents = {
  p: (props) => <p className="text-muted" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-4" {...props} />,
  ul: (props) => <ul className="list-disc space-y-1 pl-5 text-muted" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-1 pl-5 text-muted" {...props} />,
  li: (props) => <li {...props} />,
  strong: (props) => <strong className="font-semibold text-text" {...props} />,
  em: (props) => <em className="italic" {...props} />,
  h2: (props) => <h2 className="mt-8 text-xl font-semibold text-text" {...props} />,
  h3: (props) => <h3 className="mt-6 text-lg font-semibold text-text" {...props} />,
  code: (props) => (
    <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]" {...props} />
  ),
}
