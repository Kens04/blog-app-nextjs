"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { AdminPost } from "../_types/AdminPost";
import { AdminPostForm } from "../_components/AdminPostForm";

const AdminPostNew: React.FC = () => {
  const router = useRouter();

  const onSubmit: SubmitHandler<AdminPost> = async (data) => {
    const { title, content, categories, thumbnailUrl } = data;

    // 文字列型の配列から、各要素を数値のidプロパティを持つオブジェクトの配列に変更
    // 例：["36"]→[{id: 36}]
    const arrayCategories = categories.map((category) => ({
      id: Number(category),
    }));

    try {
      const res = await fetch("http://localhost:3000/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          categories: arrayCategories,
          thumbnailUrl,
        }),
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
      <h2 className="text-xl font-bold">記事作成</h2>
      <div className="mt-5">
        <AdminPostForm
          mode="作成"
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AdminPostNew;
