import { supabase } from "@/app/_utils/supabase";
import { NextRequest } from "next/server";

export const getCurrentUser = async (
  request: NextRequest | Request,
  context?: any
) => {
  const token = request.headers.get("Authorization") ?? "";

  // supabaseに対してtokenを送る
  const { error } = await supabase.auth.getUser(token);

  return {
    error,
  };
};
