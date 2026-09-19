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

Последний подтверждённый HEAD после push:

```text
1f9dbef Add KMC articles to HTML sitemaps
```

Последние важные commits:

```text
8734031 Improve internal linking across fondant articles
db05e4b Add automatic post navigation chains
c868e20 Generate sitemap with lastmod dates
5b05c16 Add KMC fondant guide in RU and UA
1f9dbef Add KMC articles to HTML sitemaps
```

Фактическое состояние Git всегда приоритетнее документации.

---

## 1. Индексация и GSC

Проведён аудит актуальных RU/UA статей.

Установлено:

- актуальные статьи из проверяемого набора присутствуют в sitemap;
- sitemap в GSC обрабатывается успешно;
- актуальные страницы отдают `200 OK`;
- canonical у проверенных страниц self-referencing;
- `noindex` не обнаружен;
- проблемы `Duplicate, Google chose different canonical` для рассматриваемого набора не обнаружено;
- bulk-выгрузка `Crawled - currently not indexed` оказалась частично устаревшей относительно URL Inspection.

Точечно через URL Inspection были подтверждены как индексируемые:

- RU `Как хранить мастику для торта`;
- RU `Как украсить торт на день рождения мужу`;
- RU `Как слепить фигурку пингвина из мастики`;
- UA `Як зберігати мастику для торта`.

Вывод: общей технической проблемы с индексацией актуальных статей не выявлено.

Полная поштучная URL Inspection всех страниц не выполнялась.

---

## 2. Внутренняя перелинковка

Проведён аудит contextual `article -> article` внутри `.entry-content`.

Не учитываются:

- меню;
- sidebar;
- категории;
- HTML sitemap;
- recent articles;
- prev/next;
- self-links.

Для проверки используется:

```text
../../work/Tools/audit_internal_links.py
```

Добавлены естественные контекстные связи, в том числе:

- `Как работать с мастикой` -> `Как хранить мастику`;
- `Как работать с мастикой` -> `Какая мастика лучше для обтяжки`;
- `Как хранить фигурки` -> `Как сушить фигурки`;
- `Как слепить зайку` -> `Как сушить фигурки`;
- `Как слепить Лунтика` -> `Как сушить фигурки`;

и зеркально для UA.

Искусственные ссылки только ради обнуления отчёта не добавлялись.

---

## 3. Автоматическая prev/next navigation

Источник:

```text
src/_data/postNavigation.json
```

Текущая RU-цепочка:

1. `/kak-rabotat-s-mastikoi-dlya-torta/`
2. `/kak-hranit-mastiku-dlya-torta/`
3. `/kak-hranit-figurki-iz-mastiki/`
4. `/kak-sushit-figurki-iz-mastiki/`
5. `/kmc-dlya-mastiki/`

UA-цепочка зеркальная:

1. `/uk/yak-pratsuvaty-z-mastykoyu-dlya-torta/`
2. `/uk/yak-zberigaty-mastyku-dlya-torta/`
3. `/uk/yak-zberigaty-fihurky-z-mastyky/`
4. `/uk/yak-sushyty-fihurky-z-mastyky/`
5. `/uk/kmc-dlya-mastyky/`

Навигация строится через фильтр `postNavigationFor` в `eleventy.config.cjs`.

Для старых страниц ручные поля `prev_*` / `next_*` остаются fallback.

После добавления КМЦ проверено:

- на странице о сушке появился `next` на КМЦ;
- на странице КМЦ есть `prev` на сушку;
- RU/UA симметричны.

---

## 4. XML sitemap и HTML sitemap

### XML sitemap

`src/sitemap.njk` генерирует `sitemap.xml` автоматически.

Правило `lastmod`:

- `updated`, если есть содержательное обновление;
- иначе `published`;
- build date и mtime файлов не используются.

Новая статья КМЦ автоматически попала в XML sitemap.

### HTML sitemap

