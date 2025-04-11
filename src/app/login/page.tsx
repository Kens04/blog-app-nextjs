"use client";

import { useRouter } from "next/navigation";
import { supabase } from "../_utils/supabase";
import { useForm } from "react-hook-form";
import { Login } from "./_types/login";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<Login>();
  const router = useRouter();

  const onSubmit = async (data: Login) => {
    const { email, password } = data;
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("ログインに失敗しました");
    } else {
      router.replace("/admin/posts");
    }
  };

  return (
    <div className="flex justify-center pt-[240px]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-[400px]"
      >
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@company.com"
            {...register("email", {
              required: "メールアドレスを入力してください",
            })}
            disabled={isSubmitting}
          />
          {errors.email && (
            <p className="text-red-700">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            パスワード
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            {...register("password", {
              required: "パスワードを入力してください",
              minLength: { value: 6, message: "6文字以上入力してください" },
            })}
            disabled={isSubmitting}
          />
          {errors.password && (
            <p className="text-red-700">{errors.password.message}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className={`${
              isSubmitting || !isValid
                ? "bg-gray-300 text-black pointer-events-none"
                : "bg-blue-700 hover:bg-blue-800 text-white"
            } w-full focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          >
            ログイン
          </button>
        </div>
      </form>
    </div>
  );
}
