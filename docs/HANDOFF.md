# HANDOFF.md

Дата: 2026-09-20

## 1. Проект

Tortopedia — статический RU/UA сайт о мастике и декоре тортов.

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

Фактическое состояние Git всегда приоритетнее HANDOFF.

Последний известный remote HEAD на момент завершения сессии:

```text
041281f Checkpoint current session after connectivity loss
```

Перед любыми новыми правками сверить local HEAD и remote.

---

## 3. Что завершено 2026-09-20

Полностью опубликована новая bilingual статья:

RU:

```text
https://tortopedia.in.ua/kak-hranit-tort-s-mastikoi/
```

UA:

```text
https://tortopedia.in.ua/uk/yak-zberigaty-tort-z-mastykoyu/
```

Глобальный:

```text
post_id: 1042
```

Основной commit публикации:

```text
e10dffc Publish cake storage guide
```

После этого добавлены три inline-иллюстрации в обе языковые версии:

1. торт в коробке в холодильнике;
2. конденсат на мастике;
3. перевозка торта в коробке на ровной поверхности в багажнике.

Commit:

```text
a1e917c Add inline images to cake storage guide
```

Responsive WebP:

```text
480 / 865 / 1200 / original
```

Basename:

```text
kak-hranit-tort-s-mastikoi-holodilnik
kak-hranit-tort-s-mastikoi-kondensat
kak-hranit-tort-s-mastikoi-perevozka
```

Проверено:

- RU production открывается;
- UA production открывается;
- изображения присутствуют в generated и production HTML;
- srcset корректный;
- category listing формируется автоматически;
- XML sitemap содержит материал;
- HTML sitemap обновлён;
- prev/next навигация для материала 1042 настроена;
- публикация и push завершены.

---

## 4. Регламент производства статей

Создан отдельный документ:

```text
docs/ARTICLE_PRODUCTION_REGULATION.md
```

Commit:

```text
c2b14cc Add article production regulation
```

Регламент обязателен для следующих публикаций.

Ключевые правила:

- сначала тема / intent / проверка каннибализации;
- затем глобальный post_id = max + 1;
- структура статьи до написания;
- RU и UA обязательны в одном цикле;
- image plan до генерации;
- hero: 2 ChatGPT prompt + 2 Gemini prompt;
- каждый inline: 1 ChatGPT prompt + 1 Gemini prompt;
- изображения не генерировать до согласования prompt;
- после утверждения визуалов делать WebP/srcset;
- HTML sitemap RU/UA проверять вручную;
- XML sitemap формируется автоматически;
- build -> _site-pilot check -> publish.ps1 -> diff -> staged review -> commit/push;
- HANDOFF обновлять только при завершении сессии.

---

## 5. Current session state

После кратковременного обрыва интернета состояние сессии отдельно зафиксировано в:

```text
docs/CURRENT_SESSION_STATE.md
```

Commit:

```text
041281f Checkpoint current session after connectivity loss
```

Там зафиксированы:

- публикация статьи 1042;
- article production regulation;
- inline-изображения;
- текущие basename;
- следующий свободный глобальный ID:

```text
1043
```

---

## 6. GSC — исторические мусорные 404

В GSC обнаружено несколько тысяч странных URL вида:

```text
/about/index/uk/html-sitemap/pashalnye-figurki-iz-mastiki/uk/
```

и более длинных рекурсивных цепочек.

Проведена диагностика.

Факты:

- такие URL сейчас отдают настоящий HTTP 404;
- в текущем `_site-pilot` источник рекурсивных голых относительных ссылок не найден;
- проверка показала, что свежих сканирований этих «монстров» нет;
- в старых URL Inspection Google показывает источниками другие такие же мусорные URL;
- один пример был последний раз просканирован 4 апреля 2026;
- это выглядит как исторический хвост старой рекурсивной генерации относительных URL;
- новые такие URL сейчас не появляются.

Решение:

- не делать массовые 301 на мусор;
- не использовать инструмент Removals ради очистки отчёта;
- оставить корректный 404;
- старые записи должны постепенно выпадать из отчёта сами.

Эта проблема не должна блокировать новые публикации.

---

## 7. GSC — sitemap

Sitemap:

```text
https://tortopedia.in.ua/sitemap.xml
```

На 2026-09-20:

- статус — обработан успешно;
- последнее чтение — 20.09.26;
- обнаружено URL — 66;
- видео — 0.

Следовательно, sitemap технически работает.

Повторно отправлять sitemap после каждой статьи не обязательно.

---

## 8. GSC — индексация новых статей

Проверены несколько нормальных страниц.

### «Как сушить фигурки из мастики»

RU:

```text
https://tortopedia.in.ua/kak-sushit-figurki-iz-mastiki/
```

Страница уже индексируется.

UA:

```text
https://tortopedia.in.ua/uk/yak-sushyty-fihurky-z-mastyky/
```

Статус:

```text
Crawled — currently not indexed
```

При этом:

- сканирование разрешено;
- загрузка успешна;
- индексирование разрешено;
- canonical self;
- UA-категория `/uk/category/vse-o-mastike/` индексируется.

Вывод: сам `/uk/` не является проблемой.

