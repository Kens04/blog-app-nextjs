import { Category } from "../../categories/_types/Category";

export interface AdminPost {
  title: string;
  content: string;
  categories: Category[] | string & string[];
  categoryName: object;
  thumbnailUrl: string;
  thumbnailImageKey: string;
}