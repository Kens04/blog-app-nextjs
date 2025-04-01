"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";
import { AdminPost } from "../_types/AdminPost";
import { Category } from "../../categories/_types/Category";
import { AdminPostForm } from "../_components/AdminPostForm";

const AdminPostDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<object>({});
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [thumbnailUrl, setThumbnailUrl] = useState<string>("");

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

  // 記事詳細取得
  useEffect(() => {
    const fetcher = async () => {
      const res = await fetch(
        `http://localhost:3000/api/admin/posts/${params.id}`
      );
      const { post } = await res.json();
      setTitle(post.title);
      setContent(post.content);
      const categoryId = post.postCategories.map(
        (category: { categoryId: number }) => category.categoryId
      );
      setSelectCategories(categoryId);
      setThumbnailUrl(post.thumbnailUrl);
    };

    fetcher();
  }, [params.id]);

  const onSubmit: SubmitHandler<AdminPost> = async (data) => {
    const { title, content, thumbnailUrl } = data;
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/posts/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
            categories: categoryName,
            thumbnailUrl,
          }),
        }
      );
      if (res.ok) {
        router.push("/admin/posts");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteArticle = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/admin/posts/${params.id}`,
        {
          method: "DELETE",
        }
      );
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
          title={title}
          setTitle={setTitle}
          content={content}
          setContent={setContent}
          categories={categories}
          setCategoryName={setCategoryName}
          selectCategories={selectCategories}
          thumbnailUrl={thumbnailUrl}
          setThumbnailUrl={setThumbnailUrl}
          handleDeleteArticle={handleDeleteArticle}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default AdminPostDetail;
