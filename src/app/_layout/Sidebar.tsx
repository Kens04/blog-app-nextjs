import Link from "next/link";

export const Sidebar: React.FC = () => {
  return (
    <div className="bg-slate-100 h-screen w-48 flex flex-col fixed top-0 left-0 pt-[56px]">
      <div className="w-full">
        <Link
          className="block w-full font-bold py-2 px-4 hover:bg-slate-600 hover:text-white"
          href="/admin/posts"
        >
          記事一覧
        </Link>
      </div>
      <div className="w-full">
        <Link
          className="block w-full font-bold py-2 px-4 hover:bg-slate-600 hover:text-white"
          href="/admin/categories"
        >
          カテゴリー一覧
        </Link>
      </div>
    </div>
  );
};
