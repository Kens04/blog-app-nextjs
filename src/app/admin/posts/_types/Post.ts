export interface Post {
  id: number;
  title: string;
  content: string;
  postCategories: {
    category: { id: string };
  }[];
  thumbnailImageKey: string;
  createdAt: Date;
  updatedAt: Date;
  posts: Post[];
  post: Post;
}