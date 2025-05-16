export enum EventType {
  conference = "conference",
  workshop = "workshop",
}
export enum EventStatus {
  upcoming = "upcoming",
  active = "active",
  completed = "completed",
}
export interface EventImage {
  id: number;
  eventId: number;
  image_name: string;
}
export interface Event {
  id: number;
  title: string | null;
  event_type: EventType | null;
  date: string | null;
  start_time: string | null;
  end_time: string | null;
  location: string | null;
  capacity: number | null;
  status: EventStatus | null;
  description: string | null;
  images: EventImage[];
}
export interface CreateEventDto {
  title: string;
  event_type: EventType;
  date: string;
  start_time: string;
  end_time: string;
  location: string;
  capacity: number;
  status: EventStatus;
  description: string;
  images: File[];
}
