import ItemCard from "./ItemCard";

function ItemList({ items, onDelete, onRateUp }) {
  return (
    <ul className="item-list">
      {items.map((item) => (
        <li key={item.id}>
          <ItemCard
            {...item}
            onDelete={() => onDelete(item.id)}
            onRateUp={() => onRateUp(item.id)}
          />
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
