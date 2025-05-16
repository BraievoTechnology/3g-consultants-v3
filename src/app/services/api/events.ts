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
export interface CreateEventDTO {
  title: string;
  event_type: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  location: string;
  capacity: number;
  status: string;
  description: string;
  images: File[];
}
export const eventService = {
  getAllEvents: async () => {
    const response = await api.get<Event[]>('/event');
    return response.data;
  },
  getEventById: async (id: number) => {
    const response = await api.get<Event>(`/event/${id}`);
    return response.data;
  },
  createEvent: async (event: {
    date: string;
    start_time: string;
    images: string;
    event_type: string;
    end_time: string;
    description: string;
    location: string;
    title: string;
    capacity: number;
    status: string;
  }) => {
    try {
      const formData = new FormData();
      formData.append('title', event.title);
      formData.append('event_type', event.event_type);
      formData.append('date', event.date.toString());
      formData.append('start_time', event.start_time.toString());
      formData.append('end_time', event.end_time.toString());
      formData.append('location', event.location);
      formData.append('capacity', event.capacity.toString());
      formData.append('status', event.status);
      formData.append('description', event.description);
      event.images.forEach((file: File) => {
        formData.append('images', file);
      });
      const response = await api.post<Event>('/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  },
  updateEvent: async (id: number, event: CreateEventDTO) => {
    try {
      const formData = new FormData();
      formData.append('title', event.title);
      formData.append('event_type', event.event_type);
      formData.append('date', event.date.toString());
      formData.append('start_time', event.start_time.toString());
      formData.append('end_time', event.end_time.toString());
      formData.append('location', event.location);
      formData.append('capacity', event.capacity.toString());
      formData.append('status', event.status);
      formData.append('description', event.description);
      event.images.forEach((file: File) => {
        formData.append('images', file);
      });
      const response = await api.put<Event>(`/event/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error updating event:', error);
      throw error;
    }
  },
  deleteEvent: async (id: number) => {
    await api.delete(`/event/${id}`);
  }
};