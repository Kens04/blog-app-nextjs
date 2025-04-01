import { Category } from "../../categories/_types/Category";

export interface AdminPost {
  title: string;
  content: string;
  categories: Category[];
  categoryName: object;
  thumbnailUrl: string;
}