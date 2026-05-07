import React, { useState, useEffect } from "react";
import { Loader } from "../../components/Loader";

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  half_price?: string | null;
  full_price: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

interface FormState {
  category: string;
  newCategory: string;
  name: string;
  description: string;
  half_price: string;
  full_price: string;
}

const AdminMenu: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState<FormState>({
    category: "",
    newCategory: "",
    name: "",
    description: "",
    half_price: "",
    full_price: "",
  });

  // Fetch all categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/menu");
      if (!response.ok) throw new Error("Failed to fetch menu");

      const data = await response.json();
      const categoriesFromApi = Array.isArray(data) ? data : [];
      const nextSelectedCategory =
        categoriesFromApi.find(
          (category) => category.category === selectedCategory,
        )?.category ||
        categoriesFromApi[0]?.category ||
        "";

      setCategories(categoriesFromApi);
      setSelectedCategory(nextSelectedCategory);
      setFormData((prev) => ({
        ...prev,
        category: prev.category || nextSelectedCategory,
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const finalCategory =
      formData.category === "Other" ? formData.newCategory : formData.category;

    if (
      !finalCategory ||
      !formData.name ||
      !formData.description ||
      !formData.full_price
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      const endpoint = editingItem
        ? `/api/admin/menu/items/${editingItem.id}`
        : "/api/admin/menu/items";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: finalCategory,
          name: formData.name,
          description: formData.description,
          half_price: formData.half_price || null,
          full_price: formData.full_price,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "Failed to save item");
      }

      setSuccess(
        editingItem
          ? "Menu item updated successfully!"
          : "Menu item created successfully!",
      );

      await fetchCategories();

      setFormData({
        category: "",
        newCategory: "",
        name: "",
        description: "",
        half_price: "",
        full_price: "",
      });
      setEditingItem(null);
      setIsAddingNew(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setSelectedCategory(item.category);
    setFormData({
      category: item.category,
      newCategory: "",
      name: item.name,
      description: item.description,
      half_price: item.half_price || "",
      full_price: item.full_price,
    });
    setIsAddingNew(true);
  };

  const handleDeleteItem = async (itemId: number, itemName: string) => {
    if (!window.confirm(`Delete "${itemName}"?`)) return;

    try {
      const response = await fetch(`/api/admin/menu/items/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error || "Failed to delete item");
      }
      setSuccess("Menu item deleted successfully!");
      await fetchCategories();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  };

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      category: "",
      newCategory: "",
      name: "",
      description: "",
      half_price: "",
      full_price: "",
    }));
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const currentCategory = Array.isArray(categories)
    ? categories.find((c) => c.category === selectedCategory)
    : undefined;

  if (loading) {
    return (
      <>
        <div className="admin-page-header">
          <h1 className="admin-page-title">Menu Management</h1>
        </div>
        <Loader />
      </>
    );
  }

  return (
    <>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Menu Management</h1>
        <p className="admin-page-subtitle">Manage menu items and categories</p>
      </div>

      {error && <div className="admin-alert admin-alert-error">{error}</div>}
      {success && (
        <div className="admin-alert admin-alert-success">{success}</div>
      )}

      <div className="admin-menu-layout">
        {/* Categories Sidebar */}
        <div className="admin-card">
          <h3 className="admin-card-title">Categories</h3>
          <div>
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((cat) => (
                <button
                  key={cat.category}
                  onClick={() => {
                    setSelectedCategory(cat.category);
                    setIsAddingNew(false);
                  }}
                  className={`admin-category-btn ${
                    selectedCategory === cat.category ? "active" : ""
                  }`}
                >
                  {cat.category} ({cat.items.length})
                </button>
              ))
            ) : (
              <div className="admin-empty-state">
                <p>No categories found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div>
          {/* Add New Button */}
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              className="admin-btn admin-btn-primary admin-add-item-btn"
            >
              + Add New Item
            </button>
          )}

          {/* Form */}
          {isAddingNew && (
            <div className="admin-card">
              <h3 className="admin-card-title">
                {editingItem ? "Edit Item" : "Add New Item"}
              </h3>
              <form onSubmit={handleSubmit} className="admin-form">
                <div className="admin-form-group">
                  <label className="admin-form-label">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="admin-form-select"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                    <option value="Other">Other (New Category)</option>
                  </select>
                </div>

                {formData.category === "Other" && (
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      New Category Name *
                    </label>
                    <input
                      type="text"
                      name="newCategory"
                      value={formData.newCategory}
                      onChange={handleInputChange}
                      placeholder="e.g., Desserts"
                      required
                      className="admin-form-input"
                    />
                  </div>
                )}

                <div className="admin-form-group">
                  <label className="admin-form-label">Item Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Chicken Momo"
                    required
                    className="admin-form-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Steamed dumplings with spiced chicken"
                    rows={3}
                    required
                    className="admin-form-textarea"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-form-label">
                      Half Price (Optional)
                    </label>
                    <input
                      type="text"
                      name="half_price"
                      value={formData.half_price}
                      onChange={handleInputChange}
                      placeholder="₹100"
                      className="admin-form-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-form-label">Full Price *</label>
                    <input
                      type="text"
                      name="full_price"
                      value={formData.full_price}
                      onChange={handleInputChange}
                      placeholder="₹150"
                      required
                      className="admin-form-input"
                    />
                  </div>
                </div>

                <div className="admin-btn-group">
                  <button type="submit" className="admin-btn admin-btn-success">
                    {editingItem ? "Update Item" : "Create Item"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="admin-btn admin-btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Items List */}
          {currentCategory && !isAddingNew && (
            <div className="admin-card">
              <h3 className="admin-card-title">
                {currentCategory.category} ({currentCategory.items.length}{" "}
                items)
              </h3>
              {currentCategory.items.length === 0 ? (
                <div className="admin-empty-state">
                  <p>No items in this category</p>
                </div>
              ) : (
                <div className="admin-items-grid">
                  {currentCategory.items.map((item) => (
                    <div key={item.id} className="admin-item-card">
                      <div className="admin-item-header">
                        <h4 className="admin-item-name">{item.name}</h4>
                        <span className="admin-item-id">ID: {item.id}</span>
                      </div>
                      <p className="admin-item-description">
                        {item.description}
                      </p>
                      <div className="admin-item-prices">
                        {item.half_price && (
                          <span className="admin-price-tag admin-price-half">
                            Half: {item.half_price}
                          </span>
                        )}
                        <span className="admin-price-tag admin-price-full">
                          Full: {item.full_price}
                        </span>
                      </div>
                      <div className="admin-item-actions">
                        <button
                          onClick={() => handleEditItem(item)}
                          className="admin-btn admin-btn-secondary"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          className="admin-btn admin-btn-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
