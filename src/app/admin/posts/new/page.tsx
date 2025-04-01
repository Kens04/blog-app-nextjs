"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AdminPost } from "../_types/AdminPost";
import { Category } from "../../categories/_types/Category";
import { AdminPostForm } from "../_components/AdminPostForm";

const AdminPostNew: React.FC = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<object>({});

  // カテゴリー一覧取得
  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit: SubmitHandler<AdminPost> = async (data) => {
    const { title, content, thumbnailUrl } = data;
    try {
      const res = await fetch("http://localhost:3000/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          categories: categoryName,
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
          categories={categories}
          setCategoryName={setCategoryName}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AdminPostNew;
