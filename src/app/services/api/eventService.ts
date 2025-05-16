import api from './api';
export interface EventImage {
  id?: number;
  eventId?: number;
  image_name: string;
}
export interface Event {
  id: number;
  title: string;
  event_type: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  location: string;
  capacity: number;
  status: string;
  description: string;
  images: EventImage[];
}
export const eventService = {
  getAllEvents: async () => {
    const response = await api.get<Event[]>('/event');
    return response.data;
  },
  getEventById: async (id: number) => {
    const response = await api.get<Event>(`/event/${id}`);
    return response.data;
  }
};