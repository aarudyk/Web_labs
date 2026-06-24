function Filter({ filterValue, genres, onFilterChange }) {
  return (
    <div className="filter">
      <label htmlFor="filter-select">Фільтр / сортування</label>
      <select
        id="filter-select"
        className="filter-select"
        value={filterValue}
        onChange={(event) => onFilterChange(event.target.value)}
      >
        <option value="all">За назвою (А–Я)</option>
        <option value="rating-high">Рейтинг: від високого</option>
        <option value="rating-low">Рейтинг: від низького</option>
        <option value="year-new">Рік: новіші</option>
        <option value="year-old">Рік: старіші</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            Жанр: {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;
