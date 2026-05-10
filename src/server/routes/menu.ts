import { Router, Request, Response } from "express";
import { menuService } from "../service/Menu";
import { MenuItem } from "../../types";
import { createNewMenuItem } from "../middleware/menuMiddleware";

const menuRouter: Router = Router();
let menuItemsStore: MenuItem[] = [];

const sortMenu = (menuItems: MenuItem[]) => {
  const categoryMap = menuItems.reduce<
    Record<string, { category: string; items: any[] }>
  >((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = { category: item.category, items: [] };
    }
    acc[item.category].items.push(item);
    return acc;
  }, {});

  return Object.values(categoryMap)
    .map((categoryGroup) => ({
      ...categoryGroup,
      items: [...categoryGroup.items].sort((a, b) =>
        a.name.localeCompare(b.name),
      ),
    }))
    .sort((a, b) => a.category.localeCompare(b.category));
};

menuRouter.get("/", async (req: Request, res: Response) => {
  try {
    console.log("Fetching menu categories...");
    const { data, error } = await menuService.getAllMenus();
    if (error) {
      console.error("Error fetching menu from database:", error);
      return res.json(sortMenu(menuItemsStore));
    }
    if (data) {
      menuItemsStore = data;
    }
    res.json(sortMenu(menuItemsStore));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

menuRouter.post("/items",  [createNewMenuItem])

// UPDATE menu item by ID
menuRouter.put("/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.itemId);
    const { category, name, description, half_price, full_price } = req.body;

    if (Number.isNaN(itemId)) {
      return res.status(400).json({ error: "Invalid item id" });
    }

    if (!category || !name || !description || !full_price) {
      return res.status(400).json({ error: "Missing required item fields" });
    }

    const { data } = await menuService.updateMenuEntry(itemId, {
      category,
      name,
      description,
      half_price: half_price ?? null,
      full_price,
    });
    if (!data) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json({ success: true, item: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

menuRouter.delete("/items/:itemId", async (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.itemId);

    if (Number.isNaN(itemId)) {
      return res.status(400).json({ error: "Invalid item id" });
    }
    const { error } = await menuService.deleteMenuEntry(itemId);
    if (error) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json({ success: true, message: "Menu item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

export default menuRouter;
