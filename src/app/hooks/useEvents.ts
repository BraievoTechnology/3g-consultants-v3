"use client"
import { useState, useEffect } from 'react';
import { Event, eventService } from '@/app/services/api/eventService';
export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  useEffect(() => {
    fetchEvents();
  }, []);
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await eventService.getAllEvents();
      setEvents(data);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };
  return {
    events,
    loading,
    error,
    refetch: fetchEvents
  };
};