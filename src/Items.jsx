import { useEffect, useRef, useState } from "react";

export function Items() {
  const [items, setItems] = useState([]);
  const itemNameRef = useRef();
  const itemCategoryRef = useRef();
  const itemPriceRef = useRef();

  async function loadItems() {
    try {
      const response = await fetch("http://localhost:3000/api/item");
      const data = await response.json();
      setItems(data);
    } catch (err) {
      alert("Loading items failed");
    }
  }

  async function onItemSave() {
    const uri = "http://localhost:3000/api/item";

    const body = {
      name: itemNameRef.current.value,
      category: itemCategoryRef.current.value,
      price: itemPriceRef.current.value,
    };

    await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    loadItems();
  }

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item._id}</td>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemPrice}</td>
              <td>
                <a href={`/items/${item._id}`}>Edit</a>
              </td>
            </tr>
          ))}

          <tr>
            <td>-</td>
            <td><input type="text" ref={itemNameRef} /></td>
            <td>
              <select ref={itemCategoryRef}>
                <option>Stationary</option>
                <option>Kitchenware</option>
                <option>Appliance</option>
              </select>
            </td>
            <td><input type="text" ref={itemPriceRef} /></td>
            <td>
              <button onClick={onItemSave}>Add Item</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
