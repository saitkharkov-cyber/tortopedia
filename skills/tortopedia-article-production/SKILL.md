# Tortopedia Article Production

## Purpose

Use this skill for creating, revising, publishing, and validating Tortopedia articles.

The skill is intended for the full article-production workflow:

topic validation → planning → RU/UA source → fact-check → visual development → image integration → build → publish → Git review → production verification.

The detailed source of truth for the workflow is:

- `docs/ARTICLE_PRODUCTION_REGULATION.md`
- `docs/TORTOPEDIA_CONTENT_STYLE_GUIDE.md`
- `docs/TORTOPEDIA_SHOP_ASSORTMENT.md`

This skill defines how ChatGPT should operate while following those documents.

---

## Core principle

Do not treat article creation as a single writing task.

A Tortopedia article is a production process consisting of sequential stages.

Do not move to the next mandatory stage until the current stage is complete or explicitly verified as already complete.

If an earlier mandatory stage is found to be missing, return to it and repeat any later checks affected by that change.

---

## Workflow

Follow the current `ARTICLE_PRODUCTION_REGULATION.md`.

At a high level:

1. Validate topic and independent search intent.
2. Make GO / NO-GO decision.
3. Create and preserve `ARTICLE_PASSPORT`.
4. Assign globally unique `post_id`.
5. Define SEO skeleton and article structure.
6. Plan internal linking.
7. Identify potential Tortopedia-shop opportunities.
8. Fact-check technical and practical claims.
9. Create RU source.
10. Create UA source.
11. Verify RU ↔ UA parity.
12. Develop visuals iteratively.
13. Integrate only approved visuals.
14. Update navigation and contextual links.
15. Update HTML sitemap where required.
16. Decide whether the article belongs in `llms.txt`.
17. Build with Eleventy.
18. Validate `_site-pilot`.
19. Publish through `publish.ps1`.
20. Review production diff.
21. Review Git staging.
22. Commit / push only after explicit user approval.
23. Validate production.
24. Mark article DONE only after the full required cycle is complete.

---

## Source of truth

When working with the repository, actual files and command output take priority over memory, assumptions, previous conversations, and outdated documentation.

Before modifying an existing file:

- inspect its current contents;
- do not assume headings, text, paths, slugs, front matter fields, or image names;
- do not assume a previous command succeeded until the user provides the result.

If repository state contradicts the working plan, follow the repository state and adjust the plan.

---

## One-step interaction

Default interaction pattern:

**one step → user executes / confirms → inspect result → next step**

Do not dump a long sequence of future commands unless the user explicitly asks for it.

When the user runs commands manually:

- give one next command;
- prefer short commands;
- evaluate actual output before continuing;
- do not assume success.

---

## Meaning of `++`

If the user replies with:

- `++`
- `+++`
- `++++`

interpret it as:

**the current proposed step is approved / completed; continue with the next step only.**

It is not a blanket permission for future actions.

If the current step explicitly asks for approval of a specific commit, push, or other operation, then `++` authorizes that specific operation.

---

## RU / UA rule

Every new Tortopedia article requires a RU and UA pair.

Both versions must share:

- the same `post_id`;
- equivalent intent;
- equivalent factual content;
- equivalent practical sequence;
- aligned article structure;
- matching shop opportunities where applicable.

UA must be naturally adapted, not mechanically translated.

Do not assume that correctness of RU implies correctness of UA.

When factual or technical content changes in one language, check whether the paired version must be updated.

---

## ARTICLE_PASSPORT

After GO and source creation, preserve the article passport in the source file as `ARTICLE_PASSPORT` JSON inside an HTML comment.

The passport records stable production data such as:

- primary intent;
- primary query;
- related queries / subintents;
- article format;
- role in cluster;
- overlaps with existing pages;
- scope boundaries;
- `post_id`;
- RU / UA URLs where applicable.

Do not treat it as visible content or Schema.org markup.

---

## Writing rule

