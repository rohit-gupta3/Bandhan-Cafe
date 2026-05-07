import { Router, Request, Response } from "express";

const menuRouter: Router = Router();

export const MENU_ITEMS = [
  {
    id: 1,
    name: "Panner Pakoda",
    category: "Veg Varieties",
    description: "Crispy paneer fritters",
    full_price: "₹260",
    half_price: "₹140",
  },
  {
    id: 2,
    name: "Panner Chilli",
    category: "Veg Varieties",
    description: "Spicy paneer with bell peppers",
    full_price: "₹280",
    half_price: "₹160",
  },
  {
    id: 3,
    name: "Panner Stick",
    category: "Veg Varieties",
    description: "Paneer sticks, crispy and golden",
    full_price: "₹300",
    half_price: "₹170",
  },
  {
    id: 4,
    name: "Sweet Corn",
    category: "Veg Varieties",
    description: "Sweet and juicy corn kernels",
    full_price: "₹90",
    half_price: null,
  },
  {
    id: 5,
    name: "Crispy Corn",
    category: "Veg Varieties",
    description: "Crunchy fried corn bites",
    full_price: "₹130",
    half_price: null,
  },
  {
    id: 6,
    name: "French Fries",
    category: "Veg Varieties",
    description: "Masala or Peri Peri fries",
    full_price: "₹110",
    half_price: null,
  },
  {
    id: 7,
    name: "Chilli Potato",
    category: "Veg Varieties",
    description: "Spicy potato wedges",
    full_price: "₹130",
    half_price: null,
  },
  {
    id: 8,
    name: "Veg Manchurian",
    category: "Veg Varieties",
    description: "Dry or Gravy - Indo-Chinese delight",
    full_price: "₹170/190",
    half_price: "₹90/110",
  },
  {
    id: 9,
    name: "Peanuts Bhuja/Chiura",
    category: "Sadeko Items",
    description: "Roasted peanuts with flattened rice",
    full_price: "₹100",
    half_price: "₹50",
  },
  {
    id: 10,
    name: "Bhatmas Bhuja/Chiura",
    category: "Sadeko Items",
    description: "Soybeans with flattened rice",
    full_price: "₹100",
    half_price: "₹50",
  },
  {
    id: 11,
    name: "Peanut Bhatmas",
    category: "Sadeko Items",
    description: "Peanuts and soybeans mix",
    full_price: "₹140",
    half_price: "₹80",
  },
  {
    id: 12,
    name: "Peanut Sadeko",
    category: "Sadeko Items",
    description: "Spicy peanut snack",
    full_price: "₹100",
    half_price: "₹60",
  },
  {
    id: 13,
    name: "Peanuts Chawchaw Sadeko",
    category: "Sadeko Items",
    description: "Peanuts with beaten rice",
    full_price: "₹120",
    half_price: "₹80",
  },
  {
    id: 14,
    name: "Chaw chaw Sadeko",
    category: "Sadeko Items",
    description: "Beaten rice snack",
    full_price: "₹60",
    half_price: null,
  },
  {
    id: 15,
    name: "Chaw Chaw Chiura/Bhuja Sadeko",
    category: "Sadeko Items",
    description: "Beaten rice with spices",
    full_price: "₹70",
    half_price: null,
  },
  {
    id: 16,
    name: "Kaju Fry",
    category: "Sadeko Items",
    description: "Fried cashews",
    full_price: "₹250",
    half_price: "₹150",
  },
  {
    id: 17,
    name: "Prawn Chips",
    category: "Sadeko Items",
    description: "Crispy prawn crackers",
    full_price: "₹100",
    half_price: "₹50",
  },
  {
    id: 18,
    name: "Pop Corn",
    category: "Sadeko Items",
    description: "Fresh popped corn",
    full_price: "₹30",
    half_price: null,
  },
  {
    id: 19,
    name: "Veg Chowmein",
    category: "Chowmein Items",
    description: "Stir-fried noodles with vegetables",
    full_price: "₹110",
    half_price: "₹60",
  },
  {
    id: 20,
    name: "Panner Chowmein",
    category: "Chowmein Items",
    description: "Noodles with paneer and veggies",
    full_price: "₹190",
    half_price: "₹100",
  },
  {
    id: 21,
    name: "Chicken Chowmein",
    category: "Chowmein Items",
    description: "Chicken stir-fried noodles",
    full_price: "₹190",
    half_price: "₹100",
  },
  {
    id: 22,
    name: "Egg Chowmein",
    category: "Chowmein Items",
    description: "Noodles with scrambled eggs",
    full_price: "₹170",
    half_price: "₹90",
  },
  {
    id: 23,
    name: "Egg Chicken Chowmein",
    category: "Chowmein Items",
    description: "Chicken and egg noodles",
    full_price: "₹240",
    half_price: "₹130",
  },
  {
    id: 24,
    name: "Ramen",
    category: "Chowmein Items",
    description: "Japanese noodle soup",
    full_price: "₹80",
    half_price: null,
  },
  {
    id: 25,
    name: "Egg Ramen",
    category: "Chowmein Items",
    description: "Ramen with egg",
    full_price: "₹110",
    half_price: null,
  },
  {
    id: 26,
    name: "Sausage Ramen",
    category: "Chowmein Items",
    description: "Ramen with sausage",
    full_price: "₹130",
    half_price: null,
  },
  {
    id: 27,
    name: "Egg Sausage Ramen",
    category: "Chowmein Items",
    description: "Ramen with egg and sausage",
    full_price: "₹160",
    half_price: null,
  },
  {
    id: 28,
    name: "Veg Momo",
    category: "Momo Items",
    description: "Steamed vegetable dumplings",
    full_price: "₹120",
    half_price: "₹60",
  },
  {
    id: 29,
    name: "Fry Veg Momo",
    category: "Momo Items",
    description: "Fried vegetable dumplings",
    full_price: "₹130",
    half_price: "₹70",
  },
  {
    id: 30,
    name: "Veg Jhol Momo",
    category: "Momo Items",
    description: "Vegetable dumplings in soup",
    full_price: "₹150",
    half_price: null,
  },
  {
    id: 31,
    name: "Veg Chilli Momo",
    category: "Momo Items",
    description: "Spicy vegetable dumplings",
    full_price: "₹190",
    half_price: "₹100",
  },
  {
    id: 32,
    name: "Chicken Momo",
    category: "Momo Items",
    description: "Steamed chicken dumplings",
    full_price: "₹150",
    half_price: "₹80",
  },
  {
    id: 33,
    name: "Chicken Fry Momo",
    category: "Momo Items",
    description: "Fried chicken dumplings",
    full_price: "₹160",
    half_price: "₹90",
  },
  {
    id: 34,
    name: "Chicken Chilli Momo",
    category: "Momo Items",
    description: "Spicy chicken dumplings",
    full_price: "₹250",
    half_price: "₹130",
  },
  {
    id: 35,
    name: "Chicken Jhol Momo",
    category: "Momo Items",
    description: "Chicken dumplings in soup",
    full_price: "₹200",
    half_price: "₹110",
  },
  {
    id: 36,
    name: "Chicken Fry",
    category: "Chicken Items",
    description: "Fried chicken pieces",
    full_price: "₹260",
    half_price: "₹140",
  },
  {
    id: 37,
    name: "Chicken Sekuwa",
    category: "Chicken Items",
    description: "Nepali style grilled chicken",
    full_price: "₹280",
    half_price: "₹150",
  },
  {
    id: 38,
    name: "Chicken Lollipop Fry",
    category: "Chicken Items",
    description: "Fried chicken lollipops",
    full_price: "₹300",
    half_price: "₹160",
  },
  {
    id: 39,
    name: "Chicken Chilly",
    category: "Chicken Items",
    description: "Spicy chicken with peppers",
    full_price: "₹350",
    half_price: "₹170",
  },
  {
    id: 40,
    name: "Chicken Leg Fry",
    category: "Chicken Items",
    description: "Fried chicken legs",
    full_price: "₹200",
    half_price: null,
  },
  {
    id: 41,
    name: "Chicken Leg Sekuwa",
    category: "Chicken Items",
    description: "Grilled chicken legs",
    full_price: "₹240",
    half_price: null,
  },
  {
    id: 42,
    name: "Chicken Gravy",
    category: "Chicken Items",
    description: "Chicken in rich gravy",
    full_price: "₹200",
    half_price: "₹110",
  },
  {
    id: 43,
    name: "Chicken Manchurian",
    category: "Chicken Items",
    description: "Dry or Gravy - Indo-Chinese style",
    full_price: "₹340/360",
    half_price: "₹180/200",
  },
  {
    id: 44,
    name: "Chicken Sausage",
    category: "Chicken Items",
    description: "Grilled chicken sausages (6pc)",
    full_price: "₹300",
    half_price: "₹150",
  },
  {
    id: 45,
    name: "Chicken Choila",
    category: "Chicken Items",
    description: "Spicy Nepali chicken salad",
    full_price: "₹300",
    half_price: "₹160",
  },
  {
    id: 46,
    name: "Mutton Gravy",
    category: "Mutton Items",
    description: "Mutton in rich curry",
    full_price: "₹350",
    half_price: "₹180",
  },
  {
    id: 47,
    name: "Mutton Sekuwa",
    category: "Mutton Items",
    description: "Nepali style grilled mutton",
    full_price: "₹380",
    half_price: "₹190",
  },
  {
    id: 48,
    name: "Mutton Bhutuwa",
    category: "Mutton Items",
    description: "Spicy stir-fried mutton",
    full_price: "₹230",
    half_price: "₹120",
  },
  {
    id: 49,
    name: "Mutton Chapli Kabab",
    category: "Mutton Items",
    description: "Minced mutton patties",
    full_price: "₹300",
    half_price: null,
  },
  {
    id: 50,
    name: "Boiled Egg",
    category: "Egg Items",
    description: "Perfectly boiled eggs",
    full_price: "₹150",
    half_price: "₹80",
  },
  {
    id: 51,
    name: "Omlette",
    category: "Egg Items",
    description: "Classic omelette",
    full_price: "₹70",
    half_price: "₹40",
  },
  {
    id: 52,
    name: "Plain Rice",
    category: "Rice Items",
    description: "Steamed white rice",
    full_price: "₹60",
    half_price: null,
  },
  {
    id: 53,
    name: "Jeera Rice",
    category: "Rice Items",
    description: "Cumin flavored rice",
    full_price: "₹70",
    half_price: null,
  },
  {
    id: 54,
    name: "Veg Fried Rice",
    category: "Rice Items",
    description: "Fried rice with vegetables",
    full_price: "₹90",
    half_price: null,
  },
  {
    id: 55,
    name: "Panner Fried Rice",
    category: "Rice Items",
    description: "Fried rice with paneer",
    full_price: "₹110",
    half_price: null,
  },
  {
    id: 56,
    name: "Egg Fried Rice",
    category: "Rice Items",
    description: "Fried rice with eggs",
    full_price: "₹100",
    half_price: null,
  },
  {
    id: 57,
    name: "Chicken Fried Rice",
    category: "Rice Items",
    description: "Fried rice with chicken",
    full_price: "₹140",
    half_price: null,
  },
  {
    id: 58,
    name: "Egg Chicken Fried Rice",
    category: "Rice Items",
    description: "Fried rice with egg and chicken",
    full_price: "₹160",
    half_price: null,
  },
  {
    id: 59,
    name: "Veg Khana",
    category: "Khana",
    description: "Complete vegetarian meal",
    full_price: "₹200",
    half_price: null,
  },
  {
    id: 60,
    name: "Chicken Khana",
    category: "Khana",
    description: "Complete chicken meal",
    full_price: "₹250",
    half_price: null,
  },
  {
    id: 61,
    name: "Mutton Khana",
    category: "Khana",
    description: "Complete mutton meal",
    full_price: "₹350",
    half_price: null,
  },
  {
    id: 62,
    name: "Tea",
    category: "Beverages",
    description: "Traditional tea",
    full_price: "₹25",
    half_price: null,
  },
  {
    id: 63,
    name: "Coffee",
    category: "Beverages",
    description: "Fresh brewed coffee",
    full_price: "₹30",
    half_price: null,
  },
  {
    id: 64,
    name: "Hookah",
    category: "Beverages",
    description: "Premium hookah experience",
    full_price: "₹450",
    half_price: null,
  },
];
// Store menu items in memory (in production, this would be a database)
let menuItemsStore = MENU_ITEMS;

