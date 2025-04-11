"use client";

import useSWR from "swr";
import { useSupabaseSession } from "./useSupabaseSession";

export const useAdminDataFetch = <T>(path: string) => {
  const { token } = useSupabaseSession();

  const fetcher = async (path: string) => {
    const res = await fetch(`${path}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token!,
      },
    });
    return await res.json();
  };

  // token が無い間は fetch しない
  const shouldFetch = token ? `/api${path}` : null;

  const { data, error, isLoading } = useSWR<T>(shouldFetch, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};
