import api from './api'
export enum ProjectStatus {
    Planning = "Planning",
    inprogress = "inprogress", // Updated to match backend enum
    completed = "completed",    // Updated to match backend enum
    on_hold = "on_hold"        // Updated to match backend enum
}
export type ProjectCategory =
    | 'PROCUREMENT_AND_CONTRACTS'
    | 'HIGHWAYS_AND_TRANSPORTATION_ENGINEERING'
    | 'WATER_RESOURCES_ENGINEERING'
    | 'ENVIRONMENTAL_AND_CLIMATE_RESILIENCE_ENGINEERING'
    | 'URBAN_RURAL_AND_REGIONAL_DEVELOPMENT'
    | 'COMMERCIAL_AND_HOUSING_DEVELOPMENT'
export interface ProjectImage {
    id?: number
    projectId?: number
    image_name: string
}
export interface Project {
    id: number
    project_name: string
    description: string
    location: string
    start_date: Date
    end_date: Date
    status: ProjectStatus
    budget: number
    category: ProjectCategory
    images: ProjectImage[]
}
export interface CreateProjectDTO {
    project_name: string
    description: string
    location: string
    start_date: Date
    end_date: Date
    status: ProjectStatus
    budget: number
    category: ProjectCategory
    images: File[]
}
export const projectService = {
    getAllProjects: async () => {
        const response = await api.get<Project[]>('/project')
        return response.data
    },
    getProjectById: async (id: number) => {
        const response = await api.get<Project>(`/project/${id}`)
        return response.data
    },
    createProject: async (project: CreateProjectDTO) => {
        try {
            const formData = new FormData()
            formData.append('project_name', project.project_name)
            formData.append('location', project.location)
            formData.append('start_date', project.start_date.toString())
            formData.append('end_date', project.end_date.toString())
            formData.append('budget', project.budget.toString())
            formData.append('status', project.status)
            formData.append('description', project.description)
            formData.append('category', project.category)
            if (project.images) {
                project.images.forEach((file: File) => {
                    formData.append('images', file)
                })
            }
            const response = await api.post<Project>('/project', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Error creating project:', error)
            throw error
        }
    },
    updateProject: async (id: number, project: CreateProjectDTO) => {
        try {
            const formData = new FormData()
            formData.append('project_name', project.project_name)
            formData.append('location', project.location)
            formData.append('start_date', project.start_date.toString())
            formData.append('end_date', project.end_date.toString())
            formData.append('budget', project.budget.toString())
            formData.append('status', project.status)
            formData.append('description', project.description)
            formData.append('category', project.category)
            project.images.forEach((file: File) => {
                formData.append('images', file)
            })
            const response = await api.put<Project>(`/project/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Error updating project:', error)
            throw error
        }
    },
    deleteProject: async (id: number) => {
        await api.delete(`/project/${id}`)
    },
}