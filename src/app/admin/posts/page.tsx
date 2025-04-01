"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Post } from "./_types/Post";

const AdminPosts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/posts");
      const { posts } = await res.json();
      setPosts(posts);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div className="p-5 w-full">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold">記事一覧</h2>
        <div>
          <Link
            className="bg-blue-500 text-white py-2 px-4 rounded font-bold"
            href="/admin/posts/new"
          >
            新規作成
          </Link>
        </div>
      </div>
      <div className="mt-10">
        <ul className="flex flex-col gap-4">
          {posts.map((post) => (
            <li key={post.id} className="font-bold">
              <Link
                className="hover:text-red-700 transition pb-2 border-b block"
                href={`/admin/posts/${post.id}`}
              >
                <h2 className="font-bold">{post.title}</h2>
                <time className="text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPosts;
