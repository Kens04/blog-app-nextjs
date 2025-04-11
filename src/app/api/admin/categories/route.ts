import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getCurrentUser } from "../_utils/supabase";

const prisma = new PrismaClient();

// カテゴリーの作成時に送られてくるリクエストのbodyの型
interface CreateCategoryRequestBody {
  name: string;
}

export const GET = async (request: NextRequest) => {
  const { error } = await getCurrentUser(request);

  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 400 });
  }
  // tokenが正しい場合、以降が実行される
  try {
    // カテゴリーの一覧をDBから取得
    const categories = await prisma.category.findMany({
      orderBy: {
        createdAt: "desc", // 作成日時の降順で取得
      },
    });

    // レスポンスを返す
    return NextResponse.json({ status: "OK", categories }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ status: error.message }, { status: 400 });
  }
};

export const POST = async (request: Request, context: any) => {
  const { error } = await getCurrentUser(request);

  // 送ったtokenが正しくない場合、errorが返却されるので、クライアントにもエラーを返す
  if (error) {
    return NextResponse.json({ status: error.message }, { status: 400 });
  }
  // tokenが正しい場合、以降が実行される
  try {
    // リクエストのbodyを取得
    const body = await request.json();

    // bodyの中からnameを取り出す
    const { name }: CreateCategoryRequestBody = body;

    // カテゴリーをDBに生成
    const data = await prisma.category.create({
      data: {
        name,
      },
    });

    // レスポンスを返す
    return NextResponse.json({
      status: "OK",
      message: "作成しました",
      id: data.id,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: error.message }, { status: 400 });
    }
  }
};
