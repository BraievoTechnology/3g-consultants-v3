import api from './api'
export interface JobApplicationSkill {
    id: number
    applicationId: number
    skill: string
}
export interface JobApplication {
    id: number
    name: string
    email: string
    contact: string | null
    experience: string | null
    expected_salary: number | null
    cv_name: string | null
    cover_letter: string | null
    skills: JobApplicationSkill[]
}
export const jobApplicationService = {
    getAllApplications: async () => {
        try {
            const response = await api.get<JobApplication[]>('/jobApplications')
            return response.data
        } catch (error) {
            console.error('Error fetching job applications:', error)
            throw error
        }
    },
    getApplicationById: async (id: number) => {
        try {
            const response = await api.get<JobApplication>(`/jobApplications/${id}`)
            return response.data
        } catch (error) {
            console.error('Error fetching job application:', error)
            throw error
        }
    },
    updateApplication: async (id: number, data: Partial<JobApplication>) => {
        try {
            const response = await api.put<JobApplication>(`/jobApplications/${id}`, data)
            return response.data
        } catch (error) {
            console.error('Error updating application:', error)
            throw error
        }
    }
}