HTML sitemap пока статический и требует ручного добавления новых материалов в:

```text
src/html-sitemap/index.html
src/uk/html-sitemap/index.html
```

После этого нужен обычный build/publish.

Статья КМЦ уже добавлена в обе HTML-карты.

---

## 5. Новая опубликованная статья КМЦ

### RU

```text
https://tortopedia.in.ua/kmc-dlya-mastiki/
```

H1:

```text
КМЦ для мастики: что это, сколько добавлять и чем заменить
```

SEO title:

```text
КМЦ для мастики: что это, сколько добавлять для фигурок и чем заменить
```

### UA

```text
https://tortopedia.in.ua/uk/kmc-dlya-mastyky/
```

H1:

```text
КМЦ для мастики: що це, скільки додавати і чим замінити
```

SEO title:

```text
КМЦ для мастики: що це, скільки додавати для фігурок і чим замінити
```

Статья намеренно сфокусирована на интенте:

```text
КМЦ/CMC для мастики — что это, зачем, сколько добавлять, как использовать, чем заменить
```

Не превращать её в общий энциклопедический обзор всех добавок.

Отдельный обзор `CMC / Tylose / Gum-Tex / трагакант` пока НЕ планировать как ближайшую статью: есть риск каннибализации с опубликованным материалом КМЦ.

---

## 6. Фактические решения по статье КМЦ

В статье разобраны:

- что такое КМЦ / CMC;
- для чего добавляют в мастику для фигурок;
- сколько добавлять;
- как правильно вмешивать;
- что делать при передозировке;
- соотношение терминов КМЦ / СМС / CMC / Tylose;
- чем заменить;
- Gum-Tex;
- трагакант;
- готовая gum paste;
- использование CMC как основы клея;
- связь с последующей сушкой фигурок.

Фактология сверялась с производителями и профильными источниками.

Ключевой принцип: дозировка зависит от конкретного продукта; не выдавать одну универсальную норму как абсолютную.

---

## 7. Изображения статьи КМЦ

Добавлены три визуальных блока.

### Hero

Файлы:

```text
wp-content/uploads/2026/09/kmc-dlya-mastiki-480.webp
wp-content/uploads/2026/09/kmc-dlya-mastiki-865.webp
wp-content/uploads/2026/09/kmc-dlya-mastiki-1200.webp
wp-content/uploads/2026/09/kmc-dlya-mastiki.webp
```

### Второе изображение

```text
kmc-dlya-mastiki-lepestki-listiki-320.webp
kmc-dlya-mastiki-lepestki-listiki-640.webp
kmc-dlya-mastiki-lepestki-listiki-865.webp
```

### Сравнение обычной мастики и мастики с КМЦ

```text
kmc-mastika-sravnenie-480.webp
kmc-mastika-sravnenie-865.webp
kmc-mastika-sravnenie-1200.webp
kmc-mastika-sravnenie.webp
```

Сравнительное изображение содержит украинские подписи намеренно и используется в обеих языковых версиях.

---

## 8. Responsive table

Для сравнительной таблицы добавлен мобильный режим в `tortopedia.css`.

На `max-width: 640px`:

- `thead` скрывается;
- каждая строка превращается в карточку;
- заголовки полей выводятся через `td::before` и `data-label`.

Пользователь выбрал этот вариант вместо горизонтального scroll.

---

## 9. Языковые связи КМЦ

Проверено после build:

RU:

```text
hreflang ru-UA -> /kmc-dlya-mastiki/
hreflang uk-UA -> /uk/kmc-dlya-mastyky/
language switch -> ../uk/kmc-dlya-mastyky/
```

UA:

```text
hreflang ru-UA -> /kmc-dlya-mastiki/
hreflang uk-UA -> /uk/kmc-dlya-mastyky/
language switch -> ../../kmc-dlya-mastiki/
```

---

## 10. Последние статьи и главная

В `eleventy.config.cjs` используются коллекции:

