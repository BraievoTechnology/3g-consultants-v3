import api from './api'
export type EmploymentType = 'FULLTIME' | 'PARTTIME' | 'CONTRACT' | 'INTERNSHIP'
export type JobStatus = 'DRAFT' | 'ACTIVE' | 'CLOSED'
export interface Job {
    id: number
    job_title: string
    employment_type: EmploymentType
    department: string
    location: string
    application_deadline: string
    status: JobStatus
    job_description: string
    requirements: string
    created_at?: Date
    updated_at?: Date
}
export interface CreateJobDTO {
    job_title: string
    employment_type: EmploymentType
    department: string
    location: string
    application_deadline: string
    status: JobStatus
    job_description: string
    requirements: string
}
export const jobService = {
    getAllJobs: async () => {
        const response = await api.get<Job[]>('/jobOpportunities')
        return response.data
    },
    createJob: async (job: CreateJobDTO) => {
        const response = await api.post<Job>('/jobOpportunities', job)
        return response.data
    },
    updateJob: async (id: number, job: CreateJobDTO) => {
        const response = await api.put<Job>(`/jobOpportunities/${id}`, job)
        return response.data
    },
    deleteJob: async (id: number) => {
        await api.delete(`/jobOpportunities/${id}`)
    },
}