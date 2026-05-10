import React from "react";
import { Link } from "react-router-dom";
import { MENU_CATEGORIES } from "../contants";
import { PATHS } from "../paths";
import "./Menu.css";

const Menu: React.FC = () => {
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
        {MENU_CATEGORIES.map((category) => (
          <div key={category.category} className="menu-category">
            <h2 className="category-title">{category.category}</h2>
            <div className="menu-grid">
              {category.items.map((item, index) => (
                <div key={index} className="menu-item">
                  <div className="menu-item-header">
                    <h3 className="menu-item-name">{item.name}</h3>
                    <div className="menu-item-prices">
                      {item.halfPrice && (
                        <span className="price-half">
                          Half: {item.halfPrice}
                        </span>
                      )}
                      <span
                        className={`price-full ${!item.halfPrice ? "price-only" : ""}`}
                      >
                        {item.halfPrice ? "Full: " : ""}
                        {item.fullPrice}
                      </span>
                    </div>
                  </div>
                  <p className="menu-item-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
