import { Category } from "../_types/Category";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";

interface FormProps {
  mode: string;
  name?: string;
  setName?: (name: string) => void;
  onDeleteCategory?: () => void;
  onSubmit: SubmitHandler<Category>;
}

export const AdminCategoryForm = ({
  mode,
  name,
  onDeleteCategory,
  onSubmit,
}: FormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Category>();

  useEffect(() => {
    reset({
      name,
    });
  }, [name]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label htmlFor="name">
          カテゴリー名
          <span className="inline-block ml-1 text-red-500">※</span>
        </label>
        <input
          className="border rounded h-12 p-2"
          id="name"
          type="text"
          placeholder="カテゴリー名を入力してください"
          {...register("name", {
            required: "カテゴリー名を入力してください",
            minLength: { value: 2, message: "2文字以上入力してください" },
          })}
        />
        {errors.name && <p className="text-red-700">{errors.name.message}</p>}
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
              type="button"
              onClick={onDeleteCategory}
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
