import React, { useState, useEffect } from "react";
import { createItem, updateItem } from "../services/api";
import { TextField, Button, Box, Container, Typography } from "@mui/material";
import { useNavigate , useLocation } from "react-router-dom";
import { getItems } from '../services/api';


const ItemForm = () => {
  const [item, setItem] = useState({ name: "", description: "", price: 0, quantity: 0 });
  const location = useLocation();
  const navigate = useNavigate ();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      // Fetch the item for update (you should add API to get by id)
      const fetchItem = async () => {
        const response = await getItems(); // Modify to get a single item by ID
        setItem(response.data.find((i) => i.id === parseInt(id)));
      };
      fetchItem();
    }
  }, [location]);

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
    navigate("/");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {item.id ? "Edit Item" : "Add Item"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={item.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          value={item.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
        />
        <TextField
          label="Price"
          name="price"
          value={item.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          value={item.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
          required
        />
        <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
          {item.id ? "Update" : "Create"} Item
        </Button>
      </Box>
    </Container>
  );
};

export default ItemForm;
