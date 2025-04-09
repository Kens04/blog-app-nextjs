"use client";

import Link from "next/link";
import { Post } from "./_types/Post";
import { useAdminDataFetch } from "@/app/_hooks/useAdminDataFetch";

const AdminPosts: React.FC = () => {
  const { data, error, isLoading } = useAdminDataFetch<Post>("/admin/posts");

  if (error) return <div>読み込みに失敗しました。</div>;
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
      {(data?.posts ?? []).length > 0 ? (
        <div className="mt-10">
          <ul className="flex flex-col gap-4">
            {data?.posts.map((post) => (
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
      ) : (
        <div className="mt-10">記事はありません。</div>
      )}
    </div>
  );
};

export default AdminPosts;