const sortMenu = () => {
  const categoryMap = menuItemsStore.reduce<
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

const findItemById = (itemId: number) =>
  menuItemsStore.find((item: any) => item.id === itemId);

// GET all menu categories sorted by category name
menuRouter.get("/", (req: Request, res: Response) => {
  try {
    console.log("Fetching menu categories...");
    res.json(sortMenu());
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch menu" });
  }
});

// CREATE new menu item
menuRouter.post("/items", (req: Request, res: Response) => {
  try {
    const { category, name, description, half_price, full_price } = req.body;

    if (!category || !name || !description || !full_price) {
      return res.status(400).json({ error: "Missing required item fields" });
    }

    const newId = menuItemsStore.reduce(
      (max: number, item: any) => Math.max(max, item.id || 0),
      0,
    );

    const newItem = {
      id: newId + 1,
      category,
      name,
      description,
      half_price: half_price ?? null,
      full_price,
    };

    menuItemsStore.push(newItem);
    res.json({ success: true, item: newItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to create menu item" });
  }
});

// UPDATE menu item by ID
menuRouter.put("/items/:itemId", (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.itemId);
    const { category, name, description, half_price, full_price } = req.body;

    if (Number.isNaN(itemId)) {
      return res.status(400).json({ error: "Invalid item id" });
    }

    if (!category || !name || !description || !full_price) {
      return res.status(400).json({ error: "Missing required item fields" });
    }

    const itemIndex = menuItemsStore.findIndex(
      (item: any) => item.id === itemId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const updatedItem = {
      ...menuItemsStore[itemIndex],
      category,
      name,
      description,
      half_price: half_price ?? null,
      full_price,
    };

    menuItemsStore[itemIndex] = updatedItem;
    res.json({ success: true, item: updatedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to update menu item" });
  }
});

// DELETE menu item by ID
menuRouter.delete("/items/:itemId", (req: Request, res: Response) => {
  try {
    const itemId = Number(req.params.itemId);

    if (Number.isNaN(itemId)) {
      return res.status(400).json({ error: "Invalid item id" });
    }

    const itemIndex = menuItemsStore.findIndex(
      (item: any) => item.id === itemId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({ error: "Item not found" });
    }

    const deletedItem = menuItemsStore.splice(itemIndex, 1)[0];
    res.json({ success: true, deletedItem });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete menu item" });
  }
});

export default menuRouter;
