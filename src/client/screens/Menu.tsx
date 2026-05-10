import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../paths";
import { Loader } from "../components/Loader";
import "./Menu.css";

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

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/menu");
      if (!response.ok) throw new Error("Failed to fetch menu");
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load menu");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="menu-page">
        <div className="menu-header">
          <Link to={PATHS.home} className="back-button">
            ← Back to Home
          </Link>
          <h1>Our Menu</h1>
        </div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="menu-page">
        <div className="menu-header">
          <Link to={PATHS.home} className="back-button">
            ← Back to Home
          </Link>
          <h1>Our Menu</h1>
        </div>
        <div className="menu-content">
          <div className="menu-error">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <Link to={PATHS.home} className="back-button">
          ← Back to Home
        </Link>
        <h1>Our Menu</h1>
        <p>Authentic Nepali & Indian Cuisine</p>
      </div>

      <div className="menu-content">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.category} className="menu-category">
              <h2 className="category-title">{category.category}</h2>
              <div className="menu-grid">
                {category.items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="menu-item-header">
                      <h3 className="menu-item-name">{item.name}</h3>
                      <div className="menu-item-prices">
                        {item.half_price && (
                          <span className="price-half">
                            Half: {item.half_price}
                          </span>
                        )}
                        <span
                          className={`price-full ${!item.half_price ? "price-only" : ""}`}
                        >
                          {item.half_price ? "Full: " : ""}
                          {item.full_price}
                        </span>
                      </div>
                    </div>
                    <p className="menu-item-desc">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="menu-empty">
            <p>No menu items available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
