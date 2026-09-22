# HANDOFF.md

Дата: 2026-09-22

## 1. Проект

Tortopedia — статический RU/UA сайт о домашнем декоре тортов.

Позиционирование:

```text
Tortopedia — практический справочник по домашнему декору тортов.
Если человек хочет сам украсить торт и не понимает, как сделать это аккуратно без профессионального опыта — он должен идти в Tortopedia.
```

Локальный репозиторий:

```text
D:\Git\tortopedia
```

GitHub:

```text
saitkharkov-cyber/tortopedia
```

Branch:

```text
main
```

Архитектура:

```text
src/
-> Eleventy 3.1.6
-> _site-pilot/
-> publish.ps1
-> production HTML в корне
-> GitHub main
-> Cloudflare Pages
-> https://tortopedia.in.ua/
```

Основное правило:

```text
редактировать src/
не править production HTML вручную
```

---

## 2. С чего начать следующую сессию

Сначала прочитать:

```text
docs/START_SESSION.md
docs/CHATGPT_WORKFLOW_RULES.md
docs/CURRENT_SESSION_STATE.md
docs/HANDOFF.md
docs/ARTICLE_PRODUCTION_REGULATION.md
docs/CONTENT_PLAN.md
docs/CONTENT_MAP.md
```

Затем проверить Git:

```powershell
git status --short && git log --oneline --decorate -7
```

Фактическое состояние Git всегда приоритетнее документации.

На момент завершения этой сессии remote main содержит как минимум:

```text
58be3de Document Open Graph social meta plan
a883f01 Document structured data plan
36f43c0 Add category intro support
219144b Update current session state for article 1043
8c524c1 Document glossary plan and copy-paste rules
37a20c3 Add men's cake decoration guide and ideas category
```

Важно: два последних документационных коммита (`a883f01`, `58be3de`) были сделаны напрямую в GitHub. Перед продолжением на локальном ПК выполнить:

```powershell
git pull
```

---

## 3. Что завершено 2026-09-22

### Статья 1043 опубликована

```text
post_id: 1043
RU: /kak-ukrasit-tort-dlya-muzhchiny/
UA: /uk/yak-prykrasyty-tort-dlya-cholovika/
```

Тема:

```text
«Как украсить торт для мужчины в домашних условиях»
```

Это общий hub-материал, а не пошаговый МК одного дизайна.

Существующая страница:

```text
/kak-ukrasit-tort-na-den-rozhdeniya-muzhu/
```

оставлена отдельным узким МК по торту-смокингу из мастики и связана с новым хабом внутренней перелинковкой.

Для 1043 подготовлено 8 самостоятельных визуальных тем, у каждой 4 WebP-размера:

```text
hero
krem
shokolad
bez-mastiki
temy
toppery
kompoziciya
idei
```

Основной commit:

```text
37a20c3 Add men's cake decoration guide and ideas category
```

---

## 4. Новая категория «Идеи и вдохновение»

Создана новая категория:

```text
category_id: 6
category_slug: idei-i-vdohnovenie
active_category: idei
```

RU:

```text
/category/idei-i-vdohnovenie/
Идеи и вдохновение
```

UA:

```text
/uk/category/idei-ta-nathnennya/
Ідеї та натхнення
```

Навигационный placeholder 159 переведён в рабочую категорию RU/UA.

Для category layouts добавлен `category_url` с fallback, чтобы украинские страницы могли использовать локализованный URL категории, а старые статьи продолжали работать.

---

## 5. Видимое описание категории

Для категорий реализован отдельный опциональный front matter параметр:

```text
category_intro
```

Он выводится непосредственно после H1 и до карточек статей.

Изменены:

```text
src/_includes/layouts/category.njk
src/_includes/layouts/category-uk.njk
```

Поле добавлено только новой категории RU/UA. Старые категории не получили новый intro и функционально не изменились.

Build-проверка подтвердила:

- у новых RU/UA категорий `category-intro` присутствует;
- у старых `vse-o-mastike` его нет;
- старый `{{ content | safe }}` остаётся после карточек, как раньше.

Commit:

```text
36f43c0 Add category intro support
```

После push проверено:

```text
HEAD -> main = origin/main = 36f43c0
```

до двух последующих документационных GitHub-коммитов.

---

## 6. Глоссарий терминов — новый блок развития

В `docs/CONTENT_PLAN.md` добавлен план глоссария.

Цель — не SEO само по себе, а понимание статей новичками.

Идея:

- отдельная страница глоссария;
- простые определения;
- первые вхождения терминов в статье могут получать короткие интерактивные подсказки;
- desktop: hover/click;
- mobile: tap;
- повторные вхождения того же термина в статье остаются обычным текстом;
- важные термины могут вести на отдельную расширенную карточку/материал;
- все данные централизованы RU/UA.

Стартовый список включает, среди прочего:

```text
мастика
мастика для обтяжки
мастика для лепки
КМЦ
Gum-Tex
Tylose
трагакант
топпер
молд
вайнер
айсинг
ганаш
крем-чиз
кондитерский мешок
насадка
шпатель
скребок
поворотный столик
подложка
пищевой/гелевый краситель
кандурин
изомальт
вафельная бумага
сахарная бумага
съедобная печать
армирование фигурки
конденсат на мастике
выравнивание
обтяжка
```

Commit документации:

```text
8c524c1 Document glossary plan and copy-paste rules
```

---

