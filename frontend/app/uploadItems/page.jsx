"use client";

import { useState } from "react";
import { useItemStore } from "../../store/item.store";

const UploadItem = () => {
  const addItem = useItemStore((state) => state.addItem);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "vehicle",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await addItem({
      ...formData,
      price: Number(formData.price),
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">
        <h1 className="mb-6 text-3xl font-semibold">Upload Item</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none ring-0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none ring-0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none ring-0"
            >
              <option value="vehicle">Vehicle</option>
              <option value="electronics">Electronics</option>
              <option value="cosmatics">Cosmatics</option>
              <option value="greocery">Greocery</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0"
              required
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 outline-none ring-0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
              className="w-full rounded-lg border border-dashed border-slate-700 bg-slate-800 px-4 py-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-medium transition hover:bg-blue-700"
          >
            Upload Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadItem;
