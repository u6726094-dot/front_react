import { useEffect, useRef, useState } from "react";

export default function TestAPI() {
  const [items, setItems] = useState([]);
  const itemNameRef = useRef();
  const itemCategoryRef = useRef();
  const itemPriceRef = useRef();

  async function loadItems() {
    const response = await fetch("http://localhost:3000/api/item");
    const data = await response.json();
    setItems(data);
  }

  async function onItemSave() {
    const body = {
      itemName: itemNameRef.current.value,
      itemCategory: itemCategoryRef.current.value,
      itemPrice: itemPriceRef.current.value,
    };

    await fetch("http://localhost:3000/api/item", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div>
      <h2>Items</h2>

      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.itemName} - {item.itemCategory} - ${item.itemPrice}
          </li>
        ))}
      </ul>

      <h3>Add Item</h3>

      <input placeholder="Name" ref={itemNameRef} />
      <input placeholder="Category" ref={itemCategoryRef} />
      <input placeholder="Price" ref={itemPriceRef} />
      <button onClick={onItemSave}>Add</button>
    </div>
  );
}
