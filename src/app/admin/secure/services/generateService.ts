// api.ts must export a configured axios instance
import api from './api'

// Interface representing a project image
export interface ProjectImage {
    id?: number
    projectId?: number
    image_name: string
}


// Interface representing a project with associated images
export interface Project {
    id: number
    project_name: string
    location: string | null
    start_date: string | null
    end_date: string | null
    budget: string | null
    status: string
    description: string | null
    category: string
    images: ProjectImage[]
}


// Function to get projects filtered by category
export const getProjectsByCategory = async (category: string): Promise<Project[]> => {
    try {
        const response = await api.get(`/project?category=${category}`)
        return response.data
    } catch (error) {
        console.error('Error fetching projects:', error)
        return []
    }
}

// Function to send selected categories, client name, and projects to the backend to generate a document
export const generateDocument = async (data: {
    categories: string[]
    clientName: string
    projects: Project[]
}) => {
    try {
        const response = await api.post('/generate', data)
        return response.data
    } catch (error) {
        console.error('Error generating document:', error)
        throw error
    }
}

// Function to download a Word document from a given file path
export const downloadGeneratedFile = async (filePath: string) => {
    try {
        const response = await api.get(`${filePath}`, {
            responseType: 'blob'
        })

        // Create a blob and trigger download
        const blob = new Blob([response.data], {
            type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url

        // Extract file name from the path
        const filename = filePath.split('/').pop() || 'generated-document.docx'
        link.setAttribute('download', filename)

        // Append to body and click the link to download
        document.body.appendChild(link)
        link.click()

        // Cleanup
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
    } catch (error) {
        console.error('Error downloading file:', error)
        throw error
    }
}
