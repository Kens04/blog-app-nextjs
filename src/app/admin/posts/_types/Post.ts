export interface Post {
  id: number;
  title: string;
  content: string;
  categories: { id: number }[];
  thumbnailUrl: string;
  createdAt: Date;
  updatedAt: Date;
}