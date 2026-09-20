# Tortopedia — Current Session State

Дата обновления: 2026-09-19

## Репозиторий

- Локально: `D:\Git\tortopedia`
- GitHub: `saitkharkov-cyber/tortopedia`
- Branch: `main`
- Eleventy: `3.1.6`
- Source: `src/`
- Build: `_site-pilot/`
- Production HTML: корень репозитория
- Домен: `https://tortopedia.in.ua/`

Последний подтверждённый remote HEAD:

```text
2d78f18 Make publish script incremental
```

Последние важные commits:

```text
2fef2fa Automate category listings and document post ID rules
a239874 Fix duplicate category cards and localize read more links
0c8158a Add fondant modeling guide in Russian and Ukrainian
083735e Move fondant modeling guide to mastika category
2eed299 Add modeling guide to HTML sitemaps
```

Фактическое состояние Git всегда приоритетнее документации.

---

## 1. Автоматизация категорий

Category listing формируется автоматически через Eleventy.

Фильтр `categoryArticlesFor` в `eleventy.config.cjs` выбирает статьи по:

- `category_slug`;
- `lang`;
- наличию `published`;
- сортирует по `published` DESC.

Карточки выводятся через:

```text
src/_includes/layouts/category.njk
src/_includes/layouts/category-uk.njk
```

Для путей изображений используется `rootImagePath`.

RU и UA категории работают симметрично.

---

## 2. Правило post_id

Один материал имеет один глобальный `post_id`, общий для RU и UA.

Правило для нового материала:

```text
следующий ID = max существующий post_id + 1
```

Текущий использованный максимум:

```text
1041
```

Следующий новый материал:

```text
1042
```

---

## 3. Последняя опубликованная статья

RU:

```text
https://tortopedia.in.ua/mastika-dlya-lepki-figurok/
```

H1:

```text
Мастика для лепки фигурок: какую выбрать, как подготовить и начать лепить
```

UA:

```text
https://tortopedia.in.ua/uk/mastika-dlya-liplennya-figurok/
```

H1:

```text
Мастика для ліплення фігурок: яку вибрати, як підготувати і почати ліпити
```

`post_id: 1041`.

Основная категория обеих версий:

```text
category_slug: vse-o-mastike
RU: Всё о мастике
UA: Все про мастику
```

Статья НЕ относится к `Уроки лепки`: это справочный материал о выборе и подготовке мастики, а не пошаговый мастер-класс.

---

## 4. Материал 1041 — границы интента

Статья закрывает:

- какая мастика подходит для фигурок;
- чем мастика для лепки отличается от мастики для обтяжки;
- нужная консистенция;
- подготовка мастики;
- когда нужен КМЦ;
- почему детали не держат форму;
- базовые формы для начала лепки;
- краткое армирование;
- базовые ошибки и дальнейшая сушка/хранение.

КМЦ раскрыт только как мост к отдельной статье `/kmc-dlya-mastiki/`.

Не углублять эту статью в отдельный обзор `CMC / Tylose / Gum-Tex / трагакант`.

---

## 5. Изображения материала 1041

Используются 5 визуальных блоков:

1. hero — детали и готовый зайчик;
2. проверка консистенции;
3. базовые формы;
4. армирование зубочистками;
5. готовая фигурка зайчика.

Файлы находятся в:

```text
wp-content/uploads/2026/09/
```

Используются responsive WebP/srcset.

---

## 6. Sitemap

### XML

`src/sitemap.njk` генерирует `sitemap.xml` автоматически.

Новая статья 1041 уже вошла в XML sitemap.

### HTML

HTML sitemap пока статический.

При публикации новой статьи вручную проверять и при необходимости обновлять:

```text
src/html-sitemap/index.html
src/uk/html-sitemap/index.html
```

Материал 1041 уже добавлен в обе HTML-карты в раздел `Всё о мастике / Все про мастику`.

---

## 7. Семантическое ядро

Старое семантическое ядро теперь хранится в репозитории:

```text
docs/TORTOPEDIA-Semanticheskoe-YADRO.xlsx
```

Не удалять его из Git. Использовать как один из основных источников при выборе следующих кластеров.

---

## 8. Рабочая схема публикации

```text
src/
-> npm run build
-> _site-pilot/
-> publish.ps1
-> production HTML в корне
-> git diff / git diff --check
-> commit
-> push main
-> Cloudflare Pages
```

Правила:

- production HTML вручную не редактировать;
- source править в `src/`;
- RU и UA проверять отдельно;
- commit/push только после явного подтверждения пользователя;
- PowerShell-команды давать одной строкой;
- `+++` = предыдущий шаг выполнен, дать только следующий шаг.

---

## 9. Масштабирование publish.ps1

Техническая задача закрыта 2026-09-20.

Commit:

2d78f18 Make publish script incremental

Что изменено:

- Eleventy запускается с `--quiet`, без длинного списка generated-файлов;
- HTML копируется в production только если файл отсутствует или отличается по SHA-256;
- неизменённые HTML пропускаются;
- `llms.txt` и `sitemap.xml` также копируются только при изменении;
- отслеживаемые production HTML, которых больше нет в `_site-pilot`, удаляются как stale;
- сохранены `git diff --check` и итоговый `git diff --stat`.

Проверено:

без изменений:
HTML copied: 0; unchanged: 64

один изменённый production HTML:
HTML copied: 1; unchanged: 63

stale HTML:
обнаруживается и удаляется

Полная Eleventy-сборка пока остаётся полной.

Простой `--incremental` пересобирает все 66 файлов, а точечный `--incremental=src/...` на текущем проекте Eleventy 3.1.6 падает с ошибкой:

templateRender has not yet initialized

При текущем объёме полная сборка занимает около 0.3 секунды, поэтому её пока не усложнять.

---

## 10. Что делать дальше

Следующий этап — вернуться к выбору следующего самостоятельного контентного кластера через:

docs/CONTENT_PLAN.md
+ docs/TORTOPEDIA-Semanticheskoe-YADRO.xlsx
+ docs/CONTENT_MAP.md
+ опубликованные материалы
+ Keyword Planner / SERP при необходимости

Не развивать сейчас отдельный обзор `CMC / Tylose / Gum-Tex / трагакант` из-за риска пересечения со статьёй КМЦ.
