import { SubmitHandler, useForm } from "react-hook-form";
import { AdminPost } from "../_types/AdminPost";
import { Category } from "../../categories/_types/Category";
import { ChangeEvent, useEffect, useState } from "react";
import { useAdminDataFetch } from "@/app/_hooks/useAdminDataFetch";
import { supabase } from "@/app/_utils/supabase";
import { v4 as uuidv4 } from "uuid"; // 固有IDを生成するライブラリ
import Image from "next/image";

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
    setValue,
    formState: { errors },
  } = useForm<AdminPost>();
  const [thumbnailImageKey, setThumbnailImageKey] = useState("");
  // Imageタグのsrcにセットする画像URLを持たせるstate
  const [thumbnailImageUrl, setThumbnailImageUrl] = useState<null | string>(
    null
  );

  // カテゴリー一覧取得
  const { data: categories } = useAdminDataFetch<Category>("/admin/categories");

  useEffect(() => {
    reset({
      title,
      content,
      thumbnailUrl,
      categories: String(selectCategories),
    });

    if (!thumbnailUrl) return; // アップロード時に取得した、thumbnailImageKeyを用いて画像のURLを取得

    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post-thumbnail")
        .getPublicUrl(thumbnailUrl);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [title, content, thumbnailUrl, selectCategories]);

  const handleImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!event.target.files || event.target.files.length == 0) {
      // 画像が選択されていないのでreturn
      return;
    }

    const file = event.target.files[0]; // 選択された画像を取得
    const filePath = `private/${uuidv4()}`; // ファイルパスを指定
    // Supabaseに画像をアップロード
    const { data, error } = await supabase.storage
      .from("post-thumbnail") // ここでバケット名を指定
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    // アップロードに失敗したらエラーを表示して終了
    if (error) {
      alert(error.message);
      return;
    }

    // data.pathに、画像固有のkeyが入っているので、thumbnailImageKeyに格納する
    setThumbnailImageKey(data.path);
  };

  useEffect(() => {
    if (!thumbnailImageKey) return; // アップロード時に取得した、thumbnailImageKeyを用いて画像のURLを取得
    setValue("thumbnailUrl", thumbnailImageKey);
    const fetcher = async () => {
      const {
        data: { publicUrl },
      } = await supabase.storage
        .from("post-thumbnail")
        .getPublicUrl(thumbnailImageKey);

      setThumbnailImageUrl(publicUrl);
    };

    fetcher();
  }, [thumbnailImageKey, setValue]);

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
        <label htmlFor="thumbnailImageKey">
          サムネイルURL
          <span className="inline-block ml-1 text-red-500">※</span>
        </label>
        <input
          type="file"
          id="thumbnailImageKey"
          {...register("thumbnailImageKey", {
            required: "サムネイル画像をアップロードしてください",
            onChange: handleImageChange,
          })}
          accept="image/*"
        />
        {errors.thumbnailImageKey && (
          <p className="text-red-700">{errors.thumbnailImageKey.message}</p>
        )}
        {thumbnailImageUrl && (
          <div className="mt-2">
            <Image
              src={thumbnailImageUrl}
              alt="thumbnail"
              width={400}
              height={400}
            />
          </div>
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
