"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { Category } from "../_types/Category";
import { AdminCategoryForm } from "../_components/AdminCategoryForm";
import { useAdminDataFetch } from "@/app/_hooks/useAdminDataFetch";

const AdminEditCategories = ({ params }: { params: { id: string } }) => {
  const router = useRouter();

  // カテゴリー取得
  const { data } = useAdminDataFetch<Category>(`/admin/categories/${params.id}`);

  const onSubmit: SubmitHandler<Category> = async (data) => {
    const { name } = data;
    try {
      const res = await fetch(`/api/admin/categories/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      });

      if (res.ok) {
        router.push("/admin/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCategory = async () => {
    try {
      const res = await fetch(`/api/admin/categories/${params.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/admin/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 w-full">
      <h2 className="text-xl font-bold">カテゴリー編集</h2>
      <div className="mt-5">
        <AdminCategoryForm
          mode="編集"
          name={data?.category.name}
          onSubmit={onSubmit}
          onDeleteCategory={handleDeleteCategory}
        />
      </div>
    </div>
  );
};

export default AdminEditCategories;