## 7. Правило больших copy-paste блоков

В `docs/CHATGPT_WORKFLOW_RULES.md` добавлено правило:

```text
один логически законченный текст для вставки = один цельный копируемый fenced block
```

Если внутри такого текста нужны тройные backticks, внешний блок делать четырьмя backticks.

Это правило обязательно соблюдать дальше.

---

## 8. Structured Data / микроразметка

Проверено текущее состояние.

Системной JSON-LD-разметки сейчас нет.

Есть старый частный Microdata-блок `Recipe` для рецепта мастики из маршмеллоу (`post_id: 645`) в:

```text
src/_includes/partials/recipe-schema-marshmallow.njk
src/_includes/partials/recipe-schema-marshmallow-uk.njk
```

В нём есть устаревшие элементы, включая старую Flash-разметку видео и `aggregateRating/reviewCount`, поэтому его нельзя тиражировать без ревизии.

В `docs/CONTENT_PLAN.md` добавлен отдельный план:

- `Article` / `BlogPosting` для статей;
- `BreadcrumbList`;
- `WebSite`;
- при необходимости `Organization`;
- `Recipe` только для настоящих рецептов;
- RU/UA симметрия;
- централизованная генерация из front matter/templates;
- ревизия старого Recipe-блока;
- проверка актуальных требований Google.

Commit:

```text
a883f01 Document structured data plan
```

---

## 9. Open Graph / social meta

Проверено: централизованной Open Graph-разметки в `head.njk` сейчас нет.

В `docs/CONTENT_PLAN.md` добавлен план внедрения:

- `og:type`;
- `og:title`;
- `og:description`;
- `og:url`;
- `og:image`;
- `og:site_name=Tortopedia`;
- `og:locale=ru_UA / uk_UA`;
- `og:image:width/height` при наличии корректных размеров;
- Twitter/X Card `summary_large_image`;
- общий partial/template вместо ручного заполнения;
- fallback для страниц без hero;
- RU/UA симметрия;
- тест новой статьи, старой статьи, категории и главных страниц;
- после публикации проверить Facebook/Meta preview.

Важно:

```text
Schema.org/JSON-LD ≠ Open Graph
```

JSON-LD — structured data для поисковых систем.
Open Graph — корректные превью ссылок в Facebook, мессенджерах и других соцсетях.

Commit:

```text
58be3de Document Open Graph social meta plan
```

---

## 10. Sitemap и llms.txt

Eleventy пишет сейчас:

```text
Wrote 72 files
```

В `sitemap.xml` — 70 URL.

Это нормально, потому что два служебных файла исключены из `collections.all`:

```text
sitemap.xml
llms.txt
```

Оба используют:

```text
eleventyExcludeFromCollections: true
```

Итого:

```text
72 generated files - 2 service files = 70 URLs in sitemap.xml
```

`llms.txt` должен быть доступен по URL, но добавлять его как обычную индексируемую страницу в XML sitemap не нужно.

---

## 11. Следующий post_id и следующий материал

Текущий использованный максимум:

```text
1043
```

Следующий свободный глобальный ID:

```text
1044
```

Один материал = один глобальный `post_id`, общий для RU и UA.

Следующая статья:

```text
1044 — «Торт „Футбольное поле“: как сделать своими руками»
```

После неё:

```text
1045 — «Торт для рыбака»
```

Перед 1044 обязательно:

1. проверить актуальный SERP;
2. проверить интент;
3. проверить существующие страницы Tortopedia и каннибализацию;
4. собрать рабочую семантику;
5. утвердить H1 / Title / Description / структуру;
6. следовать `docs/ARTICLE_PRODUCTION_REGULATION.md`;
7. только после утверждения структуры переходить к тексту.

Не возвращаться автоматически к старому backlog.

---

## 12. Что пока не развивать

Отдельный обзор:

```text
CMC / Tylose / Gum-Tex / трагакант
```

не развивать без подтверждённого самостоятельного интента.

Причина — риск смыслового пересечения с уже опубликованными материалами про КМЦ и мастику для лепки фигурок.

---

## 13. Рабочие правила

Пользователь предпочитает:

- один следующий шаг за раз;
- `+`, `++`, `+++` = предыдущий шаг выполнен, дать только следующий;
- PowerShell-команды одной строкой;
- `git add` одной строкой;
- сначала проверить факты, затем менять;
- не делать scope creep;
- не commit/push без явного подтверждения;
- RU и UA проверять отдельно;
- перед commit смотреть staged diff;
- использовать `git diff --check`;
- большие документы/копипасты давать одним цельным fenced block.

Публикация:

```text
npm run build
-> проверить _site-pilot
-> .\publish.ps1
-> git diff
-> git diff --check
-> git add
-> git diff --cached --check
-> meaningful staged diff review
-> git status --short
-> commit только после подтверждения
-> push только после подтверждения
-> production check
```

---

## 14. Точка продолжения

Следующая рабочая сессия:

```text
git pull
→ git status --short && git log --oneline --decorate -7
→ прочитать CURRENT_SESSION_STATE + HANDOFF + CONTENT_PLAN
→ начать подготовку статьи 1044
→ SERP / интент / каннибализация / семантика
→ структура
→ статья
```

Отдельные технические блоки, уже зафиксированные в плане и не забыть в дальнейшем:

```text
глоссарий терминов
Schema.org / JSON-LD
Open Graph / social meta
```
