# Tortopedia — DEPLOYMENT

## Production

Сайт: `https://tortopedia.in.ua/`

Репозиторий: `saitkharkov-cyber/tortopedia`

Production branch: `main`

## Схема

`локальная рабочая копия → GitHub main → Cloudflare Pages → tortopedia.in.ua`

Cloudflare Pages настроен на автоматический deploy после push.

Сайт публикуется как статический HTML/CSS/JS.

## Текущий принцип публикации

В GitHub попадает уже готовый статический сайт. Cloudflare Pages используется как площадка публикации, а не как место, где принимаются решения о структуре HTML.

Если в будущем будет внедрён Eleventy (11ty), сборка должна выполняться локально:

`исходники/шаблоны → локальная 11ty-сборка → проверка готового HTML → GitHub → Cloudflare Pages`.

Это позволяет до push проверить фактический HTML, SEO-разметку, URL и diff.

## Обычный рабочий цикл

Сначала получить актуальное состояние репозитория и проверить рабочее дерево.

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

После push дождаться завершения Cloudflare Pages deployment.

## Проверка production после deploy

Минимальный smoke-test:
- открыть `/`;
- открыть `/uk/`;
- открыть одну русскую внутреннюю статью;
- открыть одну украинскую внутреннюю статью;
- проверить Console на JavaScript errors;
- проверить Network на 404/5xx для локальных CSS/JS/images;
- убедиться, что главные слайдеры работают на обеих языковых главных.

После SEO-изменений дополнительно проверить:
- canonical;
- hreflang;
- статус и адрес редиректов;
- отсутствие неожиданных изменений URL;
- sitemap/robots при их изменении.

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

## Responsive images

Будущая оптимизация контентных изображений должна выполняться до публикации и быть проверяемой локально.

Для одинакового изображения разных размеров использовать `srcset` + `sizes`, с вариантами 1x / 2x / 3x по фактической ширине в макете. Типовой ориентир: `480w / 960w / 1440w`, если исходник позволяет.

`<picture>` нужен только при смене источника/кропа/формата, а не как обязательная оболочка каждого `<img>`.
