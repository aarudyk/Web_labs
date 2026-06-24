function ItemCard({ title, image, description, rating, author, year, genre, onDelete, onRateUp }) {
  return (
    <article className="item-card">
      <div className="item-card-image-wrap">
        {image ? (
          <img src={image} alt={`Обкладинка: ${title}`} className="item-card-image" />
        ) : (
          <div className="item-card-placeholder">📚</div>
        )}
      </div>
      <div className="item-card-body">
        <h3 className="item-card-title">{title}</h3>
        <p className="item-card-meta">
          {author}
          {year ? ` · ${year}` : ""}
        </p>
        <p className="item-card-genre">{genre}</p>
        <p className="item-card-description">{description}</p>
        <div className="item-card-actions">
          <span className="item-card-rating">★ {rating.toFixed(1)}</span>
          <button type="button" className="button button-secondary" onClick={onRateUp}>
            + рейтинг
          </button>
          <button type="button" className="button button-danger" onClick={onDelete}>
            Видалити
          </button>
        </div>
      </div>
    </article>
  );
}

export default ItemCard;
