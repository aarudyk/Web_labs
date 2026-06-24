import { useState } from "react";
import { createLocalId } from "../utils/helpers";

const initialFormState = {
  title: "",
  author: "",
  year: "",
  genre: "",
  rating: "4",
  description: "",
};

function AddItemForm({ onAdd }) {
  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const title = formData.title.trim();
    if (!title) {
      return;
    }

    const newItem = {
      id: createLocalId(),
      title,
      author: formData.author.trim() || "Невідомий автор",
      year: formData.year ? Number(formData.year) : null,
      genre: formData.genre.trim() || "Загальне",
      rating: Number(formData.rating) || 4,
      image: null,
      description: formData.description.trim() || "Додано користувачем.",
    };

    onAdd(newItem);
    setFormData(initialFormState);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Назва *
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Назва книги"
            required
          />
        </label>
        <label>
          Автор
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Автор"
          />
        </label>
        <label>
          Рік
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="2024"
            min="1000"
            max="2100"
          />
        </label>
        <label>
          Жанр
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Наука, Роман..."
          />
        </label>
        <label>
          Рейтинг
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="1"
            max="5"
            step="0.1"
          />
        </label>
        <label className="form-full">
          Опис
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Короткий опис"
          />
        </label>
      </div>
      <button type="submit" className="button button-primary">
        Додати книгу
      </button>
    </form>
  );
}

export default AddItemForm;
