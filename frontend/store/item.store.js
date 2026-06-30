import { create } from "zustand";
import axios from "axios";
import { toast } from "sonner";
import { BACKEND_BASE_URL } from "../constants";

export const useItemStore = create((set, get) => ({
  items: [],

  getItems: async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/api/items/get-items`);

      set({ items: response.data.items || [] });
    } catch (error) {
      console.error("Failed to fetch items", error);
      toast.error("Failed to load items");
    }
  },

  addItem: async (input) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first");
        return;
      }

      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price);
      formData.append("category", input.category);

      if (input.image) {
        formData.append("image", input.image);
      }

      const response = await axios.post(`${BACKEND_BASE_URL}/api/items/add-item`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(response.data.message || "Item added successfully");
      await get().getItems();
    } catch (error) {
      console.error("Failed to add item", error);
      toast.error(error.response?.data?.message || "Failed to add item");
    }
  },
}));