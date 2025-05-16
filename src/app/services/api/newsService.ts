import api from './api';
import { News } from '../../types/news';
export const newsService = {
  getAllNews: async () => {
    const response = await api.get<News[]>('/newsFeed');
    return response.data;
  }
};