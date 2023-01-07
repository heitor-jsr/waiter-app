import { Request, Response } from 'express';
import { Category } from '../../models/Category';


export async function deleteCat(req: Request, res: Response) {
  try {
    const { categoriesId } = req.params;

    await Category.findByIdAndDelete(categoriesId);
    res.sendStatus(204);
  } catch {
    res.sendStatus(500);
  }
}
