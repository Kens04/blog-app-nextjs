import { SubmitHandler, useForm } from "react-hook-form";
import { AdminPost } from "../_types/AdminPost";
import { Category } from "../../categories/_types/Category";
import { useEffect } from "react";
import { useDataFetch } from "@/app/_hooks/useDataFetch";

interface FormProps {
  mode: string;
  title?: string;
  content?: string;
  selectCategories?: string[];
  thumbnailUrl?: string;
  handleDeleteArticle?: () => void;
  onSubmit: SubmitHandler<AdminPost>;
}

export const AdminPostForm = ({
  mode,
  title,
  content,
  selectCategories,
  handleDeleteArticle,
  thumbnailUrl,
  onSubmit,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminPost>();

  // カテゴリー一覧取得
  const { data: categories } = useDataFetch<Category>(
    "/admin/categories"
  );

  useEffect(() => {
    reset({
      title,
      content,
      thumbnailUrl,
      categories: String(selectCategories),
    });
  }, [title, content, thumbnailUrl, selectCategories]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="title">
          タイトル<span className="inline-block ml-1 text-red-500">※</span>
        </label>
        <input
          className="border rounded h-12 p-2"
          id="title"
          type="text"
          placeholder="タイトルを入力してください"
          {...register("title", {
            required: "タイトルを入力してください",
            minLength: { value: 2, message: "2文字以上入力してください" },
          })}
        />
        {errors.title && <p className="text-red-700">{errors.title.message}</p>}
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="content">
          内容<span className="inline-block ml-1 text-red-500">※</span>
        </label>
        <textarea
          className="border rounded h-20 p-2"
          id="content"
          placeholder="内容を入力してください"
          {...register("content", {
            required: "内容を入力してください",
            minLength: { value: 10, message: "10文字以上入力してください" },
          })}
        />
        {errors.content && (
          <p className="text-red-700">{errors.content.message}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="thumbnailUrl">
          サムネイルURL
          <span className="inline-block ml-1 text-red-500">※</span>
        </label>
        <input
          className="border rounded h-12 p-2"
          id="thumbnailUrl"
          type="text"
          placeholder="サムネイルURLを入力してください"
          {...register("thumbnailUrl", {
            required: "サムネイルURLを入力してください",
          })}
        />
        {errors.thumbnailUrl && (
          <p className="text-red-700">{errors.thumbnailUrl.message}</p>
        )}
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="categories">
          カテゴリー
          <span className="inline-block ml-1 text-red-500">※</span>
        </label>
        {(categories?.categories ?? []).length > 0 ? (
          <>
            <select
              className="border rounded h-14 p-2"
              id="categories"
              multiple
              {...register("categories", {
                required: "カテゴリーを選択してください",
              })}
            >
              {categories?.categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  selected={selectCategories?.includes(category.id)}
                >
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categories && (
              <p className="text-red-700">{errors.categories.message}</p>
            )}
          </>
        ) : (
          <p className="pt-2 text-red-500">カテゴリを作成してください。</p>
        )}
      </div>
      <div className="mt-4 flex gap-4">
        {mode === "編集" ? (
          <>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 transition"
            >
              更新
            </button>
            <button
              type="submit"
              onClick={handleDeleteArticle}
              className="bg-red-500 text-white py-2 px-4 rounded font-bold hover:bg-red-700 transition"
            >
              削除
            </button>
          </>
        ) : (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded font-bold hover:bg-blue-700 transition"
          >
            作成
          </button>
        )}
      </div>
    </form>
  );
};
