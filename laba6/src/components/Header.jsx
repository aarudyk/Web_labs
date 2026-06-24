import Section from "./Section";

function Header({ searchQuery, onSearch }) {
  return (
    <header className="header">
      <div>
        <h1>Book Catalog</h1>
        <p className="subtitle">Артем Рудик, група 136 — React + Vite</p>
      </div>
      <label className="search-field">
        <span className="visually-hidden">Пошук книг</span>
        <input
          type="search"
          className="search-input"
          placeholder="Пошук за назвою, автором або жанром..."
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>
    </header>
  );
}

export default Header;
