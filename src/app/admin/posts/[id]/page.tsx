"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { AdminPost } from "../_types/AdminPost";
import { AdminPostForm } from "../_components/AdminPostForm";
import { Post } from "../_types/Post";
import { useAdminDataFetch } from "@/app/_hooks/useAdminDataFetch";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const AdminPostDetail = ({ params }: { params: { id: string } }) => {
  const { token } = useSupabaseSession();
  const router = useRouter();

  // 記事詳細取得
  const { data: posts } = useAdminDataFetch<Post>(`/admin/posts/${params.id}`);

  const categoryId = posts?.post.postCategories.map(
    (item: { category: { id: string } }) => item.category.id
  );

  const onSubmit: SubmitHandler<AdminPost> = async (data) => {
    const { title, content, categories, thumbnailUrl } = data;

    const categoryObjects = categories.map((id) => ({
      id: Number(id),
    }));

    try {
      const res = await fetch(`/api/admin/posts/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
        },
        body: JSON.stringify({
          title,
          content,
          categories: categoryObjects,
          thumbnailImageKey: thumbnailUrl,
        }),
      });
      if (res.ok) {
        router.push("/admin/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteArticle = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${params.id}`, {
        method: "DELETE",
        headers: {
          Authorization: token!,
        },
      });
      if (res.ok) {
        router.push("/admin/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 w-full">
      <h2 className="text-xl font-bold">記事編集</h2>
      <div className="mt-5">
        <AdminPostForm
          mode="編集"
          title={posts?.post.title}
          content={posts?.post.content}
          selectCategories={categoryId}
          thumbnailUrl={posts?.post.thumbnailImageKey}
          handleDeleteArticle={handleDeleteArticle}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AdminPostDetail;
