# portfolio

> Une ligne pour décrire le projet — à remplir au démarrage.

## Stack

À compléter (langage, framework, base de données, hébergement).

## Commandes

| But | Commande |
|---|---|
| Dev | _à compléter_ |
| Build | _à compléter_ |
| Tests | _à compléter_ |
| Lint / typecheck | _à compléter_ |

## Fichiers de suivi

- `docs/TODO.md` — le plan de travail, items cochables, section Review en fin de tâche.
- `docs/LESSONS.md` — les leçons tirées des corrections. À relire en début de session.

## Agents BMAD

BMAD v6 est installé dans ce projet (modules `bmm` + `cis`). Les agents sont des
skills Claude Code — les invoquer par leur nom.

**Cycle de développement (`bmm`)**

| Skill | Rôle |
|---|---|
| `bmad-agent-analyst` | cadrage, recherche de marché, brief produit |
| `bmad-agent-pm` | PRD, epics, stories |
| `bmad-agent-architect` | architecture technique |
| `bmad-agent-dev` | Amelia — implémentation d'une story en test-first |
| `bmad-agent-ux-designer` | parcours et interfaces |
| `bmad-agent-tech-writer` | documentation |

**Workflows courants** : `bmad-create-prd`, `bmad-create-architecture`,
`bmad-create-epics-and-stories`, `bmad-create-story`, `bmad-dev-story`,
`bmad-code-review`, `bmad-sprint-planning`, `bmad-retrospective`.

**Idéation (`cis`)** : `bmad-cis-agent-brainstorming-coach`,
`bmad-cis-agent-design-thinking-coach`, `bmad-cis-agent-creative-problem-solver`,
`bmad-cis-agent-innovation-strategist`, `bmad-cis-agent-storyteller`.

En cas de doute sur le point d'entrée : `bmad-help`.

Les artefacts produits atterrissent dans `_bmad-output/` (versionné : PRD,
architecture et stories font partie du projet). Le moteur `_bmad/` et les skills
`bmad-*` sont gitignorés — ils se réinstallent avec `npx bmad-method install`.
