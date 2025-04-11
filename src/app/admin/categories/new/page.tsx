"use client";

import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";
import { Category } from "../_types/Category";
import { AdminCategoryForm } from "../_components/AdminCategoryForm";
import { useSupabaseSession } from "@/app/_hooks/useSupabaseSession";

const AdminCreateCategories: React.FC = () => {
  const { token } = useSupabaseSession();
  const router = useRouter();
  const onSubmit: SubmitHandler<Category> = async (data) => {
    const { name } = data;
    try {
      const res = await fetch("/api/admin/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token!,
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

  return (
    <div className="p-5 w-full">
      <h2 className="text-xl font-bold">カテゴリー作成</h2>
      <div className="mt-5">
        <AdminCategoryForm onSubmit={onSubmit} mode="作成" />
      </div>
    </div>
  );
};

export default AdminCreateCategories;
