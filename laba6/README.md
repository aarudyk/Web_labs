# Лабораторна робота 6 — React Book Catalog

Каталог книг на **React + Vite** для **Артем Рудик**, група 136.

**Гілка:** `lab-06`  
**Репозиторій:** [github.com/aarudyk/Web_labs](https://github.com/aarudyk/Web_labs)

## Тема

Каталог книг з [Open Library API](https://openlibrary.org/developers/api).

## Компоненти

- `App` — стан, `useEffect`, API
- `Header` — пошук
- `Filter` — фільтр / сортування
- `ItemList` + `ItemCard` — список карток
- `AddItemForm` — додавання книги
- `Section` — обгортка з `children`

## Можливості

- Завантаження книг з API (`useEffect` + `AbortController`)
- Пошук, фільтр за жанром, сортування за рейтингом/роком
- Додавання, видалення, збільшення рейтингу
- Умовний рендеринг: loading / error / empty / data

## Запуск

```bash
cd laba6
npm install
npm run dev
```

Відкрийте URL з термінала (зазвичай http://localhost:5173).

## Збірка

```bash
npm run build
```
