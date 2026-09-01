# HANDOFF — Tortopedia

Date: 2026-09-01
Branch: `pilot-11ty`

## Current state

The Eleventy pilot is working and the article migration stage is complete.

- Eleventy: 3.1.6
- Build command: `npm run build`
- Input: `src`
- Output: `_site-pilot`
- `_site-pilot/`, `node_modules/`, `backup/` are ignored by Git.
- Cloudflare is not doing this Eleventy build; generation is currently local/test-first.

## Completed today

### Eleventy article templates

Two article layouts are in use:

- `src/_includes/layouts/article.njk` — RU
- `src/_includes/layouts/article-uk.njk` — UA

They parameterize article-specific data such as:

- canonical / hreflang
- language switch URL
- post ID
- category slug/title and active menu state
- previous/next article links
- title
- main image data

Article body remains in the article source file under `src/.../index.html`.

### Migrated articles

All article pages are now represented in Eleventy sources:

- 20 RU articles
- 20 UA articles
- total: 40 article outputs

Latest successful build produced 40 files with no Eleventy errors.

### Verification

RU articles were compared against the original static HTML and passed after normalization of benign differences.

UA articles were also compared against the original static HTML and all 20 passed after benign normalization.

Known benign differences intentionally ignored during comparison:

- old per-page `ms-icon-144x144.png?v=...` cache-buster values versus shared template value
- harmless whitespace / final newline formatting
- equivalent self-links such as `./` versus explicit sibling-relative article URLs

Do not spend time trying to reproduce these byte-for-byte unless there is an actual functional reason.

### Recipe exception

`mastika-iz-marshmellou-recept` contains a unique hidden Recipe microdata block.

Separate partials preserve this legacy block:

- `src/_includes/partials/recipe-schema-marshmallow.njk`
- `src/_includes/partials/recipe-schema-marshmallow-uk.njk`

The layouts include them only for `post_id == 645`.

## Important commits

Current article-migration chain:

- `d0bb207` — Migrate Ukrainian articles to Eleventy
- `5f2bd7e` — Migrate Russian articles to Eleventy
- `d82ed1d` — Generalize Eleventy article template
- `2b7ebf8` — Add Eleventy pilot for article templates

Before this HANDOFF commit, `pilot-11ty` local and `origin/pilot-11ty` both pointed to `d0bb207`.

`main` / `origin/main` remain at `e602187` (`Remove empty sitemap lists`).

Do not merge `pilot-11ty` into `main` yet.

## Local-only migration scripts

Two one-off helper scripts exist locally and were intentionally NOT committed:

- `migrate-ru-articles.ps1`
- `migrate-uk-articles.ps1`

At session end they were the only untracked files shown by `git status --short`.

They are migration utilities, not runtime/site files. Keep them local, delete them later, or add them to a local Git exclude if desired. Do not accidentally deploy/commit them without a reason.

## Site scope still outside Eleventy

The repository still contains the original static site alongside the pilot sources.

Article migration is complete, but the remaining non-article page types have not yet been migrated to Eleventy. The next stage should cover the remaining 14 pages, approximately:

- 2 homepages: RU + UA
- category/archive pages, including pagination
- standard pages such as `about`, `html-sitemap`, `mastic-decoration` in RU + UA

Treat these as separate page types instead of forcing them through the article layout.

## Recommended next session

1. `git checkout pilot-11ty`
2. `git pull`
3. `git status --short`
4. `npm run build`
5. Start with ONE non-article page type as a pilot, compare generated HTML to the current static page, then generalize only after the single-page test passes.

Suggested first candidate: a simple standard page (`about`) rather than homepage/category pagination.

Continue using the same rule as for articles: preserve visible/functionally meaningful output; do not chase harmless byte-level legacy differences.

## Safety / workflow notes

- Test one page before mass migration.
- Use local Eleventy build and inspect generated HTML before commits.
- Source `.html` files use Liquid; layouts `.njk` use Nunjucks.
- Avoid broad regex/whitespace rewrites across files.
- For PowerShell writes, preserve UTF-8 without BOM using `[Text.UTF8Encoding]::new($false)`.
- Do not infer encoding damage from console mojibake alone; verify file contents directly.
