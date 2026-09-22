import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { compileMDX } from 'next-mdx-remote/rsc'
import { composantsMdx } from '@/components/mdx'

const fixture = fs.readFileSync(
  path.resolve(__dirname, 'fixtures/mdx-riche.mdx'),
  'utf8',
)

describe('composantsMdx', () => {
  it('rend un lien avec le jeton text-accent (rendu direct, sans passer par next-mdx-remote/rsc)', () => {
    const Lien = composantsMdx.a as React.ComponentType<React.ComponentPropsWithoutRef<'a'>>
    const html = renderToStaticMarkup(
      React.createElement(Lien, {
        href: 'https://ndaen.xyz',
        children: 'Noah Daën',
      }),
    )
    expect(html).toContain('text-accent')
    expect(html).toContain('href="https://ndaen.xyz"')
    // pas de target : le lien s'ouvre dans le même onglet
    expect(html).not.toContain('target=')
  })

  it('rend une liste avec les puces du jeton (rendu direct)', () => {
    const Liste = composantsMdx.ul as React.ComponentType<React.ComponentPropsWithoutRef<'ul'>>
    const Item = composantsMdx.li as React.ComponentType<React.ComponentPropsWithoutRef<'li'>>
    const html = renderToStaticMarkup(
      React.createElement(Liste, {}, React.createElement(Item, {}, 'Item')),
    )
    expect(html).toMatch(/<ul[^>]*class="[^"]*list-disc/)
  })

  it('rend un corps MDX complet (lien + liste + gras) avec le composant compilé par next-mdx-remote/rsc', async () => {
    const { content } = await compileMDX({
      source: fixture,
      components: composantsMdx,
    })
    const html = renderToStaticMarkup(content)

    expect(html).toMatch(/<a[^>]*class="[^"]*text-accent[^"]*"[^>]*href="https:\/\/ndaen\.xyz"/)
    expect(html).toContain('<ul')
    expect(html).toMatch(/<strong[^>]*class="[^"]*text-text[^"]*"/)
  })
})
