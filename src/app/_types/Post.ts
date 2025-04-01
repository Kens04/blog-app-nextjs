export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  postCategories: {
    category: { name: string };
  }[];
  thumbnailUrl: string;
}