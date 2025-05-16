"use client";
import { useEffect, useState } from "react";
import { NewsFeed } from "@prisma/client";
import { newsFeedService } from "@/app/admin/secure/services/newsFeedService";
import { Badge } from "@/app/admin/secure/components/UI/Badge";
import { PageTransition } from "@/app/admin/secure/components/UI/PageTransition";
import { AddButton } from "@/app/admin/secure/components/UI/AddButton";
import { DataTable } from "@/app/admin/secure/components/UI/DataTable";
import { Modal } from "@/app/admin/secure/components/UI/Modal";
import { NewsForm } from "@/app/admin/secure/components/News/NewsForm";

const NewsFeedPage: React.FC = () => {
  const [news, setNews] = useState<NewsFeed[]>([]);
  const [filteredNews, setFilteredNews] = useState<NewsFeed[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsFeed | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [, setIsLoading] = useState(true);
  /*const router = useRouter();*/

  /*  useEffect(() => {
    const checkAuth = async () => {
      const isAdmin = document.cookie.includes("admin-auth=true");
      if (!isAdmin) {
        router.replace("/admin"); // properly await
      }
    };

    checkAuth();
  }, [router]);*/

  const fetchNews = async () => {
    try {
      const data = await newsFeedService.getAllNews();
      setNews(data);
      setFilteredNews(data);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNews();
  }, []);
  useEffect(() => {
    let result = [...news];
    if (searchTerm) {
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.summary.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterValue && filterValue !== "all") {
      result = result.filter(
        (article) => article.status.toLowerCase() === filterValue.toLowerCase()
      );
    }
    setFilteredNews(result);
  }, [news, searchTerm, filterValue]);
  const handleAddArticle = async (formData: FormData) => {
    try {
      await newsFeedService.createNews(formData);
      await fetchNews();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create news:", error);
    }
  };
  const handleUpdate = async (formData: FormData) => {
    if (!editingArticle) return;
    try {
      await newsFeedService.updateNews(editingArticle.id, formData);
      await fetchNews();
      setIsModalOpen(false);
      setEditingArticle(null);
    } catch (error) {
      console.error("Failed to update news:", error);
    }
  };
  const handleDelete = async (article: NewsFeed) => {
    if (window.confirm(`Are you sure you want to delete "${article.title}"?`)) {
      try {
        await newsFeedService.deleteNews(article.id);
        await fetchNews();
      } catch (error) {
        console.error("Failed to delete news:", error);
      }
    }
  };
  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };
  const handleFilter = (value: string) => {
    setFilterValue(value.toLowerCase());
  };
  const handleEdit = (article: NewsFeed) => {
    setEditingArticle(article);
    setIsModalOpen(true);
  };
  const columns = [
    {
      key: "title",
      header: "Title",
      width: "30%",
    },
    {
      key: "summary",
      header: "Summary",
      width: "35%",
    },
    {
      key: "createTime",
      header: "createTime",
      width: "10%",
      render: (value: string) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      header: "Status",
      width: "10%",
      render: (value: string) => (
        <Badge
          text={value}
          color={
            value === "published"
              ? "green"
              : value === "draft"
              ? "gray"
              : "gray"
          }
        />
      ),
    },
  ];
  return (
    <PageTransition>
      <div className="px-4 py-6 md:px-6 lg:px-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-medium">News Feed Management</h2>
          <AddButton
            label="Add News Article"
            onClick={() => {
              setEditingArticle(null);
              setIsModalOpen(true);
            }}
          />
        </div>
        <DataTable
          columns={columns}
          data={filteredNews}
          searchPlaceholder="Search news articles..."
          filterOptions={{
            label: "Filter by status",
            options: [
              {
                label: "All",
                value: "all",
              },
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Draft",
                value: "draft",
              },
            ],
          }}
          onSearch={handleSearch}
          onFilter={handleFilter}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingArticle(null);
          }}
          title={editingArticle ? "Edit Article" : "Add News Article"}
        >
          <NewsForm
            onSubmit={editingArticle ? handleUpdate : handleAddArticle}
            initialData={editingArticle}
          />
        </Modal>
        <div className="mt-4 text-sm text-gray-500">
          Showing {filteredNews.length} of {news.length} articles
        </div>
      </div>
    </PageTransition>
  );
};
export default NewsFeedPage;