### KMC

RU:

```text
https://tortopedia.in.ua/kmc-dlya-mastiki/
```

UA:

```text
https://tortopedia.in.ua/uk/kmc-dlya-mastyky/
```

Обе пока не индексируются.

Для RU KMC:

- последний обход — 19.09.2026;
- загрузка успешна;
- индексирование разрешено;
- canonical, указанный пользователем — self;
- Google выбрал тот же canonical;
- в «Страницы, что ссылаются» Google пока видит только sitemap.

### «Мастика для лепки фигурок»

RU:

```text
https://tortopedia.in.ua/mastika-dlya-lepki-figurok/
```

На момент проверки:

```text
Crawled — currently not indexed
```

Последний обход — 19.09.2026 поздно вечером.

Вывод по GSC:

- технических признаков блокировки нет;
- canonical/hreflang схема рабочая;
- RU в корне + UA в `/uk/` — нормальная архитектура;
- не переводить RU в `/ru/`;
- не ставить UA canonical на RU;
- не удалять UA;
- не объединять языковые версии;
- свежим страницам дать несколько дней после обхода;
- не дёргать Indexing Request ежедневно.

---

## 9. Архитектура RU / UA

Текущая схема остаётся:

RU:

```text
https://tortopedia.in.ua/slug/
```

UA:

```text
https://tortopedia.in.ua/uk/slug/
```

Это не критично и менять не нужно.

Требования:

- self-canonical у каждой версии;
- взаимные `hreflang ru-UA / uk-UA`;
- корректный `lang`;
- отдельный переведённый основной контент;
- стабильные URL;
- внутренняя перелинковка обеих версий.

---

## 10. Найденная мелкая проблема в статье о сушке

В паре «Как сушить фигурки» обнаружено отличие:

UA в блоке:

```text
Як швидко висушити фігурки з мастики
```

использует отдельное изображение:

```text
kak-sushit-figurki-ventilyator-865.jpg
```

RU в соответствующем месте повторно использует hero через `{{ image_src }}`.

Это не похоже на причину проблем индексации, но это реальный контентный/визуальный дефект.

На следующей сессии можно исправить RU-блок на отдельное изображение вентилятора, если файл уже существует в uploads.

Не начинать с этого автоматически — сначала проверить Git и решить приоритет.

---

## 11. Что делать завтра

### Приоритет 1 — GSC

Не ломать архитектуру сайта.

Проверить через 3–7 дней после последних обходов:

```text
/kmc-dlya-mastiki/
/uk/kmc-dlya-mastyky/
/mastika-dlya-lepki-figurok/
/uk/mastika-dlya-liplennya-figurok/
/uk/yak-sushyty-fihurky-z-mastyky/
```

Для новых страниц запрос индексации делать один раз после публикации/проверки sitemap, без ежедневных повторов.

Для статьи 1042:

```text
/kak-hranit-tort-s-mastikoi/
/uk/yak-zberigaty-tort-z-mastykoyu/
```

если запрос на индексацию ещё не отправлен — отправить обе версии.

### Приоритет 2 — мелкая правка статьи о сушке

Проверить, есть ли RU inline-файл вентилятора:

```text
wp-content/uploads/2026/09/kak-sushit-figurki-ventilyator-*.jpg
```

Если есть — заменить повтор hero в RU на соответствующий inline image, затем обычный build/publish/diff cycle.

### Приоритет 3 — следующий контент

После закрытия коротких технических хвостов выбрать новый самостоятельный кластер через:

```text
docs/CONTENT_PLAN.md
docs/TORTOPEDIA-Semanticheskoe-YADRO.xlsx
docs/CONTENT_MAP.md
```

Не развивать отдельный обзор `CMC / Tylose / Gum-Tex / трагакант` без нового исследования, чтобы не создать каннибализацию с KMC.

Следующий глобальный ID:

```text
1043
```

---

## 12. Рабочие правила

Пользователь предпочитает:

- один следующий шаг за раз;
- `+++` / `++` = предыдущий шаг выполнен, дать только следующий;
- PowerShell-команды одной строкой;
- `git add` одной строкой через `&&`;
- сначала проверить факты, затем менять;
- не делать scope creep;
- не commit/push без явного подтверждения;
- RU и UA проверять отдельно;
- перед commit смотреть staged diff;
- использовать `git diff --check`.

Публикация:

```text
npm run build
-> проверить _site-pilot
-> .\publish.ps1
-> git diff
-> git diff --check
-> git add
-> staged diff/stat
-> commit
-> push
-> production check
```

---

## 13. Итог дня

За 2026-09-20 закрыты:

- статья «Как хранить торт с мастикой» RU/UA;
- hero + 3 inline visuals;
- responsive WebP/srcset;
- публикация и push;
- article production regulation;
- checkpoint current session state;
- диагностика исторических GSC 404;
- проверка sitemap;
- проверка нескольких RU/UA индексаций;
- подтверждение, что архитектуру RU root + UA /uk/ менять не нужно.

На следующей сессии начать с Git status/log, затем коротко закрыть GSC/indexing хвосты и только после этого переходить к следующему контентному кластеру.
