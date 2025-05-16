export interface ProjectImage {
  id: number;
  projectId: number;
  image_name: string;
}
export interface Project {
  id: number;
  project_name: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: string;
  status: string;
  description: string;
  images: ProjectImage[];
}