```text
recentRu
recentUk
```

Они автоматически:

- берут опубликованные материалы;
- фильтруют по языку;
- сортируют по `published`;
- выводят последние 6.

Новая статья КМЦ автоматически вошла в блоки последних материалов, поэтому после publish изменились многие production HTML — это ожидаемо.

---

## 11. Pinterest

Pinterest для Tortopedia начат 2026-09-18.

Сейчас его не форсировать: пользователь хочет дать новому каналу немного «отстояться» и не делать его главным фронтом следующего дня.

---

## 12. Что делать дальше по контенту

НЕ выбирать следующую тему только из новых идей.

На следующей сессии отправная точка:

1. `docs/CONTENT_PLAN.md`;
2. старое семантическое ядро Tortopedia;
3. `docs/CONTENT_MAP.md`;
4. уже опубликованные материалы;
5. только затем — актуализация частотности / Keyword Planner / SERP.

Главная задача — найти следующий **неохваченный самостоятельный поисковый кластер**, а не продолжать углублять тему добавок.

Критерии выбора:

- есть спрос;
- интент не закрыт текущими материалами;
- низкий риск каннибализации;
- тема логично расширяет Tortopedia;
- можно сделать материал заметно полезнее текущей выдачи.

Рассматривавшиеся в разговоре примеры (`сколько мастики нужно`, `крем под мастику`, `почему мастика трескается` и т. п.) — только идеи, НЕ утверждённый план. Сначала сверка со старым ядром и `CONTENT_PLAN.md`.

---

## 13. Рабочая схема публикации

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
- `+++` означает: предыдущий шаг выполнен, дать только следующий шаг;
- фактический Git имеет приоритет над документацией.

---

## 14. Автоматизация категорий — выполнено 2026-09-19

Автоматическое формирование списков статей категорий реализовано на уровне Eleventy.

В `eleventy.config.cjs` добавлен фильтр `categoryArticlesFor`.

Он выбирает материалы по условиям:

* `category_slug` совпадает с текущей категорией;
* `lang` совпадает с языком категории;
* присутствует `published`.

Результат сортируется по `published` по убыванию даты.

Для изображений добавлен фильтр `rootImagePath`, приводящий относительный путь из front matter статьи к абсолютному пути от корня сайта.

Карточки генерируются в:

```text
src/_includes/layouts/category.njk
src/_includes/layouts/category-uk.njk
```

RU и UA работают симметрично.

H1 категории перенесён в общий category layout и выводится перед автоматическими карточками.

Из статических страниц `vse-o-mastike` удалены ручные карточки опубликованных материалов:

```text
post-901
post-902
post-903
```

После build проверено:

```text
post-901 = 1
post-902 = 1
post-903 = 1
post-904 = 1
post-905 = 1
```

в обеих языковых версиях категории.

Статья КМЦ теперь автоматически появляется первой в категории:

```text
RU: /kmc-dlya-mastiki/
UA: /uk/kmc-dlya-mastyky/
```

Для КМЦ исправлен конфликт ID:

```text
post_id: 905
article id: post-905
class: post-905
```

### Правило `post_id`

Один материал имеет один глобальный `post_id`, общий для RU и UA версий.

Новый материал получает:

```text
max существующий post_id + 1
```

Текущий максимальный ID:

```text
1040
```

Следующий новый материал:

```text
1041
```

Не назначать ID отдельно для языковых версий.

### Дальше

Техническая задача категорий закрыта.

Следующий этап — выбор нового самостоятельного контентного кластера:

```text
docs/CONTENT_PLAN.md
+ старое семантическое ядро Tortopedia
+ docs/CONTENT_MAP.md
+ уже опубликованные материалы
-> поиск неохваченного кластера
```

Отдельный обзор `CMC / Tylose / Gum-Tex / трагакант` сейчас не развивать из-за риска каннибализации со статьёй КМЦ.
