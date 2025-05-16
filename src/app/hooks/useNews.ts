"use client";
import { useState, useEffect } from "react";
import { News } from "@/app/types/news";
import { newsService } from "@/app/services/api/newsService";
export const useNews = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchNews();
  }, []);
  const fetchNews = async () => {
    try {
      setLoading(true);
      const data = await newsService.getAllNews();
      setNews(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  return {
    news,
    loading,
    error,
    refetch: fetchNews,
  };
};
