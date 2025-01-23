import React, { useState, useEffect } from "react";
import { createItem, updateItem } from "../services/api";

const ItemForm = ({ selectedItem, onSave }) => {
  const [item, setItem] = useState({ name: "", description: "", price: 0, quantity: 0 });

  useEffect(() => {
    if (selectedItem) setItem(selectedItem);
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item.id) {
      await updateItem(item.id, item);
    } else {
      await createItem(item);
    }
    onSave();
    setItem({ name: "", description: "", price: 0, quantity: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{item.id ? "Edit Item" : "Add Item"}</h2>
      <input
        type="text"
        name="name"
        value={item.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <textarea
        name="description"
        value={item.description}
        onChange={handleChange}
        placeholder="Description"
        required
      ></textarea>
      <input
        type="number"
        name="price"
        value={item.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="quantity"
        value={item.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default ItemForm;