The article must solve the reader's task first.

SEO data guides content decisions but must not turn the article into keyword stuffing.

Do not:

- add sections only to capture another query;
- inflate word count;
- mechanically copy competitor structure;
- introduce unrelated subtopics;
- create a separate article if the intent is not independently justified.

---

## Fact-check rule

Fact-check claims where error could:

- spoil the result;
- mislead the reader;
- create a food-safety issue;
- create a technically impossible instruction;
- present a conditional recommendation as universal.

Particularly verify:

- temperatures;
- time;
- proportions;
- material compatibility;
- drying / storage / transport;
- food safety;
- technical properties;
- disputed recommendations.

If the evidence is weak or context-dependent, soften the claim or clearly present it as a practical option.

---

## Visual workflow

Visual work is iterative.

Use:

**initial idea → generation → visual evaluation → correction → re-generation / editing → explicit approval**

Do not assume the first prompt defines the final image.

After every generation evaluate the actual image.

Check:

- whether the image supports the text;
- whether the technique is physically plausible;
- whether a home baker could reproduce it;
- whether objects are placed logically;
- whether the image introduces elements not explained by the article;
- whether related images contradict each other.

An image is approved only after explicit user acceptance.

---

## Critical visual rule

Never rewrite a correct practical instruction merely to justify an incorrect generated image.

If:

**text is correct + image is wrong → fix image**

If visual work reveals that the instruction itself is wrong or unclear:

**fix the text and synchronize RU / UA**

---

## Tutorial-image rule

For practical master classes, prefer images that explain an action, not merely show another finished state.

A useful tutorial sequence should make clear:

- starting state;
- action;
- intermediate transformation;
- resulting state.

If a reader cannot understand how one state becomes the next, the image does not sufficiently explain the method.

Do not force one image to explain several unclear operations.

Use multiple simple steps when necessary.

---

## Visual continuity

When several images depict one object or one tutorial, preserve the important canonical properties.

Examples:

- cake shape;
- covering material;
- color palette;
- shape of decorative parts;
- number of repeated elements;
- construction logic;
- relative proportions.

Absolute pixel-perfect identity is not required unless necessary for comprehension.

Technical consistency is more important than decorative consistency.

---

## Image placement

Place inline images where they support the exact surrounding step.

Do not insert an image merely because a heading exists.

Typical patterns:

- final version under a major H2;
- base composition under the relevant preparation H3;
- process illustration immediately after the sentence introducing the action;
- intermediate result after completion of a logical stage.

The visual sequence should follow the article's actual workflow.

---

## Responsive image preparation

After an image is explicitly approved:

1. prepare WebP;
2. create required responsive sizes;
3. use a clear SEO-friendly filename;
4. place files under `wp-content/uploads/YYYY/MM/`;
5. prepare RU alt;
6. prepare natural UA alt;
7. insert into RU and UA source;
8. verify `src`, `srcset`, width, height, aspect ratio, and surrounding text;
9. build and check actual rendering.

Do not integrate an unapproved image.

---

## Aspect-ratio rule

Never assume dimensions from a previous image.

Use the actual dimensions of the current source image.

Responsive variants must preserve the original aspect ratio.

The HTML `width` and `height` attributes must match the actual rendered image ratio.

If an image looks stretched, first verify actual dimensions before changing CSS.

---

## PowerShell rule

Preferred environment:

- Windows Terminal;
- `pwsh` / PowerShell 7;
- UTF-8.

Recommended session initialization:

```powershell
[Environment]::CurrentDirectory=$PWD.Path
[Console]::InputEncoding=[System.Text.UTF8Encoding]::new($false)
[Console]::OutputEncoding=[System.Text.UTF8Encoding]::new($false)
$OutputEncoding=[System.Text.UTF8Encoding]::new($false)
```

For file writes use UTF-8 without BOM:

```powershell
$utf8=[System.Text.UTF8Encoding]::new($false)
```

