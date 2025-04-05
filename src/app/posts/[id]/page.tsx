"use client";

import { useDataFetch } from "@/app/_hooks/useDataFetch";
import { Post } from "@/app/_types/Post";
import Image from "next/image";

const PostDetail = ({ params }: { params: { id: string } }) => {
  const { data, error, isLoading } = useDataFetch<Post>(
    `/posts/${params.id}`
  );

  if (isLoading) return <div>読み込み中...</div>;
  if (!data) return <div>記事が見つかりません</div>;
  if (error) return <div>読み込みに失敗しました。</div>;

  return (
    <div className="max-w-3xl mx-auto mt-24 mb-10">
      <div>
        <div>
          <Image
            src={data.post.thumbnailUrl}
            alt={data.post.title}
            height={400}
            width={800}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-slate-400 text-sm">
              {new Date(data.post.createdAt).toLocaleDateString()}
            </div>
            <div>
              <div className="flex gap-2">
                {data.post.postCategories.map((category, index) => (
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
            {data.post.title}
          </p>
          <div className="mt-4 text-left text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: data.post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
