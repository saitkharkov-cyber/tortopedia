# CURRENT SESSION STATE

Дата: 2026-09-15
Проект: Tortopedia

## Фактическое состояние

Основной и единственный Git-репозиторий проекта:

```text
D:\Git\tortopedia
```

Удалённый репозиторий:

```text
saitkharkov-cyber/tortopedia
```

Рабочая документация теперь находится внутри основного репозитория:

```text
D:\Git\tortopedia\docs
```

Отдельный рабочий репозиторий `tortopedia-docs` больше не используется как основная рабочая копия.

## Сайт

- статья «Как хранить фигурки из мастики» опубликована;
- RU и UA страницы проверены;
- sitemap обновлён;
- обе новые URL отправлены в Google Search Console;
- текущий `main` основного репозитория на последней проверке: `623aec2 Add fondant figurine storage article`.

## Документация

В `docs/` собраны:

- `START_SESSION.md`;
- `CHATGPT_WORKFLOW_RULES.md`;
- `CHATGPT_WORKFLOW_REFERENCE.md`;
- `CURRENT_SESSION_STATE.md`;
- `HANDOFF.md`;
- `TORTOPEDIA_CONTENT_STYLE_GUIDE.md`;
- `CONTENT_PLAN.md`;
- `AUDIENCE.md`;
- `CONTENT_MAP.md`;
- `ROADMAP.md`;
- `STRATEGY.md`;
- `DECISIONS.md`;
- `DEPLOYMENT.md`.

Старый `docs/START_HERE.md` удалён.

Корневые:

- `AUDIENCE.md`;
- `CONTENT_MAP.md`;
- `HANDOFF.md`;
- `ROADMAP.md`;
- `STRATEGY.md`

перенесены в `docs/`.

## Архитектура документации

`docs/` является обычной частью основного репозитория `tortopedia` и отслеживается тем же Git.

Отдельной Git-истории для документации больше нет.

Все Git-команды выполняются из:

```text
D:\Git\tortopedia
```

`docs/` не должна попадать в production-сборку сайта.

При текущей конфигурации Eleventy:

```text
input:  src
output: _site-pilot
```

папка `docs/`, находящаяся вне `src/`, в сборку сайта не входит.

## Что уже актуализировано

Под новую схему с одним репозиторием приведены:

- `START_SESSION.md`;
- `CHATGPT_WORKFLOW_RULES.md`;
- `CHATGPT_WORKFLOW_REFERENCE.md`.

Старая схема с `tortopedia-docs` как вложенным отдельным Git больше не используется.

## Что ещё требует проверки

Нужно проверить на актуальность:

- `HANDOFF.md`;
- `DECISIONS.md`;
- `DEPLOYMENT.md`;
- `CONTENT_MAP.md`.

Особенно важно убрать старые упоминания:

- отдельного Git для документации;
- старых этапов миграции;
- устаревших следующих шагов;
- устаревшего статуса Eleventy;
- уже завершённых контентных задач.

## Текущая задача

Завершить ревизию документации после объединения репозиториев.

## Следующий шаг

Проверить и актуализировать `HANDOFF.md`.
