import api from './api'
export interface NewsFeed {
    id: number
    title: string
    summary: string
    status: string
    images: string
    createdAt?: Date
    updatedAt?: Date
}
export const newsFeedService = {
    getAllNews: async () => {
        const response = await api.get<NewsFeed[]>('/newsFeed')
        return response.data
    },
    createNews: async (formData: FormData) => {
        try {
            const response = await api.post<NewsFeed>('/newsFeed', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Error creating news:', error)
            throw error
        }
    },
    updateNews: async (id: number, formData: FormData) => {
        try {
            const response = await api.put<NewsFeed>(`/newsFeed/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            return response.data
        } catch (error) {
            console.error('Error updating news:', error)
            throw error
        }
    },
    deleteNews: async (id: number) => {
        await api.delete(`/newsFeed/${id}`)
    },
}