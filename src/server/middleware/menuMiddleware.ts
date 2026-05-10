import { NextFunction, Request, Response } from "express";
import { menuService } from "../service/Menu";

export const createNewMenuItem = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  try {
    const { category, name, description, half_price, full_price } = req.body;

    if (!category || !name || !description || !full_price) {
      return res.status(400).json({ error: "Missing required item fields" });
    }

    const { data } = await menuService.insertMenuEntry({
      category,
      name,
      description,
      half_price: half_price ?? null,
      full_price,
    });
    return res.json({ success: true, item: data });
  } catch (error) {
    return res.status(500).json({ error: "Failed to create menu item" });
  }
};
