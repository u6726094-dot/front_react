import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export function ItemDetail() {
  const { id } = useParams();

  const itemNameRef = useRef();
  const itemCategoryRef = useRef();
  const itemPriceRef = useRef();

  async function loadItem() {
    const uri = `http://localhost:3000/api/item/${id}`;
    const result = await fetch(uri);
    const data = await result.json();

    itemNameRef.current.value = data.itemName;
    itemCategoryRef.current.value = data.itemCategory;
    itemPriceRef.current.value = data.itemPrice;
  }

  async function onUpdate() {
    const body = {
      name: itemNameRef.current.value,
      category: itemCategoryRef.current.value,
      price: itemPriceRef.current.value,
    };

    const uri = `http://localhost:3000/api/item/${id}`;

    await fetch(uri, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    loadItem();
  }

  useEffect(() => {
    loadItem();
  }, []);

  return (
    <div>
      <h2>Edit Item</h2>

      <input type="text" ref={itemNameRef} /><br /><br />

      <select ref={itemCategoryRef}>
        <option>Stationary</option>
        <option>Kitchenware</option>
        <option>Appliance</option>
      </select><br /><br />

      <input type="text" ref={itemPriceRef} /><br /><br />

      <button onClick={onUpdate}>Update</button>
    </div>
  );
}
