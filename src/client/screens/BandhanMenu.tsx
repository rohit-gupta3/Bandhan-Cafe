import React, { useEffect, useState } from "react";

interface MenuItem {
  id: number;
  category: string;
  name: string;
  description?: string | null;
  half_price?: string | number | null;
  full_price: string | number;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
}

const fmt = (n: string | number | undefined | null) =>
  `Rs. ${n}`;

export const BandhanMenu: React.FC = () => {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/admin/menu");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load menu");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    loadMenu();
  }, []);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          font-family: 'Jost', sans-serif;
          background: #fffdf8;
          min-height: 100vh;
          display: flex;
          justify-content: center;
        }

        .menu-root {
          width: 100%;
          max-width: 480px;
          padding-bottom: 3rem;
        }

        /* ── Header ── */
        .menu-header {
          background: #7a3e1a;
          padding: 2.5rem 1.5rem 2rem;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .menu-header::before {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg, transparent, transparent 18px,
            rgba(255,255,255,0.03) 18px, rgba(255,255,255,0.03) 19px
          );
        }
        .menu-header h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 34px;
          font-weight: 600;
          color: #fff5e6;
          letter-spacing: 1.5px;
          position: relative;
        }
        .menu-header p {
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #e8c99a;
          margin-top: 8px;
          position: relative;
        }
        .header-line {
          width: 52px;
          height: 1.5px;
          background: #c8914a;
          margin: 12px auto 0;
          position: relative;
        }

        /* ── Loading / Error ── */
        .state-msg {
          text-align: center;
          padding: 3rem 1rem;
          color: #a08060;
          font-size: 14px;
        }
        .state-msg i { font-size: 28px; display: block; margin-bottom: 10px; color: #c8914a; }

        /* ── Body ── */
        .menu-body { padding: 1rem 1.1rem 0; }

        .price-legend {
          display: flex;
          justify-content: flex-end;
          gap: 16px;
          padding: 0.4rem 4px 0.9rem;
        }
        .legend-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #a08060;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .legend-dash       { width: 20px; height: 1px; background: #7a3e1a; }
        .legend-dash.half  { background: #c8a87a; }

        /* ── Category ── */
        .category-block { margin-bottom: 1.75rem; }

        .category-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 0.6rem;
          cursor: pointer;
        }
        .cat-rule { flex: 1; height: 1px; background: #e8d8c0; }
        .category-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px;
          font-weight: 600;
          color: #5a2d0c;
          white-space: nowrap;
          padding: 0 6px;
        }

        /* ── Item row ── */
        .item-row {
          display: flex;
          align-items: flex-start;
          padding: 10px 4px;
          border-bottom: 1px dashed #f0e0c8;
          gap: 8px;
        }
        .item-row:last-child { border-bottom: none; }

        .item-info { flex: 1; min-width: 0; }
        .item-name {
          font-size: 14px;
          color: #3d1f0a;
          line-height: 1.35;
        }

        .item-prices {
          display: grid;
          grid-template-columns: 52px 12px 52px;
          gap: 8px;
          align-items: center;
          justify-content: flex-end;
          flex-shrink: 0;
          padding-top: 1px;
        }
        .price-full,
        .price-half,
        .price-half-empty {
          text-align: right;
          min-width: 52px;
          width: 70px;
        }
        .price-full {
          font-size: 14px;
          font-weight: 500;
          color: #5a2d0c;
        }
        .price-sep {
          font-size: 11px;
          color: #d4b896;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 12px;
        }
        .price-half {
          font-size: 13px;
          color: #a08060;
        }
        .price-half-empty {
          visibility: hidden;
        }

        /* ── Footer ── */
        .menu-footer {
          text-align: center;
          padding: 1.25rem 0 0;
          font-size: 11px;
          color: #c8a87a;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
      `}</style>

      <div className="menu-root">
        <div className="menu-header">
          <h1>Bandhan Cafe</h1>
          <p>Dine in · Takeaway · Delivery</p>
          <div className="header-line" />
        </div>

        <div className="menu-body">
          <div className="price-legend">
            <div className="legend-item">
              <div className="legend-dash" /> Full
            </div>
            <div className="legend-item">
              <div className="legend-dash half" /> Half
            </div>
          </div>

          {loading ? (
            <div className="state-msg">
              <i className="ti ti-loader" aria-hidden="true" />
              Loading menu…
            </div>
          ) : error ? (
            <div className="state-msg">{error}</div>
          ) : categories.length === 0 ? (
            <div className="state-msg">No menu items found.</div>
          ) : (
            categories.map((section) => (
              <div key={section.category} className="category-block">
                <div className="category-header">
                  <div className="cat-rule" />
                  <div className="category-name">{section.category}</div>
                  <div className="cat-rule" />
                </div>
                {(section.items || []).map((item) => {
                  const fullPrice = item.full_price;
                  const halfPrice =
                    item.half_price != null
                      ? item.half_price
                      : null;
                  const halfPart =
                    halfPrice != null ? (
                      <>
                        <span className="price-sep">·</span>
                        <div className="price-half">{fmt(halfPrice)}</div>
                      </>
                    ) : (
                      <>
                        <span className="price-sep">·</span>
                        <div className="price-half">-</div>
                      </>
                    );

                  return (
                    <div key={item.id} className="item-row">
                      <div className="item-info">
                        <div className="item-name">{item.name}</div>
                      </div>
                      <div className="item-prices">
                        <div className="price-full">{fmt(fullPrice)}</div>
                        {halfPart}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))
          )}
        </div>

        <div className="menu-footer">Fresh · Local · Homemade</div>
      </div>
    </>
  );
};
