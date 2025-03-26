"use client";

import { MicroCmsPost } from "@/app/_types/MicroCmsPost";
import Image from "next/image";
import { useEffect, useState } from "react";

const PostDetail = ({ params }: { params: { id: string } }) => {
  const [post, setPost] = useState<MicroCmsPost | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetcher = async () => {
      setIsLoading(true);
      const res = await fetch(
        `https://058kjqhvdy.microcms.io/api/v1/posts/${params.id}`,
        {
          headers: {
            "X-MICROCMS-API-KEY": process.env
              .NEXT_PUBLIC_MICROCMS_API_KEY as string,
          },
        }
      );
      const data = await res.json();
      setPost(data);
      setIsLoading(false);
    };

    fetcher();
  }, [params.id]);

  if (isLoading) return <div>読み込み中...</div>;
  if (!post) return <div>記事が見つかりません</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div>
        <div>
          <Image
            src={post.thumbnail.url}
            alt={post.title}
            height={400}
            width={800}
          />
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <div className="text-slate-400 text-sm">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            <div>
              <div className="flex gap-2">
                {post.categories.map((category, index) => (
                  <div
                    key={index}
                    className="border border-blue-500 p-1 text-sm rounded text-blue-500"
                  >
                    {category.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-2xl text-left mt-4 text-slate-900">{post.title}</p>
          <div className="mt-4 text-left text-slate-700">
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;