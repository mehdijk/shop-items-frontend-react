import React, { useState, useEffect } from "react";
import { createItem, updateItem, getItems, generateDescription } from "../services/api";
import { TextField, Button, Box, Container, Typography, CircularProgress, Tooltip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const ItemForm = () => {
  const [item, setItem] = useState({ name: "", description: "", price: 0, quantity: 0 });
  const [loadingDescription, setLoadingDescription] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");
    if (id) {
      // Fetch the item for update
      const fetchItem = async () => {
        try {
          const response = await getItems();
          const foundItem = response.data.find((i) => i.id === parseInt(id));
          if (foundItem) {
            setItem(foundItem);
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      };
      fetchItem();
    }
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (item.id) {
        await updateItem(item.id, item); // Update the item in the backend
      } else {
        await createItem(item); // Create a new item
      }
      navigate("/"); // Navigate back to the home page
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to save the item. Please try again.");
    }
  };

  const generateDescriptionHandler = async () => {
    if (!item.name.trim()) {
      alert("Please enter the item's name before generating a description.");
      return;
    }

    try {
      setLoadingDescription(true);
      const response = await generateDescription(item.name);
      setItem((prevState) => ({
        ...prevState,
        description: response.data,
      }));
    } catch (error) {
      console.error("Error generating description:", error);
      alert("Failed to generate description. Please try again.");
    } finally {
      setLoadingDescription(false);
    }
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
        <Box display="flex" alignItems="center" gap={2} marginBottom={2}>
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
          <Tooltip title="Automatically generate a description based on the item name">
            <Button
              variant="contained"
              color="secondary"
              onClick={generateDescriptionHandler}
              disabled={loadingDescription}
            >
              {loadingDescription ? <CircularProgress size={24} /> : "Generate"}
            </Button>
          </Tooltip>
        </Box>
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
