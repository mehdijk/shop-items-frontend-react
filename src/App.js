import React, { useState } from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleEdit = (item) => {
    setSelectedItem(item);
  };

  const handleSave = () => {
    setSelectedItem(null);
  };

  return (
    <div>
      <h1>Shop Management</h1>
      <ItemForm selectedItem={selectedItem} onSave={handleSave} />
      <ItemList onEdit={handleEdit} />
    </div>
  );
};

export default App;
