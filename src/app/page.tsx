"use client";

import Link from "next/link";
import { Post } from "./_types/Post";
import { useDataFetch } from "./_hooks/useDataFetch";

const Home: React.FC = () => {
  const { data, error, isLoading } = useDataFetch<Post>(
    "http://localhost:3000/api/posts"
  );

  if (error) return <div>読み込みに失敗しました。</div>;
  if (isLoading) return <div>読み込み中...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-24 mb-10">
      <ul className="flex flex-col gap-5">
        {data?.posts.map((post) => (
          <li key={post.id} className="border border-gray-300 p-4">
            <Link href={`posts/${post.id}`}>
              <div>
                <div>
                  <div className="flex justify-between">
                    <div className="text-slate-400 text-sm">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <div className="flex gap-2">
                        {post.postCategories.map((category, index) => (
                          <div
                            key={index}
                            className="border border-blue-500 p-1 text-sm rounded text-blue-500"
                          >
                            {category.category.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-2xl text-left mt-4 text-slate-900">
                    {post.title}
                  </p>
                  <div className="mt-4 text-left text-slate-700">
                    <div
                      className="line-clamp-2"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;