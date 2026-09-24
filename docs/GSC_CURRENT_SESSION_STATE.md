# Tortopedia GSC — Current Session State

Дата обновления: 2026-09-24

## Назначение

Этот статусник относится только к проекту Tortopedia GSC и используется для контроля индексации, Google Search Console и связанных технических сигналов сайта:

```text
https://tortopedia.in.ua/
```

Основной проект разработки Tortopedia ведётся отдельно.

Здесь не развивать контент-план, дизайн или новые статьи без прямой необходимости для диагностики индексации.

---

## 1. Репозиторий и базовые ссылки

GitHub:

```text
saitkharkov-cyber/tortopedia
```

Branch:

```text
main
```

XML sitemap:

```text
https://tortopedia.in.ua/sitemap.xml
```

Основной статусник проекта разработки:

```text
docs/CURRENT_SESSION_STATE.md
```

Статусник GSC:

```text
docs/GSC_CURRENT_SESSION_STATE.md
```

---

## 2. Текущее состояние sitemap

После публикации материала 1044 локальный production `sitemap.xml` содержит:

```text
72 URL
```

Google Search Console на момент проверки 2026-09-24 всё ещё показывает:

```text
70 URL
```

Рабочая гипотеза:

```text
GSC ещё не переобработал обновлённый sitemap
```

Не считать это доказанной технической ошибкой, пока production sitemap доступен и содержит 72 URL.

---

## 3. Основная проблема индексации

В GSC есть группа:

```text
Просканировано — сейчас не проиндексировано
```

На 2026-09-24 в ней:

```text
20 URL
```

Проверка исправления:

```text
Начато: 19.09.2026
Проверку не пройдено: 22.09.2026
Статус проверки: ошибка
```

Важно: этот статус сам по себе не означает, что страницы технически сломаны. Он означает, что Google повторно обнаружил URL с тем же состоянием.

---

## 4. Примеры URL из группы «Просканировано — сейчас не проиндексировано»

Среди 20 URL есть как новые важные материалы, так и старые/сезонные страницы.

Новые и важные примеры:

```text
https://tortopedia.in.ua/mastika-dlya-lepki-figurok/
https://tortopedia.in.ua/uk/mastika-dlya-liplennya-figurok/
https://tortopedia.in.ua/kmc-dlya-mastiki/
https://tortopedia.in.ua/uk/kmc-dlya-mastyky/
https://tortopedia.in.ua/uk/yak-sushyty-fihurky-z-mastyky/
https://tortopedia.in.ua/uk/yak-zberigaty-tort-z-mastykoyu/
https://tortopedia.in.ua/uk/yak-zberigaty-fihurky-z-mastyky/
```

Старые/сезонные примеры:

```text
https://tortopedia.in.ua/kak-ukrasit-tort-na-noviy-god-v-domashnih-usloviyah/
https://tortopedia.in.ua/uk/kak-ukrasit-tort-na-noviy-god-v-domashnih-usloviyah/
https://tortopedia.in.ua/kak-ukrasit-tort-na-1-sentyabrya/
https://tortopedia.in.ua/uk/kak-ukrasit-tort-na-1-sentyabrya/
https://tortopedia.in.ua/4-recepta-shokoladnoi-mastiki/
https://tortopedia.in.ua/uk/4-recepta-shokoladnoi-mastiki/
https://tortopedia.in.ua/pashalnye-figurki-iz-mastiki/
https://tortopedia.in.ua/uk/pashalnye-figurki-iz-mastiki/
https://tortopedia.in.ua/kak-pokrasit-mastiku-krasitelem/
https://tortopedia.in.ua/uk/kak-pokrasit-mastiku-krasitelem/
```

Отдельно присутствуют старые UA URL с русскими slug. Сам по себе русский slug внутри `/uk/` не считать причиной неиндексации без дополнительных доказательств.

---

## 5. Детальная проверка страницы mastika-dlya-lepki-figurok

Проверенная страница:

```text
https://tortopedia.in.ua/mastika-dlya-lepki-figurok/
```

GSC показал:

```text
Последнее сканирование: 19.09.2026 23:20:12
Googlebot: поисковый робот Googlebot для смартфонов
Сканирование разрешено: да
Загрузка страницы: успешно
Индексирование разрешено: да
```

Canonical пользователя:

```text
https://tortopedia.in.ua/mastika-dlya-lepki-figurok/
```

В блоке Sitemap отображалась:

```text
Временная ошибка обработки
```

При этом страница обнаружена через:

```text
https://tortopedia.in.ua/sitemap.xml
```

На момент этой проверки Google ещё не выбрал страницу для индекса.

---

## 6. Live Test этой страницы

Live-проверка выполнена 2026-09-24.

Результат:

```text
Google имеет доступ к этой URL-адресе
Страницу можно проиндексировать
```

Ошибок доступности или запрета индексирования не показано.

Рабочий вывод:

```text
Для этой страницы не видно технического запрета через robots/noindex/HTTP/canonical.
Текущий статус выглядит как решение Google пока не включать URL в индекс.
```

Не считать эту формулировку окончательным диагнозом для всех 20 URL.

---

## 7. Рабочая методика проекта GSC

Для каждой проблемной страницы отслеживать:

```text
URL
язык RU/UA
тип страницы
дата публикации
статус GSC
дата последнего сканирования
наличие в sitemap
canonical пользователя
canonical Google
сканирование разрешено?
индексирование разрешено?
результат Live Test
внутренние ссылки
дата запроса на индексирование
последующий результат
```

Разделять причины минимум на группы:

1. технические ошибки;
2. обнаружено, но не просканировано;
3. просканировано, но не проиндексировано;
4. дубли / canonical;
5. нормальные новые страницы, которым может требоваться время.

Главный принцип:

```text
сначала диагностировать причину, потом менять сайт
```

Не делать массовые переписывания или массовую переиндексацию без подтверждённой причины.

---

## 8. Ближайший план

Следующий рабочий этап:

1. собрать полный реестр всех 20 URL из группы «Просканировано — сейчас не проиндексировано»;
2. разделить их на новые важные / старые сезонные / старые UA URL / возможные дубли;
3. для приоритетных новых страниц последовательно проверить:
   - GSC details;
   - canonical;
   - sitemap;
   - Live Test;
   - внутренние ссылки;
4. после диагностики решать, где нужен запрос на индексирование, а где нужны изменения сайта;
5. отдельно перепроверить sitemap в GSC и переход с 70 на 72 URL.

---

## 9. Текущая контрольная точка

На момент фиксации:

- production sitemap содержит 72 URL;
- GSC показывает 70 URL в sitemap;
- в группе «Просканировано — сейчас не проиндексировано» 20 URL;
- страница `/mastika-dlya-lepki-figurok/` технически доступна Google и проходит Live Test;
- массовые изменения сайта пока не выполнялись;
- следующий полезный шаг — вести системный реестр проблемных URL и диагностировать их по одному.
