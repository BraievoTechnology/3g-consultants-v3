import api from './api'
export interface DashboardSummary {
    totalEvents: number
    totalJobApplications: number
    totalJobPosts: number
    totalNewsFeeds: number
    totalProjects: number
}
export const summaryService = {
    getDashboardSummary: async () => {
        try {
            const response = await api.get<DashboardSummary>('/summary')
            return response.data
        } catch (error) {
            console.error('Error fetching dashboard summary:', error)
            throw error
        }
    },
}