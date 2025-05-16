export enum NewsStatus {
  published = "published",
  draft = "draft",
}
export interface News {
  id: number;
  title: string;
  summary: string;
  status: NewsStatus;
  images: string;
  createTime: string;
}
