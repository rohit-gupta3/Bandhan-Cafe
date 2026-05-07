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

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}
      >
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
                  style={{
                    display: "block",
                    width: "100%",
                    padding: "10px 12px",
                    marginBottom: "8px",
                    background:
                      selectedCategory === cat.category ? "#3182ce" : "#f7fafc",
                    color:
                      selectedCategory === cat.category ? "white" : "#2d3748",
                    border: "1px solid #e2e8f0",
                    borderRadius: "6px",
                    cursor: "pointer",
                    textAlign: "left",
                    fontWeight: 500,
                    transition: "all 0.2s",
                  }}
                >
                  {cat.category} ({cat.items.length})
                </button>
              ))
            ) : (
              <p style={{ color: "#718096", textAlign: "center" }}>
                No categories found
              </p>
            )}
          </div>
        </div>

        {/* Right Content */}
        <div>
          {/* Add New Button */}
          {!isAddingNew && (
            <button
              onClick={() => setIsAddingNew(true)}
              style={{
                marginBottom: "20px",
                padding: "10px 16px",
                background: "#3182ce",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: 500,
                fontSize: "0.95rem",
              }}
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
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: 500,
                      color: "#2d3748",
                    }}
                  >
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                    }}
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
                  <div style={{ marginBottom: "16px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontWeight: 500,
                        color: "#2d3748",
                      }}
                    >
                      New Category Name *
                    </label>
                    <input
                      type="text"
                      name="newCategory"
                      value={formData.newCategory}
                      onChange={handleInputChange}
                      placeholder="e.g., Desserts"
                      required
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: 500,
                      color: "#2d3748",
                    }}
                  >
                    Item Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Chicken Momo"
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                    }}
                  />
                </div>

                <div style={{ marginBottom: "16px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "6px",
                      fontWeight: 500,
                      color: "#2d3748",
                    }}
                  >
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="e.g., Steamed dumplings with spiced chicken"
                    rows={3}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e2e8f0",
                      borderRadius: "6px",
                      fontSize: "0.95rem",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontWeight: 500,
                        color: "#2d3748",
                      }}
                    >
                      Half Price (Optional)
                    </label>
                    <input
                      type="text"
                      name="half_price"
                      value={formData.half_price}
                      onChange={handleInputChange}
                      placeholder="₹100"
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontWeight: 500,
                        color: "#2d3748",
                      }}
                    >
                      Full Price *
                    </label>
                    <input
                      type="text"
                      name="full_price"
                      value={formData.full_price}
                      onChange={handleInputChange}
                      placeholder="₹150"
                      required
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        fontSize: "0.95rem",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="submit"
                    style={{
                      padding: "8px 16px",
                      background: "#48bb78",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
                  >
                    {editingItem ? "Update Item" : "Create Item"}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    style={{
                      padding: "8px 16px",
                      background: "#e2e8f0",
                      color: "#2d3748",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: 500,
                    }}
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
                <p
                  style={{
                    color: "#718096",
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No items in this category
                </p>
              ) : (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {currentCategory.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: "16px",
                        border: "1px solid #e2e8f0",
                        borderRadius: "6px",
                        background: "#f7fafc",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <h4 style={{ margin: 0, color: "#2d3748", flex: 1 }}>
                          {item.name}
                        </h4>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "#4a5568",
                            background: "#edf2f7",
                            padding: "4px 8px",
                            borderRadius: "4px",
                          }}
                        >
                          ID: {item.id}
                        </span>
                      </div>
                      <p
                        style={{
                          color: "#718096",
                          margin: "8px 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          marginBottom: "12px",
                          flexWrap: "wrap",
                        }}
                      >
                        {item.half_price && (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "4px 8px",
                              background: "#bee3f8",
                              color: "#2c5282",
                              borderRadius: "4px",
                              fontSize: "0.85rem",
                              fontWeight: 500,
                            }}
                          >
                            Half: {item.half_price}
                          </span>
                        )}
                        <span
                          style={{
                            display: "inline-block",
                            padding: "4px 8px",
                            background: "#c6f6d5",
                            color: "#22543d",
                            borderRadius: "4px",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                          }}
                        >
                          Full: {item.full_price}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => handleEditItem(item)}
                          style={{
                            flex: 1,
                            padding: "6px 12px",
                            background: "#edf2f7",
                            color: "#2d3748",
                            border: "1px solid #cbd5e0",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id, item.name)}
                          style={{
                            flex: 1,
                            padding: "6px 12px",
                            background: "#fed7d7",
                            color: "#742a2a",
                            border: "1px solid #fc8181",
                            borderRadius: "4px",
                            cursor: "pointer",
                            fontSize: "0.9rem",
                            fontWeight: 500,
                          }}
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
