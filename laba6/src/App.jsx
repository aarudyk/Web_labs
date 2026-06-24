import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import Filter from "./components/Filter";
import ItemList from "./components/ItemList";
import AddItemForm from "./components/AddItemForm";
import { fetchBooks, mapBookFromApi } from "./services/api";
import { filterAndSortItems, getUniqueGenres } from "./utils/helpers";
import "./index.css";

function App() {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const docs = await fetchBooks(controller.signal);
        const mappedBooks = docs.map((doc, index) => mapBookFromApi(doc, index));
        setItems(mappedBooks);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Не вдалося завантажити дані");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadBooks();

    return () => controller.abort();
  }, []);

  const genres = useMemo(() => getUniqueGenres(items), [items]);

  const visibleItems = useMemo(
    () => filterAndSortItems(items, searchQuery, filterValue),
    [items, searchQuery, filterValue],
  );

  const handleAddItem = (newItem) => {
    setItems((prev) => [newItem, ...prev]);
  };

  const handleDeleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRateUp = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, rating: Math.min(5, Number((item.rating + 0.5).toFixed(1))) }
          : item,
      ),
    );
  };

  return (
    <div className="app">
      <Header searchQuery={searchQuery} onSearch={setSearchQuery} />

      <main className="main">
        <Section title="Фільтри">
          <Filter
            filterValue={filterValue}
            genres={genres}
            onFilterChange={setFilterValue}
          />
        </Section>

        <Section title="Додати книгу">
          <AddItemForm onAdd={handleAddItem} />
        </Section>

        <Section title="Каталог">
          {isLoading && <p className="status-message">Завантаження...</p>}
          {error && <p className="error-message">Помилка: {error}</p>}
          {!isLoading && !error && visibleItems.length === 0 && (
            <p className="status-message">Нічого не знайдено</p>
          )}
          {!isLoading && !error && visibleItems.length > 0 && (
            <ItemList
              items={visibleItems}
              onDelete={handleDeleteItem}
              onRateUp={handleRateUp}
            />
          )}
        </Section>
      </main>

      <footer className="footer">
        <a href="https://github.com/aarudyk/Web_labs/tree/lab-06" target="_blank" rel="noreferrer">
          github.com/aarudyk/Web_labs
        </a>
      </footer>
    </div>
  );
}

export default App;
