# HANDOFF — Tortopedia

Дата: 2026-09-02
Ветка: `pilot-11ty`

## Текущее состояние

Миграция статического сайта Tortopedia на Eleventy завершена.

- Eleventy: 3.1.6
- Команда сборки: `npm run build`
- Вход: `src`
- Выход: `_site-pilot`
- Последняя успешная сборка: 54 HTML-файла
- Все 54 страницы представлены в `src`
- `_site-pilot/`, `node_modules/`, `backup/` игнорируются Git
- Cloudflare Eleventy не собирает: сборка пока выполняется локально
- В `main` изменения пока не сливать

## Мигрированные страницы

Всего: 54.

### Статьи

- 20 RU
- 20 UA
- всего 40

Layouts:

- `src/_includes/layouts/article.njk`
- `src/_includes/layouts/article-uk.njk`

Уникальный Recipe-блок статьи `post_id == 645` сохранён через:

- `src/_includes/partials/recipe-schema-marshmallow.njk`
- `src/_includes/partials/recipe-schema-marshmallow-uk.njk`

### Обычные страницы

6 страниц:

- RU/UA `about`
- RU/UA `mastic-decoration`
- RU/UA `html-sitemap`

Layouts:

- `src/_includes/layouts/page.njk`
- `src/_includes/layouts/page-uk.njk`

### Категории

6 страниц:

- RU/UA `category/vse-o-mastike/`
- RU/UA `category/uroki-lepki/`
- RU/UA `category/vse-o-mastike/page/2/`

Layouts:

- `src/_includes/layouts/category.njk`
- `src/_includes/layouts/category-uk.njk`
- `src/_includes/layouts/category-page2.njk`
- `src/_includes/layouts/category-page2-uk.njk`

### Главные страницы

2 страницы:

- `/`
- `/uk/`

Layouts:

- `src/_includes/layouts/home.njk`
- `src/_includes/layouts/home-uk.njk`

## Проверка результата

Каждый тип страниц проверялся после локальной сборки сравнением с исходным статическим HTML.

Успешно проверены:

- 20 RU-статей
- 20 UA-статей
- 6 обычных страниц
- 6 страниц категорий/пагинации
- RU главная
- UA главная

Итого: 54/54.

Последняя сборка:

`Wrote 54 files`

Последние проверки:

- `OK: RU category page2`
- `OK: UA category page2`
- `OK: RU home`
- `OK: UA home`

При сравнении нормализовались только допустимые технические различия:

- cache-buster `ms-icon-144x144.png?v=...`
- динамический timestamp `userSettings.time`
- несущественные пробелы/переносы строк
- для статей — ранее подтверждённые эквивалентные self-links

Не добиваться побайтового совпадения этих деталей без функциональной причины.

## Архитектура

Контент конкретной страницы хранится в `src/.../index.html`.

Общая оболочка страницы находится в соответствующем `.njk` layout.

В front matter передаются специфичные для страницы значения:

- canonical
- hreflang
- URL переключения языка
- SEO title/description
- IDs/slugs и активные пункты меню, где требуется
- изображения и другие специфичные параметры

Исходники `.html` обрабатываются Liquid.
Layouts `.njk` используют Nunjucks.

## Локальные миграционные скрипты

Остаются только локально и НЕ должны попадать в коммит:

- `migrate-ru-articles.ps1`
- `migrate-uk-articles.ps1`

Это одноразовые инструменты миграции, не runtime-файлы сайта.

## Что осталось сделать

1. Проверить `git diff --check`
2. Проверить `git status --short`
3. Убедиться, что в коммит не попали `migrate-*.ps1`
4. Закоммитить завершённую миграцию в `pilot-11ty`
5. При необходимости отправить ветку в GitHub
6. До отдельного решения не сливать `pilot-11ty` в `main` и не менять production Cloudflare

## Правила безопасности

- Сначала локальная сборка, затем проверка HTML, затем коммит
- Не применять широкие regex/whitespace-замены по всему сайту
- PowerShell-запись: UTF-8 без BOM через `[Text.UTF8Encoding]::new($false)`
- После неудачной сборки не сравнивать `_site-pilot`: там может остаться старый результат
- Исходную статическую версию пока сохранять как эталон
