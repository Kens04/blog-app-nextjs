"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Category } from "./_types/Category";

const AdminCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/admin/categories");
      const { categories } = await res.json();
      setCategories(categories);
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
        <h2 className="text-xl font-bold">カテゴリー一覧</h2>
        <div>
          <Link
            className="bg-blue-500 text-white py-2 px-4 rounded font-bold"
            href="/admin/categories/new"
          >
            新規作成
          </Link>
        </div>
      </div>
      {categories.length > 0 ? (
        <div className="mt-10">
          <ul className="flex flex-col gap-4">
            {categories.map((category) => (
              <li key={category.id} className="border-b font-bold pb-2">
                <Link
                  className="hover:text-red-700 transition"
                  href={`/admin/categories/${category.id}`}
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="mt-10">カテゴリーはありません。</div>
      )}
    </div>
  );
};

export default AdminCategories;
