# Tortopedia — Current Session State

Дата обновления: 2026-10-01

> Этот файл — snapshot текущего состояния активной работы, а не журнал сессии.
> При обновлении устаревшая информация заменяется актуальной.

---

## Текущая задача

Подготовка и публикация нового материала Tortopedia:

post_id: 1045

RU:
«Торт для рыбака: как украсить своими руками»

UA:
«Торт для рибалки: як прикрасити своїми руками»

URL:

RU: /tort-dlya-rybaka/
UA: /uk/tort-dlya-rybalky/

Категория:

RU: Идеи и вдохновение
UA: Ідеї та натхнення
slug: idei-i-vdohnovenie

Материал является дочерним материалом хаба:

RU: /kak-ukrasit-tort-dlya-muzhchiny/
UA: /uk/yak-prykrasyty-tort-dlya-cholovika/

Работа ведётся по:

docs/ARTICLE_PRODUCTION_REGULATION.md

---

## Текущая точка

RU и UA source подготовлены.

Созданы:

RU:
src/tort-dlya-rybaka/index.html

UA:
src/uk/tort-dlya-rybalky/index.html

Завершено:

- фактчек технологических решений;
- RU source;
- UA source;
- локализация UA Front Matter и ARTICLE_PASSPORT;
- проверка структуры H1/H2/H3;
- проверка UA на русские буквы ы/э/ё/ъ — clean;
- проверка BOM;
- исходящая перелинковка RU/UA;
- связь хаб 1043 ↔ статья 1045 RU/UA;
- линейная навигация 1044 → 1045 RU/UA;
- git diff --check — без ошибок.

Следующий этап:

подготовка и утверждение изображений
→ интеграция изображений
→ build / _site-pilot / publish

---

## Реализовано в статье

Статья построена как:

- практическая инструкция;
- идеи оформления;
- два самостоятельных направления:
  - без мастики;
  - с мастикой.

Ключевые решения:

- леска используется как главный символ рыбалки;
- перед подачей и разрезанием торта она должна быть полностью снята;
- настоящий рыболовный крючок не используется;
- крючок — только безопасная съедобная стилизация;
- описан домашний вариант декоративного геля для воды;
- в мастичном варианте главный акцент — сачок с тремя рыбками;
- сохранён принцип:
  один сюжет + один главный акцент + поддерживающие детали.

---

## Front Matter 1045

Проверено для UA:

- layout: layouts/article-uk.njk
- canonical: https://tortopedia.in.ua/uk/tort-dlya-rybalky/
- hreflang RU/UA;
- reverse lang_switch_url;
- lang: uk-UA;
- post_id: 1045;
- published: 2026-09-30;
- category_slug: idei-i-vdohnovenie;
- локализованные category_title/category_url;
- prev_url / prev_title на UA 1044;
- title / seo_title / seo_description;
- image_src / image dimensions / image_alt;
- shop_opportunities сохранён.

shop_opportunities:

- product: neutral-piping-gel
- context: water-decoration
- status: candidate

---

## Внутренняя перелинковка

Реализовано.

Исходящие из 1045:

RU:
- /mastika-dlya-lepki-figurok/
- /kak-sushit-figurki-iz-mastiki/
- /kak-ukrasit-tort-dlya-muzhchiny/

UA:
- /uk/mastika-dlya-liplennya-figurok/
- /uk/yak-sushyty-fihurky-z-mastyky/
- /uk/yak-prykrasyty-tort-dlya-cholovika/

Входящая из хаба 1043:

RU:
- /kak-ukrasit-tort-dlya-muzhchiny/ → /tort-dlya-rybaka/

UA:
- /uk/yak-prykrasyty-tort-dlya-cholovika/ → /uk/tort-dlya-rybalky/

Линейная навигация:

1044 RU:
- next_url: ../tort-dlya-rybaka/
- next_title: "Торт для рыбака: как украсить своими руками"

1044 UA:
- next_url: ../tort-dlya-rybalky/
- next_title: "Торт для рибалки: як прикрасити своїми руками"

---

## Изображения

Статус:

в работе

Требуется:

- утвердить главное изображение статьи;
- определить необходимость дополнительных пошаговых изображений:
  - поплавок + леска;
  - сачок;
  - мастичный вариант.

Принцип подготовки:

генерация
→ визуальная оценка
→ корректировка
→ утверждение
→ интеграция

В production добавляются только утверждённые изображения.

---

## Git состояние

Репозиторий:

D:\Git\tortopedia

Branch:

main

Последний commit:

739b1b8 Update article workflow state

Текущее рабочее дерево после последней проверки:

modified:
- src/kak-ukrasit-tort-dlya-muzhchiny/index.html
- src/tort-dlya-rybaka/index.html
- src/tort-futbolnoe-pole/index.html
- src/uk/tort-futbolne-pole/index.html
- src/uk/yak-prykrasyty-tort-dlya-cholovika/index.html

untracked:
- src/uk/tort-dlya-rybalky/

Примечание:

- UA 1045 пока не добавлен в index;
- commit/push текущих изменений не выполнялись;
- RU 1045 при безопасной перезаписи был приведён к UTF-8 без BOM;
- предупреждения Git о LF → CRLF есть, но git diff --check ошибок не показывает.

---

## Незавершённое

По статье 1045:

- подготовить и утвердить изображения;
- интегрировать изображения;
- проверить итоговую RU/UA эквивалентность;

---

## Следующий шаг

Провести финальную техническую проверку UA source:

- BOM;
- href;
- случайные русские фрагменты.

После этого перейти к визуальной подготовке статьи.

---

## Ограничения

- работать по одному шагу;
- ++, +++, ++++ подтверждают только текущий шаг;
- не перескакивать через этапы регламента;
- фактические файлы и Git имеют приоритет над snapshot;
- RU и UA проверять отдельно;
- production HTML вручную не редактировать;
- изображения интегрировать только после утверждения;
- PowerShell-команды давать одной физической строкой;
- не использовать PowerShell here-string с кириллицей для записи HTML;
- не трогать незапланированные изменения;
- перед commit показать, что именно будет добавлено;
- не использовать git add . для targeted commit;
- commit/push только после отдельного разрешения.