Prefer absolute paths:

```powershell
$p=Join-Path $PWD 'src\...\index.html'
```

Do not assume `[IO.File]::ReadAllText()` resolves relative paths from the visible PowerShell prompt.

---

## Ukrainian apostrophe rule

The Ukrainian apostrophe `’` (`U+2019`) has repeatedly caused parsing problems in long PowerShell commands.

Therefore:

- do not place long Ukrainian text inside single-quoted PowerShell strings when apostrophes are present;
- prefer double-quoted strings;
- if needed, generate the apostrophe programmatically:

```powershell
$apo=[char]0x2019
$text="м${apo}який"
```

- do not replace the apostrophe with `?`;
- do not damage source text merely to satisfy PowerShell;
- if a command becomes fragile, split it into shorter operations.

Avoid giant one-line RU/UA replacements when a shorter stable marker can be used.

---

## Safe text replacement

Before automatic replacement:

1. inspect the actual source;
2. search for the exact target;
3. count matches;
4. stop if count is unexpected;
5. perform the smallest possible replacement;
6. verify the result.

Prefer:

- short stable markers;
- local insertions;
- small replacements.

Avoid replacing huge blocks of HTML unless necessary.

---

## Generated files

Production / generated HTML is not edited manually.

Correct workflow:

**source → build → `_site-pilot` → verify → `publish.ps1`**

If production output is wrong, fix source and rebuild.

Do not patch generated HTML as a shortcut.

---

## Build

Use the current command defined in `package.json`.

Do not rely on memory if there is uncertainty.

Expected generated working tree:

`_site-pilot/`

After build, verify:

- RU article;
- UA article;
- categories;
- navigation;
- sitemap;
- social metadata;
- schema;
- images;
- internal links.

---

## Publish

Use:

```powershell
.\publish.ps1
```

After publish:

- inspect the script result;
- inspect `git status --short`;
- inspect diff;
- run `git diff --check`;
- investigate unexpected mass changes before Git staging.

Do not assume every generated change belongs in the commit.

---

## Git rule

Never use:

```text
git add .
```

Stage only files belonging to the current logical change.

Before commit:

1. inspect working tree;
2. stage targeted files;
3. inspect staged file list;
4. inspect `git diff --cached`;
5. show the user what will be committed;
6. wait for explicit approval.

Commit and push are separate permissions unless explicitly approved together.

---

## Session-state documents

Do not update `HANDOFF` automatically during active work.

Use state / handoff documents when:

- ending the session;
- pausing for a significant period;
- moving work to another chat;
- context loss would materially hurt continuation.

Do not create endless documentation-only commit loops.

---

## Tortopedia-shop rule

Shop opportunities are discovered from real reader needs.

Do not insert a product into article text merely because it can be sold.

A valid shop opportunity should solve a real practical problem already present in the article.

Where appropriate:

- mention a simple household alternative;
- present a ready product as convenience, not necessity.

---

## Completion rule

Do not call an article DONE because:

- the text is written;
- images are generated;
- build succeeds;
- publish succeeds;
- commit succeeds;
- push succeeds.

DONE requires completion of all mandatory checks defined in `ARTICLE_PRODUCTION_REGULATION.md`, including production verification.

---

## Behaviour when uncertain

If a technical or editorial detail is uncertain:

1. inspect the repository;
2. inspect the source;
3. inspect generated output;
4. verify against project documentation;
5. only then propose a change.

Do not invent repository state.

---

## References

Always consult the current project versions of:

- `docs/ARTICLE_PRODUCTION_REGULATION.md`
- `docs/TORTOPEDIA_CONTENT_STYLE_GUIDE.md`
- `docs/TORTOPEDIA_SHOP_ASSORTMENT.md`

These references override this skill if they contain newer or more specific project rules.

---

## Operating mode

Default mode for Tortopedia article work:

**careful, sequential, repository-driven, visually verified, RU/UA synchronized, no speculative file edits.**
