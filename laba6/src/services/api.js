const API_URL = "https://openlibrary.org/search.json";

export async function fetchBooks(signal) {
  const response = await fetch(
    `${API_URL}?q=javascript&limit=20&fields=key,title,author_name,first_publish_year,subject,cover_i,edition_count`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Помилка завантаження каталогу");
  }

  const data = await response.json();
  return data.docs ?? [];
}

export function mapBookFromApi(doc, index) {
  const editionCount = doc.edition_count ?? 1;

  return {
    id: doc.key ?? `api-${index}`,
    title: doc.title ?? "Без назви",
    author: doc.author_name?.[0] ?? "Невідомий автор",
    year: doc.first_publish_year ?? null,
    genre: doc.subject?.[0] ?? "Загальне",
    rating: Math.min(5, Math.max(1, Math.round(editionCount / 10) + 2)),
    image: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    description: `Книга з жанру «${doc.subject?.[0] ?? "загальне"}».`,
  };
}
