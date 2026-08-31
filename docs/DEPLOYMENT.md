# Tortopedia — DEPLOYMENT

## Production

Сайт: `https://tortopedia.in.ua/`

Репозиторий: `saitkharkov-cyber/tortopedia`

Production branch: `main`

## Схема

GitHub `main` → Cloudflare Worker → Static Assets → `tortopedia.in.ua`

Cloudflare настроен на автоматический deploy после push.

## Конфигурация

`wrangler.jsonc`:

```json
{
  "name": "tortopedia",
  "compatibility_date": "2026-08-28",
  "assets": {
    "directory": "."
  }
}
```

`.assetsignore` должен исключать Git-служебные данные:

```text
**/.git
```

Причина: без исключения Cloudflare пытался публиковать `.git/objects/...`, включая pack-файл больше допустимого размера.

## Обычный рабочий цикл

Проверка:

```powershell
git status
git diff --stat
git diff --check
```

Коммит:

```powershell
git add . && git commit -m "Описание изменений"
```

Публикация:

```powershell
git push origin main
```

После push дождаться завершения Cloudflare deployment.

## Проверка production после deploy

Минимальный smoke-test:
- открыть `/`;
- открыть `/uk/`;
- открыть одну русскую внутреннюю статью;
- открыть одну украинскую внутреннюю статью;
- проверить Console на JavaScript errors;
- проверить Network на 404/5xx для локальных CSS/JS/images;
- убедиться, что главные слайдеры работают на обеих языковых главных.

## Важные ресурсы

Общий CSS:

`/tortopedia.css`

jQuery:

`/wp-includes/js/jquery/jquery.js`

LightSlider должен требоваться только на двух главных страницах.

## Локальное обновление после изменений, сделанных напрямую в GitHub

Из `D:\Git\tortopedia`:

```powershell
git pull origin main
```

Затем:

```powershell
git status
```

Ожидаем чистое рабочее дерево.
